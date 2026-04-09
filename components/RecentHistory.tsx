import { Category } from '@/types/swapi';
import styles from '../css/RecentHistory.module.css';

type Props = {
  recentHistory: string[];
  currentCategory: Category;
};

export default function RecentHistory({ recentHistory, currentCategory }: Props) {
  const others = recentHistory.filter((c) => c !== currentCategory);
  if (others.length === 0) return null;

  return (
    <div className={styles.container} aria-label="Recently viewed categories">
      <span className={styles.label}>Recently searched:</span>
      {others.map((recentCat) => (
        <a
          key={recentCat}
          href={`?category=${recentCat}&page=1&sort=asc&search=`}
          className={styles.historyLink}
        >
          {recentCat}
        </a>
      ))}
    </div>
  );
}