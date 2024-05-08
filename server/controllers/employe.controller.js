import z from "zod";
import Employe from "../models/employe.model.js";
import { errorHandler } from "../utils/error.js";
import { customAlphabet } from "nanoid";

const validationSchema = z.object({
  f_Id: z.number(),
  f_Name: z.string(),
  f_Email: z.string().email(),
  f_Mobile: z.number(),
  f_Designation: z.string(),
  f_Gender: z.string(),
  f_Image: z.string(),
  f_Course: z.string(),
});

export const createEmployee = async (req, res, next) => {
  try {
    const alphabet = "0123456789";
    const nanoid = customAlphabet(alphabet, 4);
    const f_Id = parseInt(nanoid());
    req.body.f_Id = f_Id;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    const currentDate = `${dd}/${mm}/${yyyy}`;
    req.body.f_createDate = currentDate;
    const validation = validationSchema.parse(req.body);

    if (validation) {
      const checkEmployeeEmail = await Employe.findOne({ f_Email: req.body.f_Email });
      if (checkEmployeeEmail)
        return next(errorHandler(400, "Employee email already exist"));

      const checkEmployeeNumber = await Employe.findOne({ f_Mobile: req.body.f_Mobile });
      if (checkEmployeeNumber)
        return next(errorHandler(400, "Employee number already exist"));

      const newEmploye = new Employe(req.body);
      await newEmploye.save();
      res.status(201).json("New employee created");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return next(errorHandler(400, errorMessage));
    }
    next(error);
  }
};
