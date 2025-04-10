const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

colors.enable();

//load env
dotenv.config({ path: "./config/config.env" });

//load bootcam model
const BootCamp = require("./models/BootCamp");
const { console } = require("inspector");

//connect to DB
mongoose.connect(process.env.MONGODB_URI);

//Read JSON file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//import data to DB
const importDB = async () => {
  try {
    await BootCamp.create(bootcamps);
    console.log("Data imported...".colors.yellow.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//Delete data from DB
const deleteDB = async () => {
  try {
    await BootCamp.deleteMany();
    console.log("Data destroyed...".colors.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-import") {
  importDB();
} else if (process.argv[2] === "-delete") {
  deleteDB();
}
