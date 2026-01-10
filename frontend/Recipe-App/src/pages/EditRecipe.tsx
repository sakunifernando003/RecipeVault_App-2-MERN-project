import axios from 'axios'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiClock, FiFileText, FiImage, FiList } from 'react-icons/fi'

interface RecipeForm {
  title: string
  time: string
  ingredients: string
  instructions: string
  file: File | null
}

export default function EditRecipe() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [recipeData, setRecipeData] = useState<RecipeForm>({
    title: '',
    time: '',
    ingredients: '',
    instructions: '',
    file: null
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipe/${id}`)
        
        setRecipeData({
          title: res.data.title,
          time: res.data.time,
          ingredients: Array.isArray(res.data.ingredients) 
            ? res.data.ingredients.join(', ')
            : res.data.ingredients,
          instructions: res.data.instructions,
          file: null
        })
      } catch (error) {
        console.error('Error fetching recipe:', error)
        setError('Failed to load recipe. Please try again.')
      } finally {
        setIsFetching(false)
      }
    }

    if (id) getData()
  }, [id])

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

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (!recipeData.title.trim() || !recipeData.time.trim() || 
        !recipeData.ingredients.trim() || !recipeData.instructions.trim()) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', recipeData.title)
    formData.append('time', recipeData.time)
    formData.append('instructions', recipeData.instructions)

    // Handle ingredients array
    const ingredientsArray = recipeData.ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0)
    
    ingredientsArray.forEach(i => formData.append('ingredients[]', i))

    if (recipeData.file) {
      formData.append('file', recipeData.file)
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      alert('Recipe updated successfully!')
      navigate('/myRecipe')
    } catch (error) {
      console.error('Error updating recipe:', error)
      setError('Failed to update recipe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
       
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Edit Recipe</h1>
          <p className="text-gray-600">Update your delicious recipe</p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Update Recipe Details</h2>
            <p className="text-amber-100 mt-1">Make changes to your recipe below</p>
          </div>

          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

        
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="inline-flex items-center">
                  {/* <span className="text-amber-500 mr-2"></span> */}
                  Recipe Title
                </span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={recipeData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200"
                placeholder="What's your recipe called?"
                required
              />
            </div>

           
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="inline-flex items-center">
                  <FiClock className="text-amber-500 mr-2" />
                  Preparation Time
                </span>
              </label>
              <input
                id="time"
                type="text"
                name="time"
                value={recipeData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200"
                placeholder="e.g., 30 minutes, 1 hour 15 mins"
                required
              />
            </div>

           
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="inline-flex items-center">
                  <FiList className="text-amber-500 mr-2" />
                  Ingredients
                  <span className="ml-2 text-xs text-gray-500">
                    (separate with commas)
                  </span>
                </span>
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                rows={4}
                value={recipeData.ingredients}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200"
                placeholder="Enter ingredients separated by commas (e.g., flour, sugar, eggs, milk)"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Currently {recipeData.ingredients.split(',').filter(i => i.trim()).length} ingredients
              </p>
            </div>

         
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="inline-flex items-center">
                  <FiFileText className="text-amber-500 mr-2" />
                  Instructions
                </span>
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={6}
                value={recipeData.instructions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200"
                placeholder="Provide detailed step-by-step instructions..."
                required
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <span className="inline-flex items-center">
                  <FiImage className="text-amber-500 mr-2" />
                  Recipe Image (Optional - Leave empty to keep current image)
                </span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-xl hover:border-amber-400 transition duration-200">
                <div className="space-y-2 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500">
                      <span>Upload new image</span>
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {recipeData.file && (
                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                          <svg
                            className="h-6 w-6 text-amber-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{recipeData.file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(recipeData.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRecipeData(prev => ({ ...prev, file: null }))}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to keep the current image. Upload new image to replace.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/myRecipe')}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition duration-200"
              >
                ← Back to My Recipes
              </button>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/myRecipe')}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating Recipe...
                    </span>
                  ) : (
                    'Update Recipe'
                  )}
                </button>
              </div>
            </div>
          </form>

          
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Make sure all information is accurate before updating.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}