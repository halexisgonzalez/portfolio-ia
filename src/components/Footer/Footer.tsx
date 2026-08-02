import { siteConfig } from '../../config/site';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <span className={styles.logoBadge}>
          <img
            src={`${import.meta.env.BASE_URL}images/university-logo.png`}
            alt="Universidad de la Defensa Nacional (UNDEF)"
            className={styles.logo}
          />
        </span>
        <span className={styles.institutionTitle}>
          Centro Regional Universitario Córdoba IUA
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
