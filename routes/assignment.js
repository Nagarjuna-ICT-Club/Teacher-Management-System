const assignmentRouter = require("express").Router();

// models
const assignmentModel = require("../models/Assignment");

// post requests
assignmentRouter.post("/new-assignment", async (req, res) => {
  // this must be used when authentication is added!
  // const assigned_by = req.userID;

  //assigned_by must be removed after auth is added
  //here the attached file path must be added but right ow random text is passed
  const { assigned_by, attached_files } = req.body;

  // data from teacher
  const { title, description, assigned_to, deadline } = req.body;

//   validation is required
  const newAssignment = new assignmentModel({
    title,
    assigned_by,
    attached_files,
    description,
    assigned_to,
    deadline
  });

  try {
    const assignmentStatus = await newAssignment.save();

    res.status(200).json(assignmentStatus)
  } catch (err) {
    if (err)
      return res.status(500).json({
        err
      });
  }
});

module.exports = assignmentRouter;
