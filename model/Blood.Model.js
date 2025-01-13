import mongoose from "mongoose";

const BloodSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    picture: {
        url: String,
        secure_url: String,
        public_id: String
    },
    donner_name: {
        type: String,
        required: [true, "please enter the name of donner"]
    },
    contact: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: String,
        required: true

    },
    height: {
        type: String,
        required: true
    },
    Weight: {
        type: Number,
        required: true
    },
    blood_group: {
        type: String,
        enum: ["A+", "B+", "A-", "B-", "O+", "O-", "AB+", "AB-"],
        required: true,
    },
    hemoglobin: {
        type: String,
    },
    last: {
        type: String,
    },
    description: String,
    doned: {
        type: Number
    },
    remark: {
        type: String,
    },
    othersData: {
        type: Array
    }

}, { timestamps: true })

const BloodModel = mongoose.model("Blood", BloodSchema);

export default BloodModel;