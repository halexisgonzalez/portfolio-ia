import { Link } from 'react-router-dom';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { YearCard } from '../../components/YearCard/YearCard';
import { getFeaturedProjects, getYear, getYearStats, getPortfolioStats } from '../../data';
import styles from './Home.module.css';

const STAT_LABELS: Record<keyof ReturnType<typeof getPortfolioStats>, string> = {
  studentCount: 'estudiantes',
  projectCount: 'proyectos',
  technologyCount: 'tecnologías',
  categoryCount: 'áreas de aplicación',
};

export function Home() {
  const stats = getPortfolioStats();
  const featuredProjects = getFeaturedProjects();
  const yearStats = getYearStats();

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className="eyebrow">Portfolio académico</span>
          <h1 className={styles.heroTitle}>
            Portfolio Académico de Inteligencia Artificial
          </h1>
          <p className={styles.heroSubtitle}>
            Proyectos, experiencias y trabajos desarrollados por estudiantes a lo
            largo de las distintas cohortes.
          </p>
          <div className={styles.heroActions}>
            <Link to="/projects" className="btn btn-primary">
              Explorar proyectos
            </Link>
            <Link to="/students" className="btn btn-secondary">
              Ver estudiantes
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.statsGrid}`}>
          {(Object.keys(STAT_LABELS) as (keyof typeof STAT_LABELS)[]).map((key) => (
            <div key={key} className={`card ${styles.statCard}`}>
              <span className={styles.statValue}>{stats[key]}</span>
              <span className={styles.statLabel}>{STAT_LABELS[key]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Proyectos destacados</h2>
              <p>Una selección de trabajos sobresalientes de nuestras cohortes.</p>
            </div>
            <Link to="/projects" className="btn btn-secondary btn-small">
              Ver todos los proyectos
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className={styles.projectsGrid}>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Todavía no hay proyectos destacados"
              description="Marcá un proyecto con “featured: true” en los datos de la cohorte para que aparezca acá."
            />
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Cohortes</h2>
              <p>Explorá el portfolio histórico año a año.</p>
            </div>
          </div>

          {yearStats.length > 0 ? (
            <div className={styles.yearsGrid}>
              {yearStats.map((year) => (
                <YearCard
                  key={year.year}
                  year={year.year}
                  studentCount={year.studentCount}
                  projectCount={year.projectCount}
                  materialUrl={getYear(year.year)?.materialUrl}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Todavía no hay cohortes cargadas"
              description="Agregá un archivo en src/data (por ejemplo 2026.json) para que aparezca acá."
            />
          )}
        </div>
      </section>
    </>
  );
}
