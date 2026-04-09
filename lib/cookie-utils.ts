// lib/cookie-utils.ts
import { cookies } from 'next/headers';

export async function getRecentHistory(): Promise<string[]> {
  const cookieStore = await cookies();

  try {
    const cookieValue = cookieStore.get('recent_category')?.value;
    if (!cookieValue) return [];

    const parsed = JSON.parse(cookieValue);

    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === 'string') return [parsed];

    return [];
  } catch {
    return [];
  }
}

export async function updateRecentHistory(selectedCategory: string) {
  const cookieStore = await cookies();

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