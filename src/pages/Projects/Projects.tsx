import { useMemo, useState } from 'react';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { ProjectFilters } from '../../components/ProjectFilters/ProjectFilters';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { getAllCategoriesInUse, getAllProjects, getAllTechnologies } from '../../data';
import { defaultProjectFilters, filterProjects } from '../../utils/projectFilters';
import styles from './Projects.module.css';

export function Projects() {
  const [filters, setFilters] = useState(defaultProjectFilters);

  const allProjects = useMemo(() => getAllProjects(), []);
  const categories = useMemo(() => getAllCategoriesInUse(), []);
  const technologies = useMemo(() => getAllTechnologies(), []);
  const years = useMemo(
    () => Array.from(new Set(allProjects.map((p) => p.year))).sort((a, b) => b - a),
    [allProjects],
  );

  const filteredProjects = useMemo(
    () => filterProjects(allProjects, filters),
    [allProjects, filters],
  );

  return (
    <section className="section">
      <div className="container">
        <div className={styles.header}>
          <h1>Proyectos</h1>
          <p className="text-muted">
            Explorá los proyectos de Inteligencia Artificial desarrollados por
            estudiantes en todas las cohortes.
          </p>
        </div>

        <div className={styles.controls}>
          <SearchInput
            id="project-search"
            label="Buscar proyectos"
            placeholder="Buscar por nombre, estudiante, tecnología..."
            value={filters.query}
            onChange={(query) => setFilters({ ...filters, query })}
          />
          <ProjectFilters
            years={years}
            categories={categories}
            technologies={technologies}
            filters={filters}
            onChange={setFilters}
          />
        </div>

        <p className={styles.resultCount}>
          {filteredProjects.length} de {allProjects.length} proyectos
        </p>

        {filteredProjects.length > 0 ? (
          <div className={styles.grid}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No se encontraron proyectos"
            description="Probá ajustar la búsqueda o los filtros seleccionados."
            action={
              <button
                type="button"
                className="btn btn-secondary btn-small"
                onClick={() => setFilters(defaultProjectFilters)}
              >
                Limpiar búsqueda y filtros
              </button>
            }
          />
        )}
      </div>
    </section>
  );
}
