const express = require("express");
const {createCategory} = require('../controller/category.controller')
const categoryRoutes = express.Router();


categoryRoutes.get('/',(req,res)=>{
  res.send("The category Route testing is passed")
})
categoryRoutes.post('/create',createCategory)
module.exports = categoryRoutes;
