import mongoose from "mongoose";

const NewsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required:true,
    },
    titile:{
        type:String,
        required:true
    },
    allPera:{
        type:Array,
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