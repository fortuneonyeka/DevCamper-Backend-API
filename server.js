const express  = require( "express" );
const dotenv= require( "dotenv" );

//Load env variable
dotenv.config({path: "./config/config.env"})

const app = express()

app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success:true, msg:"Show all bootcamps"})
})

app.get("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({ success:true, msg:`Get a bootcamp ${req.params.id}`})
})
app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success:true, msg:"Create new bootcamp"})
})
app.put("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({ success:true, msg:`Update a bootcamp ${req.params.id}`})
})
app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({ success:true, msg:`Delete a bootcamp ${req.params.id}`})
})

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))