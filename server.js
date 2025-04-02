const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const connectDB = require( "./config/db" );
const colors = require('colors');
colors.enable();



//Load env variable
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB()

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

//Body parser
app.use(express.json())

//Dev logging middleware
if(process.env.NODE_ENV === "development" ) {
  app.use(morgan("dev"))
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 6000;

const server = app.listen(
  PORT,
  console.log(colors.blue(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
).bold
));

//handle the unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(colors.bgMagenta(`Error: ${err.message.blue}`));

// close server and exit process
  server.close(() => process.exit(1))
})
