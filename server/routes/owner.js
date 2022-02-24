const express = require("express");
const router = express.Router();
const Owner = require("../models/owner");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/upload-photo");
router.post("/owners",upload.single("photo"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  try {
    let owner = new Owner();
    owner.about = req.body.about;
    owner.name = req.body.name;
    owner.photo = result.secure_url;

    await owner.save();

    res.json({
      success: true,
      message: "Owner saved successfully",
    });
  } catch (err) {
    res.status(500).send({ 
        success: false,
        message: err.message 
    });
  }
});

// GET request - get owners

router.get('/owners', async (req, res) => {
    try {
        const owners = await Owner.find()

        res.json({
            owners: owners
        })
    }catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router