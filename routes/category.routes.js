const express = require("express");
const {createCategory,getCategory,getParticular,deleteCategory,updateCategory} = require('../controller/category.controller')
const {directoryChecker,upload} = require('../library/helpers/imageHandler')
const categoryRoutes = express.Router();



directoryChecker()

categoryRoutes.get('/',getCategory)

//categoryRoutes.post('/upload',uploadTesting)

categoryRoutes.get('/:id',getParticular)

categoryRoutes.post('/create',upload.single('file'),createCategory)

categoryRoutes.put('/create/:id',updateCategory)

categoryRoutes.delete('/create/:id',deleteCategory)

module.exports = categoryRoutes;
