const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/upload-photo");

router.post("/products", upload.single("photo"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  console.log(req.file);
  let product = new Product();

  product.owner = req.body.owner;
  product.category = req.body.category;
  product.title = req.body.title;
  product.description = req.body.description;
  product.price = req.body.price;
  product.photo = result.secure_url;
  product.stockQuantity = req.body.stockQuantity;

  await product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        price: result.price,
        photo: result.photo,
        stockQuantity: result.stockQuantity,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// GET request - get all  products

router.get('/products', async (req, res) => {
  try {
      const products = await Product.find()
      .populate("owner category")
      .populate("reviews", "rating")
      .exec()

      res.json({
        success: true,
        products: products
      })
  }catch(err){
      res.json({
          success: false,
          message: err.message
      })
  }
})



router.get('/products/category/:type', async (req, res) => {
  try {
      const products = await Product.find({category: req.params.type})
      .populate("owner category")
      .populate("reviews", "rating")
      .exec()
      res.json({
        success: true,
        products: products
      })
  }catch(err){
      res.json({
          success: false,
          message: err.message
      })
  }
})

// GET request - get a single product
router.get('/products/:id', async (req, res) => {
  try {
      const product = await Product.find({_id: req.params.id}).populate("owner category reviews").exec()
   
      res.json({
        success: true,
        product: product
      })
  }catch(err){
      res.json({
          success: false,
          message: err.message
      })
  }
})

// PUT request - update a single product

router.put('/products/:id', upload.single("photo"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  try {
  
      const product = await Product.findOneAndUpdate({_id: req.params.id}, {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          description: req.body.description,
          owner: req.body.owner,
          photo: result.secure_url,
        }
      },
      {unsert: true}
      )

      res.json({
        success: true,
        Updateproduct: product
      })
  }catch(err){
      res.json({
          success: false,
          message: err.message
      })
  }
})


// DELETE request - delete a single product

router.delete('/products/:id', async (req, res) => {
  try {
      const product = await Product.findByIdAndDelete({_id: req.params.id})
      res.json({
        success: true,
        message: 'successfully deleted product'
      })
  }catch(err){
      res.json({
          success: false,
          message: err.message
      })
  }
})

module.exports = router;
