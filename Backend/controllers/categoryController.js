const Category = require('../models/category');

exports.createCategory = async (req, res)=>{
    try {
        // fetch Data
        const {categoryName}=req.body;
        // validation
        if(!categoryName){
            return res.status(400).json({
                success:false,
                message:"Please provide category name",
            });
        }
        // check if category already exists
        const isCategoryExist = await Category.findOne({categoryName:categoryName});
        if(isCategoryExist){
            return res.status(400).json({
                success:false,
                message:"Category already exists",
            });
        }
        // create category
        const newCategory= await Category.create({
            categoryName:categoryName,
        });
        // return response
        return res.status(201).json({
            success:true,
            message:"Category created successfully",
            category:newCategory,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
        
    }
}
