import mongoose from "mongoose";

const BloodSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    picture: {
        type:Object,
        required:[true,"picture must be required"]
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
    true_false:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    othersData: {
        type: Array
    }

}, { timestamps: true })

const BloodModel = mongoose.model("Blood", BloodSchema);

export default BloodModel;