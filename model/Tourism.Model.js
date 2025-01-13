import mongoose from "mongoose";
const TourismSchema = mongoose.Schema({
    userId: {
        type: String,
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
    Location: {
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
    contacts: {
        type:Array
    },
    othersData: {
        type: Array
    }
})

const TourismModel = mongoose.model("Tourism", TourismSchema)
export default TourismModel;