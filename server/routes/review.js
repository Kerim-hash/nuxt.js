const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/upload-photo");
const verifyToken = require("../middleware/verify-token");
const Product = require("../models/product");


router.post("/reviews/:productID", verifyToken, upload.single("photo"),  async (req, res) => {
    const result = await cloudinary.uploader.upload(req?.file.path);
    try{
    
        const review = new Review()
        review.headline = req.body.headline;
        review.body = req.body.body;
        review.rating = req.body.rating;
        review.photo = result.secure_url;
        review.productID =req.params.productID;
        review.user = req.decoded._id;

        await Product.update({ $push : {reviews: review._id}})

        const saveReview = await review.save()

        if(saveReview){
            res.json({
                success: true,
                message: "Successfully added review"
            })
        }
    }
    catch (e) {
        res.status(500).send({
            success: false,
            message: e.message
        })
    }

});

router.get("/reviews/:productID", async (req, res) => {
        try{
            const productReview = await Review.find({productID: req.params.productID}).populate('user').exec();

            res.json({
                success: true,
                reviews: productReview
            })

        }  catch (e) {
            res.status(500).send({
                success: false,
                message: e.message
            })
        }


})



module.exports = router