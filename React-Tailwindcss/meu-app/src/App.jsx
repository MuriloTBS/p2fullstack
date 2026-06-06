import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="rounded-xl bg-slate-800 p-8 shadow-2xl border border-slate-700 text-center">
        <h1 className="text-3xl font-bold text-sky-400 animate-bounce">
          Tailwind v4 Funcionando!
        </h1>
        <p className="mt-4 text-slate-400">
          Se o fundo estiver escuro, o texto centralizado e azul, deu certo.
        </p>
      </div>
      <div className="bg-brand-50 text-brand-900 shadow-card rounded-xl p-6">
        <h2 className="font-sans text-brand font-bold">
          Card com tema customizado
        </h2>
      </div>
      <button class="bg-sky-500 hover:bg-sky-700">Save changes</button>
    </div>
  )
}

export default App
