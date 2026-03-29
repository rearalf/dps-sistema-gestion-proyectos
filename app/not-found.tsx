import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-100 mb-2">
          Página no encontrada
        </h2>
        <p className="text-gray-400 mb-8">
          La página que buscás no existe o fue movida.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Volver al Dashboard
        </Link>
      </div>
    </main>
  );
}
