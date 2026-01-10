import axios from 'axios'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface RecipeForm {
  title: string
  time: string
  ingredients: string[]
  instructions: string
  file: File | null
}

export default function AddFoodRecipe() {
  const navigate = useNavigate()

  const [recipeData, setRecipeData] = useState<RecipeForm>({
    title: '',
    time: '',
    ingredients: [],
    instructions: '',
    file: null
  })

  const [ingredientInput, setIngredientInput] = useState<string>('')

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target

    setRecipeData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    setRecipeData(prev => ({
      ...prev,
      file: files && files.length > 0 ? files[0] : null
    }))
  }

  const handleIngredientsChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value
    setIngredientInput(value)
    
    
    const ingredientsArray = value
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0)
    
    setRecipeData(prev => ({
      ...prev,
      ingredients: ingredientsArray
    }))
  }

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    
    if (!recipeData.title.trim() || !recipeData.time.trim() || 
        recipeData.ingredients.length === 0 || !recipeData.instructions.trim()) {
      alert('Please fill in all required fields')
      return
    }

    const formData = new FormData()
    formData.append('title', recipeData.title)
    formData.append('time', recipeData.time)
    formData.append('instructions', recipeData.instructions)
    
    
    recipeData.ingredients.forEach(i => {
      formData.append('ingredients[]', i)
    })

    if (recipeData.file) {
      formData.append('file', recipeData.file)
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      await axios.post('http://localhost:5000/recipe', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      
      setRecipeData({
        title: '',
        time: '',
        ingredients: [],
        instructions: '',
        file: null
      })
      setIngredientInput('')
      
      navigate('/')
    } catch (error) {
      console.error('Error adding recipe:', error)
      alert('Failed to add recipe. Please try again.')
    }
  }

 return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <form
      onSubmit={onHandleSubmit}
      className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Add New Recipe 
      </h2>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={recipeData.title}
          onChange={handleInputChange}
          placeholder="Spicy Chicken Curry"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time *
        </label>
        <input
          type="text"
          name="time"
          value={recipeData.time}
          onChange={handleInputChange}
          placeholder="30 minutes"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

    
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ingredients *
        </label>
        <textarea
          rows={4}
          value={ingredientInput}
          onChange={handleIngredientsChange}
          placeholder="Flour, Sugar, Eggs"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {recipeData.ingredients.length > 0
            ? recipeData.ingredients.join(', ')
            : 'No ingredients added yet'}
        </p>
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instructions *
        </label>
        <textarea
          rows={5}
          name="instructions"
          value={recipeData.instructions}
          onChange={handleInputChange}
          placeholder="Step-by-step cooking instructions..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recipe Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:rounded-lg file:border-0
                     file:bg-yellow-400 file:px-4 file:py-2
                     file:text-sm file:font-semibold
                     hover:file:bg-yellow-500"
        />
        {recipeData.file && (
          <p className="text-xs text-gray-500 mt-1">
            Selected: {recipeData.file.name}
          </p>
        )}
      </div>

    
      <button
        type="submit"
        className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500 transition"
      >
        Add Recipe
      </button>
    </form>
  </div>
)

}