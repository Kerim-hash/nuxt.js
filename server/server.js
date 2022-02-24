const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors  = require("cors");
dotenv.config() 


const app = express();
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

// midlewares
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// require routes
const ProductRuotes  = require("./routes/product")
const CategoryRoutes = require("./routes/category") 
const OwnerRoutes = require("./routes/owner") 
const AuthRoutes = require("./routes/auth") 
const ReviewsRoutes = require("./routes/review") 
app.use('/api', ProductRuotes )
app.use('/api', CategoryRoutes )
app.use('/api', OwnerRoutes )
app.use('/api', AuthRoutes )
app.use('/api', ReviewsRoutes )



app.listen(8000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("ura");
  }
});
