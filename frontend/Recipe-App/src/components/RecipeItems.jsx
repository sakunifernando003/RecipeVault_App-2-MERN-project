import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import foodImg from '../assets/food 1.jpg'
import { FaStopwatch, FaEdit } from "react-icons/fa"
import { BsFillSuitHeartFill } from "react-icons/bs"
import { MdDelete } from "react-icons/md"

export default function RecipeItems() {
  const recipes = useLoaderData()
  const [allRecipes, setAllRecipes] = useState([])
  const isMyRecipePage = window.location.pathname === "/myRecipe"

  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) ?? []
  )

  useEffect(() => {
    setAllRecipes(recipes || [])
  }, [recipes])

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favItems))
  }, [favItems])

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`, {
      headers: {
        authorization: 'bearer ' + localStorage.getItem("token")
      }
    })

    setAllRecipes(prev => prev.filter(r => r._id !== id))
    setFavItems(prev => prev.filter(r => r._id !== id))
  }

  const toggleFav = (item) => {
    setFavItems(prev =>
      prev.some(r => r._id === item._id)
        ? prev.filter(r => r._id !== item._id)
        : [...prev, item]
    )
  }

  return (
    <div className='card-container'>
      {allRecipes.map(item => {
        const isFav = favItems.some(r => r._id === item._id)

        return (
          <div key={item._id} className='card'>
            <img
              src={
                item.coverImage
                  ? `http://localhost:5000/images/${item.coverImage}`
                  : foodImg
              }
              width="120"
              height="100"
              alt={item.title}
            />

            <div className='card-body'>
              <div className='title'>{item.title}</div>

              <div className='icons'>
                <div className='timer'>
                  <FaStopwatch /> {item.time}
                </div>

                {!isMyRecipePage ? (
                  <BsFillSuitHeartFill
                    onClick={() => toggleFav(item)}
                    style={{ color: isFav ? "red" : "gray", cursor: "pointer" }}
                  />
                ) : (
                  <div className='action'>
                    <Link to={`/editRecipe/${item._id}`} className="editIcon">
                      <FaEdit />
                    </Link>
                    <MdDelete
                      className='deleteIcon'
                      onClick={() => onDelete(item._id)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
