import RentCarModel from "../model/RentCar.Model.js";
import { cloudNaryPostMediaOnePost } from "../module/cloudnaris.js";
class CarRentController{
    static createCarRent = async (req,res) =>{
        try{
            // console.log(req.user)
        if(req.user){
            const {name,contact,IsAc,carCode,image,nidNo,sits} = req.body
            if(name && contact && IsAc && carCode && image && nidNo && sits){
                // nid cheacker

                const { public_id, secure_url, url } = await cloudNaryPostMediaOnePost(image)
                
                const stuctureData = await RentCarModel({
                    userId:req.user.id,
                    name:name,
                    picture:{
                        public_id:public_id,
                        secure_url:secure_url,
                        url:url
                    },
                    contact:contact,
                    car_code:carCode,
                    IsAc:IsAc,
                    NidNo:nidNo,
                    sits:sits
                })

                const resData = await stuctureData.save();
            
                return res.send({mission:true,message:"saved"})
            }else{
                return res.send({mission:false,message:'please fill fields'})
            }
        }else{
            return res.send({mission:false,message:'user not found'})
        }
    }catch(err){
        return res.send({mission:false,message:err.message})
    }
    }

    static getCarRent = async (req,res)=>{
        try{
            const {page,acNonAc} = req.query
            const limitCount = 10;
            let RentCarData;
            if(acNonAc=="All"){
                RentCarData = await RentCarModel.find().skip(page*limitCount).limit(limitCount)
            }else{
                RentCarData = await RentCarModel.find({IsAc:acNonAc}).skip(page*limitCount).limit(limitCount)
            }
            return res.send(RentCarData)
        }catch(err){
            return res.send({mission:false,message:err.message})
        }
    }
}

export default CarRentController;