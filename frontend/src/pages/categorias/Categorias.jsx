import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert'
import api from '../../services/api'

export default function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({ type: '', message: '' })

  const load = () => {
    setLoading(true)
    api.get('/categorias')
      .then(({ data }) => setCategorias(data))
      .catch(() => setAlert({ type: 'error', message: 'Erro ao carregar categorias.' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const remove = async (id, nome) => {
    if (!confirm(`Remover a categoria "${nome}"?`)) return
    try {
      await api.delete(`/categorias/${id}`)
      setAlert({ type: 'success', message: 'Categoria removida com sucesso!' })
      load()
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Erro ao remover.' })
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
        <Link
          to="/categorias/novo"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Nova Categoria
        </Link>
      </div>

      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Carregando...</div>
        ) : categorias.length === 0 ? (
          <div className="p-8 text-center text-gray-400">Nenhuma categoria cadastrada.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">ID</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Nome</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium hidden md:table-cell">Descrição</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categorias.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-400">{cat.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{cat.nome}</td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                    {cat.descricao || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/categorias/${cat.id}/editar`}
                      className="inline-block bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => remove(cat.id, cat.nome)}
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
