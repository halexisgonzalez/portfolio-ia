import type {
  AcademicYearData,
  Project,
  ProjectCategory,
  ProjectInput,
  ProjectWithStudents,
  Student,
  StudentWithYear,
} from '../types/portfolio';

/**
 * Auto-discovers every `src/data/<year>.json` file. Adding a new cohort is
 * as simple as dropping a new `2027.json` (etc.) next to this file — no
 * other code needs to change.
 */
const yearModules = import.meta.glob<{ default: AcademicYearData }>(
  './[0-9][0-9][0-9][0-9].json',
  { eager: true },
);

/** An academic year once every project has had its `year` stamped on. */
type NormalizedYear = Omit<AcademicYearData, 'projects'> & { projects: Project[] };

/** Stamps the cohort's year onto a project and fills in optional defaults. */
function normalizeProject(raw: ProjectInput, year: number): Project {
  return {
    ...raw,
    year,
    repository: raw.repository ?? undefined,
    demo: raw.demo ?? undefined,
    image: raw.image ?? undefined,
    featured: raw.featured ?? false,
  };
}

const academicYears: NormalizedYear[] = Object.values(yearModules)
  .map((mod) => ({
    ...mod.default,
    projects: mod.default.projects.map((p) => normalizeProject(p, mod.default.year)),
  }))
  .sort((a, b) => b.year - a.year);

/** All cohorts, most recent year first. */
export function getAllYears(): NormalizedYear[] {
  return academicYears;
}

/** A single cohort by year, if it exists. */
export function getYear(year: number): NormalizedYear | undefined {
  return academicYears.find((y) => y.year === year);
}

/** Every project across every cohort, most recent year first. */
export function getAllProjects(): Project[] {
  return academicYears.flatMap((y) => y.projects);
}

/** Every student across every cohort, most recent year first. */
export function getAllStudents(): StudentWithYear[] {
  return academicYears.flatMap((y) =>
    y.students.map((student) => ({ ...student, year: y.year })),
  );
}

export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find((p) => p.id === id);
}

export function getStudentById(id: string): StudentWithYear | undefined {
  return getAllStudents().find((s) => s.id === id);
}

/** Resolves a project's `studentIds` into full student records. */
export function getStudentsForProject(project: Project): Student[] {
  return project.studentIds
    .map((id) => getStudentById(id))
    .filter((s): s is StudentWithYear => Boolean(s));
}

export function withStudents(project: Project): ProjectWithStudents {
  return { ...project, students: getStudentsForProject(project) };
}

/** Resolves a student's `projectIds` into full project records. */
export function getProjectsForStudent(student: Student): Project[] {
  return student.projectIds
    .map((id) => getProjectById(id))
    .filter((p): p is Project => Boolean(p));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

/** Every distinct technology used across all projects, alphabetically sorted. */
export function getAllTechnologies(): string[] {
  const set = new Set<string>();
  for (const project of getAllProjects()) {
    for (const tech of project.technologies) set.add(tech);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Every distinct category actually in use, alphabetically sorted. */
export function getAllCategoriesInUse(): ProjectCategory[] {
  const set = new Set<ProjectCategory>();
  for (const project of getAllProjects()) {
    for (const category of project.categories) set.add(category);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export interface PortfolioStats {
  studentCount: number;
  projectCount: number;
  technologyCount: number;
  categoryCount: number;
}

/** Site-wide stats, always computed from the data — never hardcoded. */
export function getPortfolioStats(): PortfolioStats {
  return {
    studentCount: getAllStudents().length,
    projectCount: getAllProjects().length,
    technologyCount: getAllTechnologies().length,
    categoryCount: getAllCategoriesInUse().length,
  };
}

export interface YearStats {
  year: number;
  studentCount: number;
  projectCount: number;
}

/** Per-cohort stats used on the home page and the year listing. */
export function getYearStats(): YearStats[] {
  return academicYears.map((y) => ({
    year: y.year,
    studentCount: y.students.length,
    projectCount: y.projects.length,
  }));
}
