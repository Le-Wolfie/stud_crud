const express = require("express");
const router = express.Router();
// Student Model
let studentSchema = require("../models/Students");
// Admin Model
let adminSchema = require("../models/Admins");

// Login
router.route("/login").post((req, res) => {
  const { username, password } = req.body;

  adminSchema
    .findOne({ username })
    .then((admin) => {
      console.log("Retrieved admin:", admin);

      if (!admin) {
        res.json({ message: "No such user" });
      } else {
        // Compare the entered password with the hashed password
        admin
          .comparePassword(password)
          .then((isMatch) => {
            console.log("Password match:", isMatch);

            if (isMatch) {
              res.json({ message: "Logged in" });
            } else {
              res.status(401).json({ message: "Wrong password" });
            }
          })
          .catch((error) => {
            console.error("Error comparing passwords:", error);
            res.status(500).json({ message: "Internal server error" });
          });
      }
    })
    .catch((error) => {
      console.error("Error finding admin:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

// Create Student
router.route("/submission").post((req, res) => {
  studentSchema
    .create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Student.",
      });
    });
});

// Read Students
router.route("/students").get((req, res) => {
  studentSchema
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving students.",
      });
    });
});

// Update Student
router.route("/update/:id").put((req, res) => {
  studentSchema
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Student not found with id " + req.params.id,
        });
      }
      res.json({ message: "Student updated successfully!" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Student not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating student with id " + req.params.id,
      });
    });
});

// Delete Student
router.route("/delete/:id").delete((req, res) => {
  studentSchema
    .findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Student not found with id " + req.params.id,
        });
      }
      res.json({ message: "Student deleted successfully!" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          message: "Student not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete student with id " + req.params.id,
      });
    });
});

// Delete All Students
router.route("/delete").delete((req, res) => {
  studentSchema
    .deleteMany({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while deleting students.",
      });
    });
});

module.exports = router;
