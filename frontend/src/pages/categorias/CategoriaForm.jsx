import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert'
import api from '../../services/api'

export default function CategoriaForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ nome: '', descricao: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [alert, setAlert] = useState({ type: '', message: '' })

  useEffect(() => {
    if (!isEdit) return
    api.get(`/categorias/${id}`)
      .then(({ data }) => setForm({ nome: data.nome, descricao: data.descricao || '' }))
      .catch(() => setAlert({ type: 'error', message: 'Erro ao carregar categoria.' }))
      .finally(() => setFetching(false))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAlert({ type: '', message: '' })
    try {
      if (isEdit) {
        await api.put(`/categorias/${id}`, form)
      } else {
        await api.post('/categorias', form)
      }
      navigate('/categorias', { state: { success: isEdit ? 'Categoria atualizada!' : 'Categoria criada!' } })
    } catch (err) {
      const errors = err.response?.data?.errors
      const msg = errors
        ? Object.values(errors).flat().join(' ')
        : err.response?.data?.message || 'Erro ao salvar.'
      setAlert({ type: 'error', message: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/categorias" className="text-gray-400 hover:text-gray-600 transition-colors">←</Link>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? 'Editar Categoria' : 'Nova Categoria'}
          </h1>
        </div>

        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

        <div className="bg-white rounded-xl shadow p-6">
          {fetching ? (
            <p className="text-center text-gray-400 py-8">Carregando...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Nome da categoria"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  rows={3}
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Descrição opcional"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                >
                  {loading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Cadastrar'}
                </button>
                <Link
                  to="/categorias"
                  className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition-colors text-sm"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  )
}
