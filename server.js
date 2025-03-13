const express  = require( "express" );
const dotenv= require( "dotenv" );

//Route files
const bootcamps = require("./routes/bootcamps")

//Load env variable
dotenv.config({path: "./config/config.env"})

const app = express()

//Mount routers
app.use("/api/v1/bootcamps", bootcamps)


const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))