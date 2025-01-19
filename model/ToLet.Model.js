import mongoose from "mongoose";

const ToletSchema = mongoose.Schema({
    userId:{
        type:String,
        required:[true,"user id is very very important"]
    },
    picture:[],
    name:{
        type:String,
        require:[true,"must be name is required"],
    },
    contact:{
        type:String,
        required:[true,"must be contact number is required"]
    },
    room:{
        type:Number,
        required:[true,"must be room is required"]
    },
    room_height:{
        type:String,
        required:[true,"must be room_height is required"]
    },
    room_weight:{
        type:String,
        required:[true,"must be room_weight is required"]
    },
    // { "cook": false, 'drowing': false, "toylet": false, "coridor": false },
    room_info_data:{
        cook:{
            type:Boolean,
            enum:[true,false],
            default:false
        },
        drowing:{
            type:Boolean,
            enum:[true,false],
            default:false
        },
        toylet:{
            type:Boolean,
            enum:[true,false],
            default:false
        },
        coridor:{
            type:Boolean,
            enum:[true,false],
            default:false
        }
    },
    extra_benefits:[],
    types_of_people:{
        type:String
    },
    home_location:{
        type:String,
        required:[true,"must be required is location"]
    },
    description:{
        type:String,
    },
    price:{
        monthly:{
            type:Number
        },
        daily:{
            type:Number
        },
        required:[true,"price must be required"]
    }
});

const ToletModel = mongoose.model("Tolet",ToletSchema);
export default ToletModel;