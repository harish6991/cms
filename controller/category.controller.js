const categoryDb = require('../models/category.models');
const {directoryChecker,upload} = require('../library/helpers/imageHandler')
const multer = require('multer');

//const directoryPath = './uploads';


// create Category
exports.createCategory =  async(req,res,next)=>{
    try{
      //let {categoryTitle,description,file,username} = req.body;
      console.log(req.file)
      console.log(req.body)
      //let {file} = req.body;

      res.status(201).json({message:'testing is on'})
      // if (!categoryTitle || !description) {
      //             return res.status(400).json({ error: "category Title & description is required" });
      //     }
      //
      //     await categoryDb.run(
      //           `INSERT INTO cateogry (category, description, imgsrc, user)
      //           VALUES (?, ?, ?, ?)`,
      //           [categoryTitle,description,imageSrc,username],
      //           function (err) {
      //               if (err) {
      //                   return res.status(500).json({ error: "Error inserting category" });
      //               }
      //               return res.status(201).json({message: "Category created successfully",categoryId: this.lastID,});
      //           }
      //       )
    }
    catch(Err){
      console.error("Error:", Err);
      return res.status(500).json({ error: "Internal server error" });

    }

}
// get Category
exports.getCategory = async(req,res,next)=>{
  try{
    categoryDb.all(`SELECT * FROM cateogry`, [], (err, rows) => {
       if (err) {
           return res.status(500).json({ error: "Error retrieving categories" });
       }
       return res.status(200).json({categories: rows});
   });
  }
  catch(err){
    console.log("Error:",err)
    return res.status(500).json({ error: "Internal server error" });

  }
}

// Get Particular id

exports.getParticular = async(req,res,next)=>{
  try{
    let categoryId = req.params.id;
    categoryDb.all(`SELECT * FROM cateogry where id = ? `, [categoryId], (err, rows) => {
       if (err) {
           return res.status(500).json({ error: "Error retrieving categories" });
       }
       return res.status(200).json({categories: rows});
   });
  }
  catch(err){
    console.log("Error:",err)
    return res.status(500).json({ error: "Internal server error" });

  }
}

// Update Category
exports.updateCategory = async(req,res,next)=>{
  try{
    let categoryId = req.params.id;
    let {categoryTitle,description,imageSrc,username} = req.body;
    if (!categoryTitle || !description) {
                return res.status(400).json({ error: "category Title & description is required" });
        }

        categoryDb.run(
        `UPDATE cateogry
         SET category = ?, description = ?, imgsrc = ?, user = ?
         WHERE id = ?`,
        [categoryTitle, description, imageSrc, username, categoryId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: "Error updating category" });
            }

            // Check if the row was actually updated
            if (this.changes === 0) {
                return res.status(404).json({ message: "Category not found" });
            }

            // Sending success response
            return res.status(200).json({ message: 'Category updated successfully' });
        }
    )



  }
  catch(err){
    console.log("Error",err)
    return res.status(500).json({error:"Internal Server error"})
  }


}



//delete Category
exports.deleteCategory = async(req,res,next)=>{
  try{
    let categoryId = req.params.id;
    categoryDb.all(`DELETE  FROM cateogry where id = ? `, [categoryId], (err, rows) => {
       if (err) {
           return res.status(500).json({ error: "Error retrieving categories" });
       }
       return res.status(200).json({message:'Data delete successfully'});
   });
  }
  catch(err){
    console.log("Error:",err)
    return res.status(500).json({ error: "Internal server error" });

  }

}

// upload testing
const uploadImage = async(req,res,next)=>{
  try{
    await directoryChecker()
    await upload(req,res,function(err){
      if (err) {
          return res.status(400).json({ error: err });
      }

      if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
      }
      return res.status(200).json({message:'Image Uploaded successfully',imagePath:`uploads/${req.file.filename}`})

    })

  }
  catch(err){
    console.log("Error:",err)
    return res.status(500).json({ error: "Internal server error" });

  }

}
