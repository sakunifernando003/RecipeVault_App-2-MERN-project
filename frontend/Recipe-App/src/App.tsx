import { createBrowserRouter, RouterProvider } from "react-router-dom"
import axios from 'axios'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import type { Recipe } from './types/Recipe'

const getAllRecipes = async (): Promise<Recipe[]> => {
  const res = await axios.get<Recipe[]>('http://localhost:5000/recipe')
  return res.data
}

const getMyRecipe = async (): Promise<Recipe[]> => {
  const user = JSON.parse(localStorage.getItem("user") || "null")

  if (!user?._id) return []

  const allRecipes = await getAllRecipes()
  return allRecipes.filter(item => item.createdBy === user._id)
}

const getFavRecipes = (): Recipe[] => {
  return JSON.parse(localStorage.getItem("fav") || "[]")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipe },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> }
    ]
  }
])

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <RouterProvider router={router} />
    </div>
  )
}