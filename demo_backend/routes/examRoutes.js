const express = require("express")
const { getExams, addExam } = require("../controllers/examController")
const { protect, admin } = require("../middleware/authMiddleware")
const router = express.Router()

router.get("/", getExams)
router.post("/", protect, admin, addExam)

module.exports = router
