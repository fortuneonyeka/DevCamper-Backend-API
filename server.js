const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const connectDB = require( "./config/db" );



//Load env variable
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB()

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

//Dev logging middleware
if(process.env.NODE_ENV === "development" ) {
  app.use(morgan("dev"))
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 6000;

const server = app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

//handle the unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  
// close server and exit process
  server.close(() => process.exit(1))
})
