import { fetchCategory } from '../lib/swapi';
import { Category, SortOrder } from '../types/swapi';
import { getRecentHistory } from '../lib/cookie-utils';
import { cookies } from 'next/headers';

import RecentHistory from '../components/RecentHistory';
import SearchForm from '../components/SearchForm';
import SortControls from '../components/SortControls';
import ResultsList from '../components/ResultsList';
import Pagination from '../components/Pagination';

const CATEGORIES: Category[] = ['people', 'films', 'planets', 'starships', 'vehicles', 'species'];
const ITEMS_PER_PAGE = 10;

interface PageProps {
  searchParams: Promise<{
    category?: Category;
    search?: string;
    page?: string;
    sort?: SortOrder;
  }>;
}

// Server Action defined here (or move to a separate file later)
async function updateRecentCategory(formData: FormData) {
  'use server';
  
  const selectedCategory = formData.get('category') as string;
  if (!selectedCategory) return;

  // Reuse your existing cookie logic
  const cookieStore = await cookies();   // import { cookies } from 'next/headers' at top
  let history: string[] = [];

  try {
    const existing = cookieStore.get('recent_category')?.value;
    if (existing) {
      const parsed = JSON.parse(existing);
      history = Array.isArray(parsed) ? parsed : typeof parsed === 'string' ? [parsed] : [];
    }
  } catch {
    history = [];
  }

  const updated = [
    selectedCategory,
    ...history.filter((c) => c !== selectedCategory)
  ].slice(0, 5);

  cookieStore.set('recent_category', JSON.stringify(updated), {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export default async function StarWarsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category: Category = params.category ?? 'people';
  const search = params.search ?? '';
  const currentPage = parseInt(params.page ?? '1');
  const sort: SortOrder = params.sort ?? 'asc';

  const recentHistory = await getRecentHistory();
  const data = await fetchCategory(category);

  // Filtering
  const filteredResults = data.results.filter((item: any) => {
    if (!search) return true;
    return Object.values(item).some((value: any) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    );
  });

  // Sorting
  const sortedResults = [...filteredResults].sort((a: any, b: any) => {
    const key = category === 'films' ? 'title' : 'name';
    const valueA = String(a[key] ?? '').toLowerCase();
    const valueB = String(b[key] ?? '').toLowerCase();

    if (sort === 'asc') {
      return valueA.localeCompare(valueB);
    }
    return valueB.localeCompare(valueA);
  });

  const totalPages = Math.ceil(sortedResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = sortedResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const buildUrl = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams({
      category,
      search,
      page: String(currentPage),
      sort,
      ...updates,
    });
    return `?${newParams.toString()}`;
  };

  return (
   <main className="max-w-4xl mx-auto p-8" role="main" aria-labelledby="page-title">
    <h1 id="page-title" className="text-3xl font-bold mb-8">
      Star Wars Explorer
    </h1>

      <RecentHistory recentHistory={recentHistory} currentCategory={category} />
      
      {/* Pass the server action as a prop */}
      <SearchForm 
        category={category} 
        search={search} 
        sort={sort}
        updateRecentCategory={updateRecentCategory}
      />

      <SortControls currentSort={sort} buildUrl={buildUrl} />

      <p className="text-gray-500 mb-4">
        Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, sortedResults.length)} of {sortedResults.length} results
      </p>

      <ResultsList results={paginatedResults} search={search} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        buildUrl={buildUrl} 
      />
    </main>
  );
}