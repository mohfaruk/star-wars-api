import { Category } from '../types/swapi';
import styles from '../css/SearchForm.module.css';

type Props = {
  category: Category;
  search: string;
  sort: string;
  updateRecentCategory: (formData: FormData) => Promise<void>;
};

export default function SearchForm({
  category,
  search,
  sort,
  updateRecentCategory,
}: Props) {
  return (
    <form
      key={category}
      className={styles.form}
      action={updateRecentCategory}
    >
      <div className={styles.field}>
        <label htmlFor="category-select" className={styles.label}>
          Category
        </label>
        <select
          id="category-select"
          name="category"
          defaultValue={category}
          className={styles.select}
        >
          {['people', 'films', 'planets', 'starships', 'vehicles', 'species'].map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="search-input" className={styles.label}>
          Search term
        </label>
        <input
          id="search-input"
          type="text"
          name="search"
          defaultValue={search}
          placeholder={`Search ${category}...`}
          className={styles.input}
        />
      </div>

      <input type="hidden" name="sort" value={sort} />
      <input type="hidden" name="page" value="1" />

      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}