import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PrivateRoute, AdminRoute } from './components/PrivateRoute'

import Login       from './pages/Login'
import Dashboard   from './pages/Dashboard'
import Categorias  from './pages/categorias/Categorias'
import CategoriaForm from './pages/categorias/CategoriaForm'
import Usuarios    from './pages/usuarios/Usuarios'
import UsuarioForm from './pages/usuarios/UsuarioForm'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          <Route path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />
          <Route path="/categorias/novo" element={<PrivateRoute><CategoriaForm /></PrivateRoute>} />
          <Route path="/categorias/:id/editar" element={<PrivateRoute><CategoriaForm /></PrivateRoute>} />

          <Route path="/usuarios" element={<AdminRoute><Usuarios /></AdminRoute>} />
          <Route path="/usuarios/novo" element={<AdminRoute><UsuarioForm /></AdminRoute>} />
          <Route path="/usuarios/:id/editar" element={<AdminRoute><UsuarioForm /></AdminRoute>} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
