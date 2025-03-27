const Bootcamp = require("../models/BootCamp");
const mongoose = require("mongoose");

//@desc  Get all bootcamps
//@route  GET /api/v1/bootcamps
//@access  Public

exports.getBootcamps = async(req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
    data: bootcamps    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Server Error"
    })
  }
  
};

//@desc  Get single bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access  Public

exports.getBootcamp = async(req, res, next) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({
        success: false,
        error: "Invalid Bootcamp ID format"
      })
    }

    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
      return res.status(404).json({
        success: false,
        error: "Bootcamp not found"
      })
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    })
  } catch (error) {
    if(error.name === "CastErrot"){
      return res.status(400).json({
        success: false,
        error: "Invalid Bootcamp ID format"
      })
    }
    res.status(500).json({
      success: false,
      error: error.message || "Server Error"
    })
  }
};

//@desc  add a bootcamp
//@route  POST /api/v1/bootcamps
//@access  Private

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    let name = req.body.name || "Unknown";
    let errorMessage = error.message || error;
    if (error.code === 11000) {
      errorMessage = `Bootcamp name "${name}" already exists, please choose another name`;
    }
    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
};

//@desc  Update a bootcamps
//@route  PUT /api/v1/bootcamps/:id
//@access  Private

exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a bootcamp ${req.params.id}` });
};

//@desc  Delete a bootcamp
//@route  DELETE /api/v1/bootcamps/:id
//@access  Private

exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a bootcamp ${req.params.id}` });
};
