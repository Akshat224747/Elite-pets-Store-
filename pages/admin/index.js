import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('ep_admin', 'true')
        router.push('/admin/dashboard')
      } else {
        setError('Incorrect password. Try again.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <>
      <Head><title>Admin Login — ElitePets</title></Head>
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-10">
            <span className="text-4xl">🐾</span>
            <h1 className="text-2xl font-bold text-white mt-2">
              Elite<span style={{color:'#f59e0b'}}>Pets</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-8">
            <h2 className="text-white font-bold text-xl mb-6">Sign In</h2>

            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition text-sm"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !password}
              className="w-full py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50"
              style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">ElitePets Admin v1.0</p>
        </div>
      </div>
    </>
  )
}
