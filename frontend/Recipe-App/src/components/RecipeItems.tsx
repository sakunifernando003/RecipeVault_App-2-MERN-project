import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { FaStopwatch, FaEdit, FaClock } from 'react-icons/fa'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { GiCookingPot } from 'react-icons/gi'


export interface Recipe {
  _id: string
  title: string
  ingredients: string[]
  instructions: string
  time?: string
  coverImage?: string
  createdBy?: string
}

export default function RecipeItems() {
  const recipes = useLoaderData() as Recipe[]

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const isMyRecipePage = window.location.pathname === '/myRecipe'

  const [favItems, setFavItems] = useState<Recipe[]>(() => {
    const stored = localStorage.getItem('fav')
    return stored ? JSON.parse(stored) : []
  })

  const fallbackImage = 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop'

  useEffect(() => {
    setAllRecipes(recipes || [])
  }, [recipes])

  useEffect(() => {
    localStorage.setItem('fav', JSON.stringify(favItems))
  }, [favItems])

  const onDelete = async (id: string): Promise<void> => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login to delete recipes')
        return
      }

      await axios.delete(`http://localhost:5000/recipe/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      setAllRecipes(prev => prev.filter(r => r._id !== id))
      setFavItems(prev => prev.filter(r => r._id !== id))
    } catch (error) {
      console.error('Error deleting recipe:', error)
      alert('Failed to delete recipe')
    }
  }

  const toggleFav = (item: Recipe): void => {
    setFavItems(prev =>
      prev.some(r => r._id === item._id)
        ? prev.filter(r => r._id !== item._id)
        : [...prev, item]
    )
  }

  return (
    <div>
      {allRecipes.length === 0 ? (
        <div className="text-center py-16">
          <GiCookingPot className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Recipes Found</h3>
          <p className="text-gray-500">Be the first to share your delicious recipe!</p>
          <Link 
            to="/addRecipe" 
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-600 transition"
          >
            Add Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allRecipes.map(item => {
            const isFav = favItems.some(r => r._id === item._id)

            return (
              <div 
                key={item._id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      item.coverImage
                        ? `http://localhost:5000/images/${item.coverImage}`
                        : fallbackImage
                    }
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = fallbackImage
                    }}
                  />
                  
                  {!isMyRecipePage && (
                    <button
                      onClick={() => toggleFav(item)}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition"
                    >
                      <BsFillSuitHeartFill
                        className={`text-xl ${isFav ? 'text-red-500' : 'text-gray-400'}`}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      />
                    </button>
                  )}
                </div>

              
                <div className="p-5">
                 
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.slice(0, 2).map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                        >
                          {ingredient.length > 15 ? ingredient.substring(0, 15) + '...' : ingredient}
                        </span>
                      ))}
                      {item.ingredients.length > 2 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          +{item.ingredients.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Time */}
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-2 text-green-500" />
                      <span className="text-sm font-medium">
                        {item.time || 'N/A'}
                      </span>
                    </div>

                 
                    {isMyRecipePage ? (
                      <div className="flex items-center space-x-4">
                        <Link
                          to={`/editRecipe/${item._id}`}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                          title="Edit recipe"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this recipe?')) {
                              onDelete(item._id)
                            }
                          }}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                          title="Delete recipe"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    ) : (
                      <Link
                        to={`/recipe/${item._id}`}
                        className="text-sm font-medium text-green-600 hover:text-green-700 transition"
                      >
                        View Recipe →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}