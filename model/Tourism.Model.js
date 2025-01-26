import mongoose from "mongoose";
const TourismSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required:true,
    },
    pictures: {
        type: Array,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    location: {
        type: String,
        required:true,
    },
    naming: {
        type: String,
        required:true,  
    },
    description: {
        type:String,
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

const TourismModel = mongoose.model("Tourism", TourismSchema)
export default TourismModel;