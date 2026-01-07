const express=require("express")
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload } = require("../controller/recipeController")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getRecipes) //get all the recipes
router.get("/:id",getRecipe)//get recipe by id
router.post("/", upload.single('file'),verifyToken ,addRecipe)//add recipe
router.put("/:id",editRecipe)// edit recipe
router.delete("/:id",deleteRecipe)//delete recipe



module.exports=router

