import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Modal from './Modal'
import InputForm from './InputForm'

interface User {
  _id: string
  email: string
}

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    setIsLoggedIn(!!token)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        setUser(null)
      }
    }
  }, [])

  const handleAuth = (): void => {
    if (isLoggedIn) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setIsLoggedIn(false)
      setUser(null)
      navigate('/')
      window.location.reload()
    } else {
      setIsOpen(true)
    }
  }

  const handleProtectedNav = (e: React.MouseEvent, path: string) => {
    if (!isLoggedIn) {
      e.preventDefault()
      setIsOpen(true)
    } else {
      navigate(path)
    }
  }

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
           
            <div className="flex items-center">
              <NavLink 
                to="/" 
                className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent"
              >
                RecipeVault
              </NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition ${isActive 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`
                }
              >
                Home
              </NavLink>

              <button
                onClick={(e) => handleProtectedNav(e, '/myRecipe')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  !isLoggedIn 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                My Recipes
              </button>

              <button
                onClick={(e) => handleProtectedNav(e, '/favRecipe')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  !isLoggedIn 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                Favorites
              </button>

              
              <button
                onClick={handleAuth}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
              >
                {isLoggedIn ? (
                  <div className="flex items-center">
                    <span>Logout</span>
                    {user?.email && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">
                        {user.email.split('@')[0]}
                      </span>
                    )}
                  </div>
                ) : (
                  'Login / Sign Up'
                )}
              </button>
            </div>

            
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-green-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm 
            setIsOpen={() => {
              setIsOpen(false)
              const token = localStorage.getItem('token')
              const storedUser = localStorage.getItem('user')
              setIsLoggedIn(!!token)
              setUser(storedUser ? JSON.parse(storedUser) : null)
            }} 
          />
        </Modal>
      )}
    </>
  )
}

export default Navbar