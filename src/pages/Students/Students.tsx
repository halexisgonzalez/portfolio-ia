import { useMemo, useState } from 'react';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { StudentCard } from '../../components/StudentCard/StudentCard';
import { getAllStudents } from '../../data';
import { filterStudentsByName } from '../../utils/projectFilters';
import styles from './Students.module.css';

export function Students() {
  const [query, setQuery] = useState('');
  const allStudents = useMemo(() => getAllStudents(), []);
  const filteredStudents = useMemo(
    () => filterStudentsByName(allStudents, query),
    [allStudents, query],
  );

  return (
    <section className="section">
      <div className="container">
        <div className={styles.header}>
          <h1>Estudiantes</h1>
          <p className="text-muted">
            Conocé a los estudiantes que formaron parte de las distintas
            cohortes del curso.
          </p>
        </div>

        <div className={styles.controls}>
          <SearchInput
            id="student-search"
            label="Buscar estudiantes"
            placeholder="Buscar por nombre..."
            value={query}
            onChange={setQuery}
          />
        </div>

        <p className={styles.resultCount}>
          {filteredStudents.length} de {allStudents.length} estudiantes
        </p>

        {filteredStudents.length > 0 ? (
          <div className={styles.grid}>
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No se encontraron estudiantes"
            description="Probá con otro nombre."
          />
        )}
      </div>
    </section>
  );
}
