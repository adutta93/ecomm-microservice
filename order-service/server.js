require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const colore = require("colors");
// const fileUpload = require("express-fileupload");
// const { errorHandler } = require("./middleware/errorHandler");


const app = express();


//middleware
app.use(cors());
app.use(morgan("tiny"));
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// conncet database
mongoose
  .connect("mongodb://localhost:27017/order-service",{ 
    useNewUrlParser: true 
  }).then(() =>  () => { 
    console.log(`MongoDB Atlas connected`.red)
  }).catch(err => {
    console.log(err.red)
  })



//routes
// const authRoute = require("./routes/auth.route");
// app.use("/api", authRoute);


//server
const port = process.env.PORT || 2020;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`Order Service is running at port ${port}`.red);
});
