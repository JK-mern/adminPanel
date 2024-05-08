import mongoose from "mongoose";

const employeSchema = new mongoose.Schema({
  f_Id: {
    type: Number,
    required: true,
  },
  f_Name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
    unique: true,
  },
  f_Mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  f_Designation: {
    type: String,
    enum: ["HR", "Manager", "Sales"],
    required: true,
  },
  f_Gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  f_Image: {
    type: String,
    required: true,
  },
  f_Course: {
    type: String,
    enum: ["MCA", "BCA", "BSC"],
    required: true,
  },
  f_createDate: {
    type: String,
  },
});

const Employe = new mongoose.model("Employee", employeSchema)
export default Employe