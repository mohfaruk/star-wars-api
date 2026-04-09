// defines the shape of data returned from each category
export type Category = 
  | 'people' 
  | 'films' 
  | 'planets' 
  | 'starships' 
  | 'vehicles' 
  | 'species'

export type SortOrder = 'asc' | 'desc'

export interface SwapiResponse {
  count: number
  results: Record<string, unknown>[]
}