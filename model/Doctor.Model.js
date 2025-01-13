import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    picture: {
        url: String,
        secure_url: String,
        public_id: String
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

    othersData: {
        type: Array
    }

})

const DoctorModel = mongoose.model("Doctor", DoctorSchema)

export default DoctorModel