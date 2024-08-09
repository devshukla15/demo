const Exam = require("../models/Exam")

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find()
    res.json(exams)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

exports.addExam = async (req, res) => {
  const { subject, numQuestions, questions } = req.body

  try {
    const exam = await Exam.create({ subject, numQuestions, questions })
    res.status(201).json(exam)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}
