import mongoose  from "mongoose";

const adminSchema = mongoose.Schema ( {
    f_sno : {
        type : Number,
        required : true
    },
    f_username : {
        type : String,
        required : true
    },
    f_Pwd : {
        type : String,
        required : true
    }
}, {timestamps : true})


const Admin = new mongoose.model ("Admin", adminSchema)
export default Admin