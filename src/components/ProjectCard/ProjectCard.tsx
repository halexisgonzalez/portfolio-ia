import { Link } from 'react-router-dom';
import { getStudentsForProject } from '../../data';
import type { Project } from '../../types/portfolio';
import { joinNames } from '../../utils/format';
import { CategoryBadge } from '../CategoryBadge/CategoryBadge';
import { TechnologyBadge } from '../TechnologyBadge/TechnologyBadge';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const students = getStudentsForProject(project);

  return (
    <article className={`card card-hoverable ${styles.card}`}>
      <Link to={`/projects/${project.id}`} className={styles.media}>
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path
                fill="currentColor"
                d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v10h14V7Zm2.5 8 3-3.5 2 2 3-4 3.5 5.5Z"
              />
            </svg>
          </span>
        )}
        {project.featured ? <span className={styles.featuredTag}>Destacado</span> : null}
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          <CategoryBadge category={project.category} />
          <span className={styles.year}>{project.year}</span>
        </div>

        <h3 className={styles.title}>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </h3>

        {students.length > 0 ? (
          <p className={styles.authors}>{joinNames(students)}</p>
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
              className="btn btn-secondary btn-small"
            >
              GitHub
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-small"
            >
              Demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
