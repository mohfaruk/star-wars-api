# Star Wars Explorer

A Next.js application that allows users to explore data from the Star Wars API (SWAPI) by category, with search, sorting, pagination, and recent history tracking.

## Features

- Browse Star Wars data by category: People, Films, Planets, Starships, Vehicles, Species
- Search across all fields within a category
- Sort results alphabetically (ascending/descending)
- Paginated results for improved performance and usability
- Recent category history stored using cookies
- Server-side rendering using Next.js App Router
- Accessible and responsive UI

## Approach & Implementation

### Data Fetching

Data is fetched server-side using a utility function (fetchCategory) that retrieves data from the SWAPI based on the selected category.

### Filtering

Search functionality is implemented by:

- Iterating over each item in the dataset
- Checking if any field value includes the search term (case-insensitive)

### Sorting

Sorting is handled dynamically:

- Uses name for most categories and title for films
- Supports ascending and descending order
- Uses localeCompare for consistent string comparison

### Pagination

- Results are split into pages (10 items per page)
- Current page is controlled via URL query parameters
- Pagination links are dynamically generated

## Future Improvements

- Add loading and error states for API calls
- Improve type safety for API responses
- Add unit and integration tests
- Enhance UI/UX with animations and better feedback
- Implement caching for API responses
