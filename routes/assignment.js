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
  const { title, description, assigned_to, subject, deadline } = req.body;

  //   validation is required
  const newAssignment = new assignmentModel({
    title,
    assigned_by,
    subject,
    attached_files,
    description,
    assigned_to,
    deadline
  });

  try {
    const assignmentStatus = await newAssignment.save();

    res.status(200).json(assignmentStatus);
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error posting assignment => ./routes/assignment.js",
        ...err
      });
  }
});

// get requests
assignmentRouter.get("/assignments", async (req, res) => {
  const { subject } = req.body;

  if (!subject)
    return res.status(400).json({ msg: "Subject must be specified!" });

  try {
    const assignmentList = await assignmentModel.find({
      subject
    }); //sends all the assignments data in json form
    res.status(200).json(assignmentList);
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error getting assignment list => ./routes/assignment.js",
        ...err
      });
  }
});

// update requests
assignmentRouter.patch("/update-assignment", async (req, res) => {
  // const updated_by = req.userID;
  const { updated_by } = req.body;
  const updated_at = require("moment")().format("LLL");

  const {
    assignmentID, //be sure on this
    title,
    description,
    attached_file,
    deadline
  } = req.body;

  try {
    const updateStatus = await assignmentModel.updateOne(
      {
        _id: assignmentID
      },
      {
        $set: {
          title,
          description,
          attached_file,
          deadline,
          updated_by,
          updated_at
        }
      }
    );

    // if no change is done!
    if (updateStatus.nModified === 0)
      return res.status(400).json({ msg: "No change found!" });

    // check if there is any error
    if (!updateStatus)
      return res.status(500).json({
        msg: "Error updating assignment => ./routes/assignments"
      });

    res.status(200).json(updateStatus);
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error updating assignment => ./routes/assignment.js",
        ...err
      });
  }
});

// delete requests
assignmentRouter.delete("/delete-assignment", async (req, res) => {
  const { assignmentID } = req.body;

  try {
    const deleteStatus = await assignmentModel.deleteOne({ _id: assignmentID });

    // if not deleted
    if (!deleteStatus)
      return res.status(400).json({
        msg: "Error deleting assignment => ./routes/assignment.js"
      });

    if (deleteStatus.deletedCount === 0)
      return res.status(400).json({
        msg: "No assignment was deleted!"
      });

    res.status(200).json(deleteStatus);
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error deleting assignment => ./routes/assignment.js",
        ...err
      });
  }
});

module.exports = assignmentRouter;
