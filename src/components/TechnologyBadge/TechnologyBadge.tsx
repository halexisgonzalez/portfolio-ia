import styles from './TechnologyBadge.module.css';

interface TechnologyBadgeProps {
  technology: string;
  as?: 'span' | 'li';
}

export function TechnologyBadge({ technology, as: Tag = 'span' }: TechnologyBadgeProps) {
  return <Tag className={styles.badge}>{technology}</Tag>;
}
