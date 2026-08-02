import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.empty} role="status">
      <div className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path
            fill="currentColor"
            d="M12 2 2 7v10l10 5 10-5V7Zm0 2.24 6.91 3.46L12 11.15 5.09 7.7Zm-7 4.53 6 3v6.63l-6-3Zm8 9.63v-6.63l6-3v6.63Z"
          />
        </svg>
      </div>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
