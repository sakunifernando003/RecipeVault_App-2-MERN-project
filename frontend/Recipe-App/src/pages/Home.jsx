import React from 'react'
import foodRecipe from '../assets/food.webp'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import RecipeItems from '../components/RecipeItems'


export default function Home () {
  return (
    <>
      
        <section className='home'>
            <div className='left'>
                <h1>Food Recipe</h1>
                <h5>A simple and user-friendly food recipe app designed to make cooking stress-free and fun. Discover a variety of recipes with clear ingredients, easy step-by-step instructions, and quick preparation times, all in one place. Whether you’re a beginner or a late-night hunger survivor, this app helps you cook smarter, faster, and with confidence—because good food shouldn’t be complicated.</h5>
                <button>share your recipe</button>
            </div>
            <div className='right'>
                <img src={foodRecipe} width="320px" height="300px"></img>
            </div>

        </section>
        <div className='bg'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fillOpacity="1" d="M0,224L34.3,224C68.6,224,137,224,206,186.7C274.3,149,343,75,411,80C480,85,549,171,617,176C685.7,181,754,107,823,117.3C891.4,128,960,224,1029,245.3C1097.1,267,1166,213,1234,176C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
        </div>
       
       <div className='recipe'>
        <RecipeItems/>
       </div>
       
    </>
  )
}
