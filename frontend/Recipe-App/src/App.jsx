import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider}from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios, { all } from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe'

const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get('http://localhost:5000/recipe').then(res=>{
    allRecipes=res.data
  })
  return allRecipes

}

const getMyRecipe=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const router=createBrowserRouter([
    {path:"/",element:<MainNavigation/>,children:[
       {path:"/",element:<Home/>,loader:getAllRecipes},
       {path:"/myRecipe",element:<Home/>,loader:getMyRecipe},
       {path:"/favRecipe",element:<Home/>},
       {path:"/addRecipe",element:<AddFoodRecipe/>}

    ]}
  
])

export default function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}
