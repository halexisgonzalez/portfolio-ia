import type { CSSProperties } from 'react';
import type { ProjectCategory } from '../../types/portfolio';
import { getCategoryColor } from '../../utils/categoryColors';
import styles from './CategoryBadge.module.css';

interface CategoryBadgeProps {
  category: ProjectCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const color = getCategoryColor(category);

  return (
    <span className={styles.badge} style={{ '--dot-color': color } as CSSProperties}>
      <span className={styles.dot} aria-hidden="true" />
      {category}
    </span>
  );
}
