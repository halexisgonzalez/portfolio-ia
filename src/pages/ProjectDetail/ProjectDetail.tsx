import { Link, useParams } from 'react-router-dom';
import { CategoryBadge } from '../../components/CategoryBadge/CategoryBadge';
import { TechnologyBadge } from '../../components/TechnologyBadge/TechnologyBadge';
import { getProjectById, getStudentsForProject } from '../../data';
import { NotFound } from '../NotFound/NotFound';
import styles from './ProjectDetail.module.css';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return (
      <NotFound
        title="Proyecto no encontrado"
        description="El proyecto que buscás no existe o fue removido del portfolio."
      />
    );
  }

  const students = getStudentsForProject(project);

  return (
    <section className="section">
      <div className={`container ${styles.layout}`}>
        <div className={styles.media}>
          {project.image ? (
            <img src={project.image} alt="" />
          ) : (
            <span className={styles.placeholder} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path
                  fill="currentColor"
                  d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v10h14V7Zm2.5 8 3-3.5 2 2 3-4 3.5 5.5Z"
                />
              </svg>
            </span>
          )}
        </div>

        <div className={styles.header}>
          <Link to="/projects" className={styles.back}>
            ← Volver a proyectos
          </Link>

          <div className={styles.badges}>
            <CategoryBadge category={project.category} />
            <span className={styles.year}>Cohorte {project.year}</span>
            {project.featured ? (
              <span className={styles.featured}>Destacado</span>
            ) : null}
          </div>

          <h1 className={styles.title}>{project.name}</h1>

          {students.length > 0 ? (
            <div className={styles.authors}>
              <span className="text-muted">Autores:</span>
              {students.map((student, index) => (
                <span key={student.id}>
                  <Link to={`/students/${student.id}`} className={styles.authorLink}>
                    {student.name}
                  </Link>
                  {index < students.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          ) : null}

          <p className={styles.description}>{project.description}</p>

          <ul className={styles.techList}>
            {project.technologies.map((tech) => (
              <TechnologyBadge key={tech} technology={tech} as="li" />
            ))}
          </ul>

          <div className={styles.actions}>
            {project.repository ? (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Ver repositorio
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Ver demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
