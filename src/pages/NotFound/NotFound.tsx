import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

interface NotFoundProps {
  title?: string;
  description?: string;
}

export function NotFound({
  title = 'Página no encontrada',
  description = 'El contenido que buscás no existe o fue movido.',
}: NotFoundProps) {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.content}`}>
        <span className={styles.code} aria-hidden="true">
          404
        </span>
        <h1>{title}</h1>
        <p className="text-muted">{description}</p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
