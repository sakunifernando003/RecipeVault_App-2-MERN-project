const Recipes = require("../models/recipeModel")
const multer = require("multer")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images")
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop()
    cb(null, `${Date.now()}.${ext}`)
  }
})

const upload = multer({ storage })



const getRecipes = async (req, res) => {
  const recipes = await Recipes.find()
  res.json(recipes)
}

const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id)
  if (!recipe) return res.status(404).json({ message: "Recipe not found" })
  res.json(recipe)
}

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required fields can't be empty" })
  }

  const newRecipe = await Recipes.create({
    title,
    ingredients,
    instructions,
    time,
    coverImage: req.file ? req.file.filename : null,
    createdBy: req.user.id
  })

  res.json(newRecipe)
}

const editRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id)
  if (!recipe) return res.status(404).json({ message: "Recipe not found" })

  const updatedData = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time
  }

  if (req.file) {
    updatedData.coverImage = req.file.filename
  }

  await Recipes.findByIdAndUpdate(req.params.id, updatedData, { new: true })
  res.json({ message: "Recipe updated successfully" })
}

const deleteRecipe = async (req, res) => {
  try{
    await Recipes.deleteOne({_id:req.params.id})
    res.json({status:"ok"})

  }
  catch(err){
    return res.status(400).json({message:"error"})

  }
 
}

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload
}
