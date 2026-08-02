import type { Student } from '../types/portfolio';

/** "Juan Pérez", "Juan Pérez y María López", "Juan, María y Pedro". */
export function joinNames(students: Pick<Student, 'name'>[]): string {
  const names = students.map((s) => s.name);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}
