import { customAlphabet } from "nanoid";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res , next) => {
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
          res.status(201).json({success:true,msg:"Admin created succesfully"});
        }
        else
        {
           next(errorHandler(400, "Admin already exist"))
        }
    } catch (error) {
        next(error)
    }
 
};

