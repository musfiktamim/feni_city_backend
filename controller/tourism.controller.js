import TourismModel from "../model/Tourism.Model.js"
import { cloudNaryPostMediaOnePost } from "../module/cloudnaris.js"

class TourismController{
    static createTourism =async (req,res) =>{
        try{
            const {title,location,naming,description,image} = req.body
            if(req.user){
                if(title && location && naming && description && image.length>0){
                    const imagesLink = await Promise.all(
                        image.map(async (item)=>await cloudNaryPostMediaOnePost(item,"tourism"))
                    ) 
                    const stuctData = await TourismModel({
                        userId:req.user.id,
                        name:title,
                        pictures:imagesLink,
                        location:location,
                        naming:naming,
                        description:description
                    })

                    const save = await stuctData.save();
                    return res.send({mission:true,message:"saved success fully"})
                }else{
                    return res.send({mission:false,message:"please fill all required fields"})
                }
            }else{
                return res.send({mission:false,message:"user not found"})

            }
        }catch(err){
            return res.send({mission:false,message:err.message})
        }
    }

    static getTourism = async (req,res) =>{
        try{
            const {page} = req.query;
            const limitsCount = 10;

            let SendData;

            SendData = await TourismModel.find().skip(page*limitsCount).limit(limitsCount)
            
            return res.send({mission:true,data:SendData})
            
        }catch (err) {
            res.send({mission:false,message:err.message})
        }
    }
    
}
export default TourismController