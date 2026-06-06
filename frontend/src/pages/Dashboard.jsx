import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import api from '../services/api'

export default function Dashboard() {
  const { user, isAdmin } = useAuth()
  const [stats, setStats] = useState({ categorias: 0, usuarios: 0 })

  useEffect(() => {
    api.get('/categorias').then(({ data }) => {
      setStats((s) => ({ ...s, categorias: data.length }))
    }).catch(() => {})

    if (isAdmin()) {
      api.get('/users').then(({ data }) => {
        setStats((s) => ({ ...s, usuarios: data.length }))
      }).catch(() => {})
    }
  }, [])

  const cards = [
    { label: 'Categorias', count: stats.categorias, icon: '🗂️', to: '/categorias', color: 'bg-blue-500' },
    ...(isAdmin() ? [{ label: 'Usuários', count: stats.usuarios, icon: '👥', to: '/usuarios', color: 'bg-purple-500' }] : []),
  ]

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Olá, {user?.name}! 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          {isAdmin() ? 'Você tem acesso completo ao sistema.' : 'Você está conectado como usuário padrão.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="bg-white rounded-xl shadow hover:shadow-md transition-shadow p-6 flex items-center gap-5 group"
          >
            <div className={`${card.color} text-white text-3xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-3xl font-bold text-gray-800">{card.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}
