import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn({ email, password })
      } else {
        await signUp({ email, password })
      }
      navigate('/')
    } catch (err) {
      setError(err.message || 'Authentication error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pt-24 pb-10 px-4 flex items-start justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-200 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-ping"></div>
      </div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-green-100 rounded-2xl shadow-xl p-8 relative z-10"
      >
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-700 hover:text-[#2e8b57] transition-colors text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Icon and header */}
        <div className="text-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] rounded-full mb-4"
          >
            <span className="text-2xl text-white">🌿</span>
          </motion.div>
          <motion.h1 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-green-700"
          >
            {mode === 'login' ? 'Welcome Back!' : 'Join Our Community'}
          </motion.h1>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-green-700/70 mt-2"
          >
            {mode === 'login' ? 'Continue your organic farming journey' : 'Start your sustainable farming adventure'}
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-2 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`py-2 rounded-xl border transition-all ${mode === 'login' ? 'bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] text-white border-transparent shadow' : 'text-green-700 hover:bg-green-50 border-green-200'}`}
            onClick={() => setMode('login')}
            disabled={loading}
          >
            🔑 Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`py-2 rounded-xl border transition-all ${mode === 'signup' ? 'bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] text-white border-transparent shadow' : 'text-green-700 hover:bg-green-50 border-green-200'}`}
            onClick={() => setMode('signup')}
            disabled={loading}
          >
            🌱 Sign Up
          </motion.button>
        </motion.div>

        <motion.form 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onSubmit={onSubmit} 
          className="space-y-4"
        >
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">📧</span>
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-green-200 rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/40 focus:border-[#4CAF50] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">🔒</span>
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-green-200 rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/40 focus:border-[#4CAF50] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </motion.div>
          {error ? (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200"
            >
              ⚠️ {error}
            </motion.div>
          ) : null}
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] text-white font-semibold shadow-lg hover:from-[#4CAF50] hover:to-[#2e8b57] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Please wait...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {mode === 'login' ? '🚀 Login' : '🌟 Create Account'}
              </span>
            )}
          </motion.button>
        </motion.form>

        {/* Footer message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-xs text-green-700/60"
        >
          🌍 Growing a sustainable future together
        </motion.div>
      </motion.div>
    </div>
  )
}
