import { Link } from 'react-router-dom';
import type { StudentWithYear } from '../../types/portfolio';
import { pluralize } from '../../utils/format';
import styles from './StudentCard.module.css';

interface StudentCardProps {
  student: StudentWithYear;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function StudentCard({ student }: StudentCardProps) {
  const projectCount = student.projectIds.length;

  return (
    <article className={`card card-hoverable ${styles.card}`}>
      <Link to={`/students/${student.id}`} className={styles.link}>
        {student.avatar ? (
          <img className={styles.avatar} src={student.avatar} alt="" loading="lazy" />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {getInitials(student.name)}
          </span>
        )}

        <div className={styles.info}>
          <h3 className={styles.name}>{student.name}</h3>
          <p className={styles.cohort}>Cohorte {student.year}</p>
          <p className={styles.projectCount}>
            {projectCount} {pluralize(projectCount, 'proyecto', 'proyectos')}
          </p>
        </div>
      </Link>

      {student.github ? (
        <a
          href={student.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-small"
        >
          GitHub
        </a>
      ) : null}
    </article>
  );
}
