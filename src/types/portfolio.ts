/**
 * Core data model for the AI academic portfolio.
 * All academic content (students, projects) is loaded from JSON files
 * in `src/data/`. Nothing here should ever contain real academic data.
 */

export const PROJECT_CATEGORIES = [
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Data Science',
  'Robótica',
  'Generative AI',
  'Other',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Student {
  /** URL-friendly unique identifier, e.g. "juan-perez". Used as the route slug. */
  id: string;
  name: string;
  github?: string;
  linkedin?: string;
  website?: string;
  avatar?: string;
  bio?: string;
  /** Ids of the projects this student contributed to. */
  projectIds: string[];
}

export interface Project {
  /** URL-friendly unique identifier, e.g. "clasificador-imagenes". Used as the route slug. */
  id: string;
  name: string;
  description: string;
  year: number;
  /** Ids of the students who authored this project (supports group projects). */
  studentIds: string[];
  /** One or more IA areas this project belongs to. */
  categories: ProjectCategory[];
  technologies: string[];
  repository?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
}

/**
 * Shape of a project entry as written in `src/data/<year>.json`. `year` is
 * omitted here because it's implied by the file it lives in — it gets
 * stamped onto each `Project` automatically when the data loads.
 */
export type ProjectInput = Omit<Project, 'year'>;

/** Raw shape of each `src/data/<year>.json` file. */
export interface AcademicYearData {
  year: number;
  /** Optional link to the corresponding release of the academic content repository. */
  materialUrl?: string;
  students: Student[];
  projects: ProjectInput[];
}

/** A student enriched with the cohort year it belongs to. */
export interface StudentWithYear extends Student {
  year: number;
}

/** A project enriched with resolved student records, for display purposes. */
export interface ProjectWithStudents extends Project {
  students: Student[];
}
