const express = require("express")
const { getSubjects, addSubject } = require("../controllers/subjectController")
const { protect, admin } = require("../middleware/authMiddleware")
const router = express.Router()

router.get("/", getSubjects)
router.post("/", protect, admin, addSubject)

module.exports = router
