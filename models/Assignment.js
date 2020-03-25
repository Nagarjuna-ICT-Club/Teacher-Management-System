const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assigned_by: {
    type: String,//instead of string object id must be used
    required: [true, "Assigned by is required!"]
  },
  subject: {
    type: String,
    required: [true, "Subject must be specified!"]
  },
  title: {
    type: String,
    required: [true, "Title for assignment is required!"],
    min: 5,
    max: 500
  },
  description: {
    type: String,
    required: [true, "Description by is required!"],
    min: 5,
    max: 1500
  },
  attached_files: {
    type: String
  },
  assigned_to: {
    type: String,
    required: [true, "Assigned to is required!"]
  },
  deadline: {
    type: String,
    required: [true, "Assignment deadline is required!"]
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: String//string is used here because moment js is used
  },
  updated_by: {
    type: String//instead of string object id must be used
  }
});

module.exports = assignmentModel = mongoose.model(
  "assignment",
  assignmentSchema
);
