type Props = {
  results: any[];
  search: string;
};

export default function ResultsList({ results, search }: Props) {
  if (results.length === 0) {
    return <p>No results found for "{search}"</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 mb-8">
      {results.map((item, index) => (
        <li key={index} className="border rounded p-4">
          {Object.entries(item).map(([key, value]) => (
            !String(value).startsWith('http') && (
              <p key={key} className="text-sm">
                <span className="font-semibold capitalize">{key}: </span>
                {String(value)}
              </p>
            )
          ))}
        </li>
      ))}
    </ul>
  );
}