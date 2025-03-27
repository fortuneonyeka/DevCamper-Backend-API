const mongoose = require("mongoose")
const colors = require('colors');
colors.enable();

const connectDB = async () => {
 const conn = await mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify:false
 })
 console.log(colors.bgGreen(`MongoDb connected: ${conn.connection.host}`).cyan.bold)
}

module.exports = connectDB;