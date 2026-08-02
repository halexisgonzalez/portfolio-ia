import type { ProjectCategory } from '../types/portfolio';

/**
 * One accent color per category, used only as a small identifying dot on
 * badges so the UI stays legible instead of turning into a rainbow.
 */
const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  'Machine Learning': '#7c8cff',
  'Deep Learning': '#a78bfa',
  'Computer Vision': '#35d0c9',
  'Natural Language Processing': '#f6ad55',
  'Data Science': '#60a5fa',
  Robótica: '#fb7185',
  'Generative AI': '#e879f9',
  Other: '#9ba0b4',
};

export function getCategoryColor(category: ProjectCategory): string {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;
}
