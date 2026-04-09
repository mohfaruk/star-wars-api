import { Category, SwapiResponse } from '@/types/swapi'

const BASE_URL = 'https://swapi.dev/api'

export async function fetchCategory(category: Category): Promise<SwapiResponse> {

  // fetch first page to get total count
  const firstResponse = await fetch(`${BASE_URL}/${category}`, {
    cache: 'no-store'
  })

  if (!firstResponse.ok) {
    throw new Error(`Failed to fetch ${category}`)
  }

  const firstPageData: SwapiResponse = await firstResponse.json()

  // calculate total number of pages
  const totalPages = Math.ceil(firstPageData.count / 10)

  // if only one page exists return immediately
  if (totalPages === 1) return firstPageData

  // fetch all remaining pages simultaneously
  const remainingPages = Array.from(
    { length: totalPages - 1 },
    (_, index) =>
      fetch(`${BASE_URL}/${category}?page=${index + 2}`, {
        cache: 'no-store'
      }).then((res) => res.json() as Promise<SwapiResponse>)
  )

  const remainingData = await Promise.all(remainingPages)

  // combine all pages into one results array
  const allResults = [
    ...firstPageData.results,
    ...remainingData.flatMap((page) => page.results)
  ]

  return {
    count: firstPageData.count,
    results: allResults
  }
}