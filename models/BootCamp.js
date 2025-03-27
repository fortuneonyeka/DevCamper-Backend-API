const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Bootcamp name is required"],
    unique: true,
    trim: true,
    maxLength:[50, "Name must  not exceed 50 characters"]
  },
  slug: String,

  description: {
    type: String,
    required: [true, "Bootcamp's description is required"],
    maxLength:[500, "Bootcamp's Description must  not exceed 50 characters"]
  },
  website: {
    type: String,
    match: [
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
      "Bootcamp website is invalid, please use URL with HTTP or HTTPS"
    ]
  },
  phone: {
    type: String,
    maxLength: [20, "Phone number must not exceed 20 characters"]
  },
  email: {
    type: String,
    lowercase:true,
    trim: true,
    // match: [
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //     "Please enter a valid email address"
    // ]
    validate: {
      validator: (v) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Please enter a valid email address"
    }
  },
  address: {
    type: String,
    required: [true, "Bootcamp address is required"]
  },
  location: {
    //GEOJSON POINT
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere"
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    //Array of strings
    type: [String],
    required: true,
    enum: ["Web Development", "Web Developer", "UI/UX", "Mobile Developer", "Data Science", "Machine Learning", "Business", "Others"]  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating can not exceed 5"]
  },
  averageCost:Number,
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  housing: {
    type : Boolean,
    default: false
  },
  jobAssistance: {
    type :Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Bootcamp", BootcampSchema)