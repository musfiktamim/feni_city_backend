import ToletModel from "../model/ToLet.Model.js";
import { cloudNaryPostMediaMultyPost, cloudNaryPostMediaOnePost } from "../module/cloudnaris.js";

class toletController{
    static createToLet = async (req,res) =>{
        try{
            if(req.user){
                
                const {image,name,contact,rooms,roomsHeight,roomsWidth,peopleType,location,description,extraBenifits,homeInfoData,price,pricing} = req?.body
                if(name && image.length>0 && contact && rooms && roomsHeight && roomsWidth && location && homeInfoData && price){
                    let priced = {"daily":"",monthly:""}; 
                    switch(pricing){
                        case 'daily':
                            if(price.daily){
                                priced = {daily:price.daily,monthly:""};
                            }else{
                                return res.send({mission:false,message:"plz priece daily enter"})
                            }
                            break;
                        case 'monthly':
                            if(price.monthly){
                                priced = {daily:"",monthly:price.monthly};
                            }else{
                                return res.send({mission:false,message:"plz priece monthly enter"})
                            }
                            break;
                        case 'both':
                            if(price.daily && price.monthly){
                                priced = {daily:price.daily,monthly:price.monthly}
                            }else{
                                return res.send({mission:false,message:"plz priece daily,monthly enter"})
                            }
                            break
                        default:
                            priced = {daily:"0",monthly:"0"}
                    }
    
                    // let imagesLinksArray = [];

                    
                    if(image.length>0){

                        const imagges = await Promise.all(
                            image.map(async (item)=> await cloudNaryPostMediaOnePost(item,"tolet") )
                        )
                        
                        const stuctData = await ToletModel({
                            userId: req.user.id,
                            picture:imagges,
                            name:name,
                            contact:contact,
                            room:rooms,
                            room_height:roomsHeight,
                            room_width:roomsWidth,
                            room_info_data:homeInfoData,
                            extra_benefits:extraBenifits,
                            types_of_people:peopleType,
                            home_location:location,
                            description:description,
                            price:priced
                        })
        
                        const saved_Data =  await stuctData.save()
                        return res.send({mission:true,message:"saccessfully saved"});


                    }else{
                        return res.send({mission:false,message:"image don't have"})
                    }

                    // for(let i;image.length>i;i++ ){
                    //     const {public_id, secure_url, url} =await cloudNaryPostMediaOnePost(image[i])
                    //     imagesLinksArray = [...imagesLinksArray,{"public_id":public_id,"secure_url":secure_url,"url":url}]
                    // }
                    
                    // const imageLinks = await image.map(async (item)=>{
                    //             const {public_id, secure_url, url} =await cloudNaryPostMediaOnePost(item)
                    //             imagesLinksArray = [...imagesLinksArray,{"public_id":public_id,"secure_url":secure_url,"url":url}]
                    //         })
                    
                }else{
                    return res.send({mission:false,message:"required field fields must be fields"})
                }
            }else{
                return res.send({mission:false,message:"user not find"})
            }
        }catch(err){
            return res.send({mission:false,message:err.message})
        }
    }

    static getTolete = async (req,res) =>{
        try{
            const {page} = req.query;
            const limitsCount = 10;

            let SendData;

            SendData = await ToletModel.find().skip(page*limitsCount).limit(limitsCount)
            
            return res.send({mission:true,data:SendData})
            
        }catch (err) {
            res.send({mission:false,message:err.message})
        }
    }
    
}

export default toletController