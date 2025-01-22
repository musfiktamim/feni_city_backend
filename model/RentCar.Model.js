import mongoose from "mongoose";

const carRentSchema = mongoose.Schema({
    userId:{
        type:String,
        required:[true,'must be required']
    },
    picture: {
        type:Object,
        required:[true,"picture is required"]
    },
    name:{
        type:String,
        required:[true,"name is must be required"],
    },
    contact:{
        type:String,
        required:[true,'contact must be required']
    },
    car_code:{
        type:String,
        required:[true,'car code must be required for identify']
    },
    IsAc:{
        type:String,
        required:[true,'Is ac field required'],
        enum:["AC",'Non AC'],
        default:"Non AC"
    },
    NidNo:{
        type:String,
        required:[true,'Nid Must be required']
    },
    true_false:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    sits:{
        type:Number,
        required:[true,'required']
    }
}, { timestamps: true })

const RentCarModel = mongoose.model('Rent_Car',carRentSchema);

export default RentCarModel;