const Bootcamp = require("../models/BootCamp");
const mongoose = require("mongoose");
const ErrorResponse = require("../utills/errorRespos");

// @desc    Add a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    if (error.code === 11000) {
      const name = req.body.name || "Unknown";
      return next(new ErrorResponse(`Bootcamp name "${name}" already exists`, 400));
    }
    next(error);
  }
};

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorResponse(`Invalid ID format ${req.params.id}`, 400));
    }

    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp with ID ${req.params.id} not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorResponse(`Invalid ID format ${req.params.id}`, 400));
    }

    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorResponse(`Invalid ID format ${req.params.id}`, 400));
    }

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: {},
      message: `Successfully deleted ${bootcamp.name}`,
    });
  } catch (error) {
    next(error);
  }
};