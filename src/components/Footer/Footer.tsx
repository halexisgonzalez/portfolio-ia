import { courseInfo, institution, siteConfig } from '../../config/site';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div>
          <p className={styles.institutionLine}>{institution.name}</p>
          <p className={styles.courseLine}>
            {courseInfo.program} · {courseInfo.subject} · {courseInfo.professor} ·{' '}
            <a href={`mailto:${courseInfo.contactEmail}`}>{courseInfo.contactEmail}</a>
          </p>
        </div>

        <span className={styles.logoBadge}>
          <img
            src={`${import.meta.env.BASE_URL}${institution.logo}`}
            alt={institution.logoAlt}
            className={styles.logo}
          />
        </span>
      </div>

      <div className={`container ${styles.inner}`}>
        <p>
          {siteConfig.name} · Portfolio académico histórico de proyectos de
          Inteligencia Artificial.
        </p>
        <div className={styles.links}>
          <a href={siteConfig.repositoryUrl} target="_blank" rel="noopener noreferrer">
            Repositorio en GitHub
          </a>
          <span aria-hidden="true">·</span>
          <span>&copy; {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
