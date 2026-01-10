import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeItems from '../components/RecipeItems'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home(): React.ReactElement {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const addRecipe = (): void => {
    const token = localStorage.getItem("token")

    if (token) {
      navigate("/addRecipe")
    } else {
      setIsOpen(true)
    }
  }

  return (
    <div className="min-h-screen">
    
      <div className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Collect Your Food Recipes</h1>
              <p className="text-lg mb-8 leading-relaxed">
                A simple and user-friendly food recipe app designed to make cooking
                stress-free and fun. Discover a variety of recipes with clear
                ingredients, easy step-by-step instructions, and quick preparation
                times, all in one place. Whether you're a beginner or a late-night
                hunger survivor, this app helps you cook smarter, faster, and with
                confidence—because good food shouldn't be complicated.
              </p>
              <button 
                onClick={addRecipe}
                className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition shadow-lg text-lg"
              >
                Share Your Recipe
              </button>
            </div>
            
           
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-4 rounded-xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop"
                  alt="Food recipe"
                  className="rounded-lg w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Discover Recipes
          </h2>
          <RecipeItems />
        </div>
      </div>

      
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  )
}