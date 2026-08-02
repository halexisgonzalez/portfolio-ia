import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/format';
import styles from './YearCard.module.css';

interface YearCardProps {
  year: number;
  studentCount: number;
  projectCount: number;
  materialUrl?: string;
}

export function YearCard({ year, studentCount, projectCount, materialUrl }: YearCardProps) {
  return (
    <article className={`card card-hoverable ${styles.card}`}>
      <Link to={`/years/${year}`} className={styles.link}>
        <span className={styles.year}>{year}</span>
        <div className={styles.stats}>
          <span>
            {studentCount} {pluralize(studentCount, 'estudiante', 'estudiantes')}
          </span>
          <span>
            {projectCount} {pluralize(projectCount, 'proyecto', 'proyectos')}
          </span>
        </div>
      </Link>

      <div className={styles.actions}>
        <Link to={`/years/${year}`} className="btn btn-secondary btn-small">
          Ver cohorte
        </Link>
        {materialUrl ? (
          <a
            href={materialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-small"
          >
            Ver material {year}
          </a>
        ) : null}
      </div>
    </article>
  );
}
