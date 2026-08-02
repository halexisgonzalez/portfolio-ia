import type { ProjectCategory } from '../../types/portfolio';
import type { ProjectFilterState } from '../../utils/projectFilters';
import styles from './ProjectFilters.module.css';

interface ProjectFiltersProps {
  years: number[];
  categories: ProjectCategory[];
  technologies: string[];
  filters: ProjectFilterState;
  onChange: (filters: ProjectFilterState) => void;
}

export function ProjectFilters({
  years,
  categories,
  technologies,
  filters,
  onChange,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    filters.year !== 'all' || filters.category !== 'all' || filters.technology !== 'all';

  return (
    <div className={styles.filters}>
      <div className={styles.field}>
        <label htmlFor="filter-year">Año</label>
        <select
          id="filter-year"
          value={filters.year}
          onChange={(e) =>
            onChange({
              ...filters,
              year: e.target.value === 'all' ? 'all' : Number(e.target.value),
            })
          }
        >
          <option value="all">Todos</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="filter-category">Categoría</label>
        <select
          id="filter-category"
          value={filters.category}
          onChange={(e) =>
            onChange({
              ...filters,
              category: e.target.value as ProjectCategory | 'all',
            })
          }
        >
          <option value="all">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="filter-technology">Tecnología</label>
        <select
          id="filter-technology"
          value={filters.technology}
          onChange={(e) => onChange({ ...filters, technology: e.target.value })}
        >
          <option value="all">Todas</option>
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters ? (
        <button
          type="button"
          className={`btn btn-secondary btn-small ${styles.reset}`}
          onClick={() => onChange({ ...filters, year: 'all', category: 'all', technology: 'all' })}
        >
          Limpiar filtros
        </button>
      ) : null}
    </div>
  );
}
