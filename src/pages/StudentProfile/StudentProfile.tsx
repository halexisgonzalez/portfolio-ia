import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { getProjectsForStudent, getStudentById } from '../../data';
import { NotFound } from '../NotFound/NotFound';
import styles from './StudentProfile.module.css';

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function StudentProfile() {
  const { studentId } = useParams<{ studentId: string }>();
  const student = studentId ? getStudentById(studentId) : undefined;

  if (!student) {
    return (
      <NotFound
        title="Estudiante no encontrado"
        description="El perfil que buscás no existe o fue removido del portfolio."
      />
    );
  }

  const projects = getProjectsForStudent(student);

  return (
    <section className="section">
      <div className="container">
        <Link to="/students" className={styles.back}>
          ← Volver a estudiantes
        </Link>

        <div className={styles.profile}>
          {student.avatar ? (
            <img className={styles.avatar} src={student.avatar} alt="" />
          ) : (
            <span className={styles.avatarFallback} aria-hidden="true">
              {getInitials(student.name)}
            </span>
          )}

          <div>
            <h1 className={styles.name}>{student.name}</h1>
            <p className={styles.cohort}>Estudiante — Cohorte {student.year}</p>

            <div className={styles.links}>
              {student.github ? (
                <a href={student.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-small">
                  GitHub
                </a>
              ) : null}
              {student.linkedin ? (
                <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-small">
                  LinkedIn
                </a>
              ) : null}
              {student.website ? (
                <a href={student.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-small">
                  Website
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {student.bio ? <p className={styles.bio}>{student.bio}</p> : null}

        <div className={styles.projectsSection}>
          <h2>Proyectos</h2>
          {projects.length > 0 ? (
            <div className={styles.grid}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState title="Este estudiante todavía no tiene proyectos cargados" />
          )}
        </div>
      </div>
    </section>
  );
}
