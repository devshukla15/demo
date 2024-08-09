const Subject = require("../models/Subject")

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
    res.json(subjects)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

exports.addSubject = async (req, res) => {
  const { name } = req.body

  try {
    const subjectExists = await Subject.findOne({ name })

    if (subjectExists) {
      return res.status(400).json({ message: "Subject already exists" })
    }

    const subject = await Subject.create({ name })
    res.status(201).json(subject)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}
