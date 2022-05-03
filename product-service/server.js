require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const colore = require("colors");
const { MQConnect} = require("./RabbitMQ/rabbitmq")

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
  .connect("mongodb://localhost:27017/product-service",{ 
    useNewUrlParser: true 
  }).then(() =>  () => { 
    console.log(`MongoDB Atlas connected`.red)
  }).catch(err => {
    console.log(err.red)
  })

  // RabbitMQ connection
  MQConnect()


//routes
const productRoute = require("./routes/product.routes");
app.use("/api", productRoute);


//server
const port = process.env.PORT || 3030;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`Product Service is running at port ${port}`.red);
});
