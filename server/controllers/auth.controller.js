import { customAlphabet } from "nanoid";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next) => {
  try {
    const alphabet = "0123456789";
    const nanoid = customAlphabet(alphabet, 2);
    const f_sno = parseInt(nanoid());
    const { username, password } = req.body;

    const userExits = await Admin.findOne({ f_username: username });
    if (!userExits) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new Admin({
        f_sno: f_sno,
        f_username: username,
        f_Pwd: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ success: true, msg: "Admin created succesfully" });
    } else {
      return next(errorHandler(400, "Admin already exist"));
    }
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ f_username: username });
    if (!admin) return next(errorHandler(404, "Invalid credentials"));
    else {
      const verifyPassword = bcrypt.compareSync(password, admin.f_Pwd);
      if (!verifyPassword)
        return next(errorHandler(404, "Invalid credentials"));
      else {
        admin.f_Pwd = undefined;
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY);
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          })
          .status(200)
          .json(admin);
      }
    }
  } catch (error) {
    next(error)
  }
};
