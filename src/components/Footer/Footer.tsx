import { siteConfig } from '../../config/site';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
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
