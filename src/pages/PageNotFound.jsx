export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <a href="/" className="text-blue-600 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}
