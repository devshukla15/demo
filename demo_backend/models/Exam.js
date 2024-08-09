const mongoose = require("mongoose")

const ExamSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  numQuestions: { type: Number, required: true },
  questions: [
    {
      text: { type: String, required: true },
      type: { type: String, required: true },
      options: [{ type: String }],
    },
  ],
})

module.exports = mongoose.model("Exam", ExamSchema)
