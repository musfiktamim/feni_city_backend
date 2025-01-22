import mongoose from "mongoose";

const WorkerSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    picture:{
        type:Object,
        required:[true,"image is must be required"]
    },
    name:{
        type:String,
        required:[true,"name is must be required"]
    },
    address:{
        type:String,
        required:[true,"address is must be required"]
    },
    description:{
        type:String,
    },
    educations:{
        type:Array,
    },
    skils:{
        type:Array,
        required:true,
    },
    portpolio:{
        type:String,
    },
    contacts:{
        type:Array,
        required:true
    },
    true_false:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    resume:{
        type:Object
    }
}, { timestamps: true })

const WorkerModel = mongoose.model("Worker",WorkerSchema)

export default WorkerModel