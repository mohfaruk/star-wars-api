export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-lg text-gray-500">Loading Star Wars data...</p>
    </div>
  )
}