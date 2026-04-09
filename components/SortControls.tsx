import styles from '../css/SortControls.module.css';

type Props = {
  currentSort: string;
  buildUrl: (updates: Record<string, string>) => string;
};

export default function SortControls({ currentSort, buildUrl }: Props) {
  return (
    <nav aria-label="Sort results" className={styles.nav}>
      <span className={styles.label}>Sort by:</span>

      <a
        href={buildUrl({ sort: 'asc', page: '1' })}
        aria-label="Sort alphabetically A to Z"
        className={`${styles.sortButton} ${currentSort === 'asc' ? styles.active : styles.inactive}`}
      >
        A → Z
      </a>

      <a
        href={buildUrl({ sort: 'desc', page: '1' })}
        aria-label="Sort alphabetically Z to A"
        className={`${styles.sortButton} ${currentSort === 'desc' ? styles.active : styles.inactive}`}
      >
        Z → A
      </a>
    </nav>
  );
}