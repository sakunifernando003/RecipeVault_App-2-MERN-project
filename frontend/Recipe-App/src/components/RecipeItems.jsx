import React from 'react'
import { useLoaderData } from 'react-router-dom'
import foodImg from '../assets/food 1.jpg'
import { FaStopwatch } from "react-icons/fa";
import { BsFillSuitHeartFill } from "react-icons/bs";

export default function RecipeItems() {
    const allRecipes=useLoaderData()
    console.log(allRecipes)
  return (
    <>
        <div className='card-container'>
            {

                allRecipes?.map((item,index)=>{
                    return(
                        <div key={index} className='card'>
                            <img src={foodImg} width="120px" height="100px"></img>
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons'>
                                    <div className='timer'><FaStopwatch />35min</div>
                                    <BsFillSuitHeartFill />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}
