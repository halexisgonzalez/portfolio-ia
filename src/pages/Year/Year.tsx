import { useParams } from 'react-router-dom';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { StudentCard } from '../../components/StudentCard/StudentCard';
import { getYear } from '../../data';
import { pluralize } from '../../utils/format';
import { NotFound } from '../NotFound/NotFound';
import styles from './Year.module.css';

export function Year() {
  const { year: yearParam } = useParams<{ year: string }>();
  const year = yearParam ? Number(yearParam) : NaN;
  const yearData = Number.isFinite(year) ? getYear(year) : undefined;

  if (!yearData) {
    return (
      <NotFound
        title="Cohorte no encontrada"
        description="Todavía no hay datos cargados para ese año académico."
      />
    );
  }

  const students = yearData.students.map((student) => ({ ...student, year: yearData.year }));

  return (
    <section className="section">
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Cohorte</span>
          <h1 className={styles.title}>{yearData.year}</h1>
          <p className="text-muted">
            {students.length} {pluralize(students.length, 'estudiante', 'estudiantes')} ·{' '}
            {yearData.projects.length}{' '}
            {pluralize(yearData.projects.length, 'proyecto', 'proyectos')}
          </p>
          {yearData.materialUrl ? (
            <a
              href={yearData.materialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-secondary ${styles.materialLink}`}
            >
              Ver material {yearData.year}
            </a>
          ) : null}
        </div>

        <div className={styles.block}>
          <h2>Estudiantes</h2>
          {students.length > 0 ? (
            <div className={styles.studentsGrid}>
              {students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ) : (
            <EmptyState title="Todavía no hay estudiantes cargados para esta cohorte" />
          )}
        </div>

        <div className={styles.block}>
          <h2>Proyectos</h2>
          {yearData.projects.length > 0 ? (
            <div className={styles.projectsGrid}>
              {yearData.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState title="Todavía no hay proyectos cargados para esta cohorte" />
          )}
        </div>
      </div>
    </section>
  );
}
