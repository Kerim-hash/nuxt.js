const express = require('express')
const router = express.Router();
const Category = require('../models/category')

router.post('/categories', async (req, res) => {
    try{
        
        let category = new Category()
        category.type = req.body.type;
        await category
          .save()

        res.json({
            success: true,
            message: 'Category saved successfully'
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find()

        res.json({
            categories: categories
        })
    }catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router