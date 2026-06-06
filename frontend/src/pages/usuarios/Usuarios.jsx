import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert'
import api from '../../services/api'

const ROLE_BADGE = {
  admin: 'bg-yellow-100 text-yellow-800',
  user:  'bg-blue-100 text-blue-800',
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({ type: '', message: '' })

  const load = () => {
    setLoading(true)
    api.get('/users')
      .then(({ data }) => setUsuarios(data))
      .catch((err) => setAlert({ type: 'error', message: err.response?.data?.message || 'Erro ao carregar usuários.' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const remove = async (id, name) => {
    if (!confirm(`Remover o usuário "${name}"?`)) return
    try {
      await api.delete(`/users/${id}`)
      setAlert({ type: 'success', message: 'Usuário removido com sucesso!' })
      load()
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Erro ao remover.' })
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
        <Link
          to="/usuarios/novo"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Novo Usuário
        </Link>
      </div>

      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Carregando...</div>
        ) : usuarios.length === 0 ? (
          <div className="p-8 text-center text-gray-400">Nenhum usuário cadastrado.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Nome</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium hidden md:table-cell">E-mail</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Perfil</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usuarios.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{u.name}</td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_BADGE[u.role]}`}>
                      {u.role === 'admin' ? 'Admin' : 'Usuário'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/usuarios/${u.id}/editar`}
                      className="inline-block bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => remove(u.id, u.name)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}
