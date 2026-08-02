import { EmptyState } from '../../components/EmptyState/EmptyState';
import { YearCard } from '../../components/YearCard/YearCard';
import { getYear, getYearStats } from '../../data';
import styles from './Years.module.css';

export function Years() {
  const yearStats = getYearStats();

  return (
    <section className="section">
      <div className="container">
        <div className={styles.header}>
          <h1>Cohortes</h1>
          <p className="text-muted">
            El portfolio crece cada año. Elegí una cohorte para ver sus
            estudiantes y proyectos.
          </p>
        </div>

        {yearStats.length > 0 ? (
          <div className={styles.grid}>
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
  );
}
