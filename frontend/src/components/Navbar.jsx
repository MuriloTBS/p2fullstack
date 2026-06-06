import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname.startsWith(path)
        ? 'bg-indigo-700 text-white'
        : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
    }`

  return (
    <nav className="bg-indigo-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="text-white font-bold text-lg tracking-wide">
              📦 P2 FullStack
            </Link>
            <div className="hidden md:flex ml-8 gap-2">
              <Link to="/categorias" className={linkClass('/categorias')}>Categorias</Link>
              {isAdmin() && (
                <Link to="/usuarios" className={linkClass('/usuarios')}>Usuários</Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-indigo-200 text-sm hidden sm:block">
              {user?.name}
              {isAdmin() && (
                <span className="ml-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  ADMIN
                </span>
              )}
            </span>
            <button
              onClick={logout}
              className="bg-indigo-600 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-md transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-3 flex gap-2">
          <Link to="/categorias" className={linkClass('/categorias')}>Categorias</Link>
          {isAdmin() && (
            <Link to="/usuarios" className={linkClass('/usuarios')}>Usuários</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
