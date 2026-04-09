import styles from '../css/Pagination.module.css';

type Props = {
  currentPage: number;
  totalPages: number;
  buildUrl: (updates: Record<string, string>) => string;
};

export default function Pagination({ currentPage, totalPages, buildUrl }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className={styles.nav}>
      {/* Previous Button */}
      {currentPage > 1 ? (
        <a
          href={buildUrl({ page: String(currentPage - 1) })}
          aria-label={`Go to previous page (page ${currentPage - 1})`}
          className={`${styles.button} ${styles.prevNext}`}
        >
          ← Previous
        </a>
      ) : (
        <span className={`${styles.button} ${styles.disabled}`}>
          ← Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <a
            key={pageNum}
            href={buildUrl({ page: String(pageNum) })}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
            className={`${styles.pageButton} ${
              pageNum === currentPage ? styles.activePage : styles.inactivePage
            }`}
          >
            {pageNum}
          </a>
        ))}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <a
          href={buildUrl({ page: String(currentPage + 1) })}
          aria-label={`Go to next page (page ${currentPage + 1})`}
          className={`${styles.button} ${styles.prevNext}`}
        >
          Next →
        </a>
      ) : (
        <span className={`${styles.button} ${styles.disabled}`}>
          Next →
        </span>
      )}
    </nav>
  );
}