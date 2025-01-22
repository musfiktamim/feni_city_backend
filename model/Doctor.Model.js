import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    picture: {
        type:Object,
        required:[true,"picture must be required"]
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
        default: "male",
    },
    doctor_type: {
        type: String,
        required: true,
    },
    present_workplace: {
        type: String,
    },
    educations: {
        type: Array,
        required: true,
    },
    chembers: {
        type: Array,
    },
    description: {
        type: String,
    },
    contact: {
        type: String,
        required: [true, "contact must be required"]
    },
    true_false:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    othersData: {
        type: Array
    }

}, { timestamps: true })

const DoctorModel = mongoose.model("Doctor", DoctorSchema)

export default DoctorModel