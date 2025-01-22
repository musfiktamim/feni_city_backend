import mongoose from "mongoose";

const NewsSchema = mongoose.Schema({
    userId: {
        type: String,
        required:true,
    },
    pictures: {
        type:Array,
    },
    title: {
        type: String,
        required:true,
    },
    detailes: {
        type: String,
        required:true,
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

const NewsModel = mongoose.model("News", NewsSchema);
export default NewsModel;