import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'

export default function Layout({ children }) {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.user)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-800">HabitTracker</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-600">Hola, {user?.name}</span>
                  <button
                    onClick={() => dispatch(logout())}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}