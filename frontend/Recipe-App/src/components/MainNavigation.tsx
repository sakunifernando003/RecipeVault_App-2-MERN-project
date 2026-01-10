import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainNavigation: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
    
      <Navbar />
      
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Food Recipe App</h3>
              <p className="text-gray-400 text-sm mt-1">Delicious recipes for everyone</p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition text-sm"
              >
                About
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Contact
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Privacy
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Terms
              </a>
            </div>
            
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Food Recipe App. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainNavigation