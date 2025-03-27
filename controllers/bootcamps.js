//@desc  Get all bootcamps
//@route  GET /api/v1/bootcamps
//@access  Public

exports.getBootcamps = (req,res,next) => {
  res.status(200).json({ success:true, msg:"Show all bootcamps"})
}

//@desc  Get single bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access  Public

exports.getBootcamp = (req,res,next) => {
  res.status(200).json({ success:true, msg:`Get a bootcamp ${req.params.id}`})
}

//@desc  add a bootcamp
//@route  POST /api/v1/bootcamps
//@access  Private

exports.createBootcamp = (req,res,next) => {
  res.status(200).json({ success:true, msg:"Create new bootcamp"})
}


//@desc  Update a bootcamps
//@route  PUT /api/v1/bootcamps/:id
//@access  Private

exports.updateBootcamp = (req,res,next) => {
  res.status(200).json({ success:true, msg:`Update a bootcamp ${req.params.id}`})
}


//@desc  Delete a bootcamp
//@route  DELETE /api/v1/bootcamps/:id
//@access  Private

exports.deleteBootcamp = (req,res,next) => {
  res.status(200).json({ success:true, msg:`Delete a bootcamp ${req.params.id}`})
}