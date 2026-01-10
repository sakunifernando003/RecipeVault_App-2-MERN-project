import { useState } from 'react'
import axios from 'axios'

interface InputFormProps {
  setIsOpen: () => void
}

const InputForm = ({ setIsOpen }: InputFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const endpoint = isSignUp ? 'signUp' : 'login'

    try {
      const res = await axios.post(`http://localhost:5000/${endpoint}`, {
        email,
        password,
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setIsOpen()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>

      <form onSubmit={handleOnSubmit} className="space-y-5">
        
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

      
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        
        {error && (
          <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

     
        <button
          type="submit"
          className="w-full rounded-lg bg-teal-500 py-2 font-semibold text-white transition hover:bg-teal-600 active:scale-[0.98]"
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      
      <p
        onClick={() => setIsSignUp(prev => !prev)}
        className="mt-6 cursor-pointer text-center text-sm text-gray-500 hover:text-teal-500"
      >
        {isSignUp
          ? 'Already have an account? Login'
          : 'No account yet? Create one'}
      </p>
    </div>
  )
}

export default InputForm
