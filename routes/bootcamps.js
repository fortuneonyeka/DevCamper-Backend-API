const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json({ success:true, msg:"Show all bootcamps"})
})

router.get("/:id", (req, res) => {
  res.status(200).json({ success:true, msg:`Get a bootcamp ${req.params.id}`})
})
router.post("/", (req, res) => {
  res.status(200).json({ success:true, msg:"Create new bootcamp"})
})
router.put("/:id", (req, res) => {
  res.status(200).json({ success:true, msg:`Update a bootcamp ${req.params.id}`})
})
router.delete("/:id", (req, res) => {
  res.status(200).json({ success:true, msg:`Delete a bootcamp ${req.params.id}`})
})


module.exports = router
