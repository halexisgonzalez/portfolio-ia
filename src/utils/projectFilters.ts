import { getStudentsForProject } from '../data';
import type { Project, ProjectCategory } from '../types/portfolio';

export interface ProjectFilterState {
  year: number | 'all';
  category: ProjectCategory | 'all';
  technology: string | 'all';
  query: string;
}

export const defaultProjectFilters: ProjectFilterState = {
  year: 'all',
  category: 'all',
  technology: 'all',
  query: '',
};

/** Applies year/category/technology filters plus a free-text search, client-side. */
export function filterProjects(
  projects: Project[],
  filters: ProjectFilterState,
): Project[] {
  const query = filters.query.trim().toLowerCase();

  return projects.filter((project) => {
    if (filters.year !== 'all' && project.year !== filters.year) return false;
    if (filters.category !== 'all' && !project.categories.includes(filters.category)) {
      return false;
    }
    if (
      filters.technology !== 'all' &&
      !project.technologies.includes(filters.technology)
    ) {
      return false;
    }

    if (query) {
      const students = getStudentsForProject(project);
      const haystack = [
        project.name,
        project.description,
        ...project.categories,
        ...project.technologies,
        ...students.map((s) => s.name),
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}

export function filterStudentsByName<T extends { name: string }>(
  students: T[],
  query: string,
): T[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return students;
  return students.filter((s) => s.name.toLowerCase().includes(normalized));
}
