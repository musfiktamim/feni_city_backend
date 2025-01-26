import NewsModel from "../model/News.Model.js"
import { cloudNaryPostMediaOnePost } from "../module/cloudnaris.js"

class NewsController{
    static createNews =async (req,res) => {
        try{
            if(req.user){
                const {mainTitle,allPera} = req.body
                if(mainTitle && allPera.length>0){

                    const allPerasImagesLinksWithData = await Promise.all(
                        await allPera.map(async (pera)=> {
                            if(pera.image.length>0){
                                const imagesLinks = await Promise.all(
                                    await pera.image.map(async (peraImages)=>{
                                        const links = await cloudNaryPostMediaOnePost(peraImages);
                                        return links;
                                    })
                                )
                                return {image:[...imagesLinks],title:pera.title,detailes:pera.detailes}
                            }
                            return pera;
                        } )
                    )

                    const stuctData = await NewsModel({
                        userId:req.user.id,
                        titile:mainTitle,
                        allPera:allPerasImagesLinksWithData,
                    })

                    await stuctData.save();
                    return res.send({mission:false,message:"saved successfully"})
                }else{
                    return res.send({mission:false,message:"field required fields"})
                }
            }else{
                return res.send({mission:false,message:"user not found"})
            }
        }catch(err){
            return res.send({mission:false,message:err.message})
        }
    }

    static getNewses = async (req,res) =>{
        try{
            const {page} = req.query;
            const limitsCount = 10;

            let SendData;
            SendData = await NewsModel.aggregate([
                {
                    $lookup:{
                        from:"users",
                        localField:"userId",
                        foreignField:"_id",
                        as:"test"                    
                    }
                }
        ])
            // SendData = await NewsModel.find().skip(page*limitsCount).limit(limitsCount)
            
            return res.send({mission:true,data:SendData})
            
        }catch (err) {
            res.send({mission:false,message:err.message})
        }
    }
    
}
export default NewsController