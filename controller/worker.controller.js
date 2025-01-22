import WorkerModel from "../model/Worker.Model.js"
import { cloudNaryPostMediaOnePost } from "../module/cloudnaris.js"
import { returnResponseFalseMissionfuinction, returnResponseTrueMissionfuinction } from "../module/responseFunstion.js"

class WorkerController{
    static createWorker = async (req,res)=>{
        try{
            if(req.user){
                const {
                    advanceMode,
                    name,
                    description,
                    address,
                    educations,
                    skils,
                    portpolio,
                    contacts,
                    resume,
                    image} = req.body
                if(name && address && skils.length>0 && contacts.length>0 && image ){
                    if(advanceMode){
                        if(educations.length>0 && resume && educations.length>0){
                            const imageLink = await cloudNaryPostMediaOnePost(image,'worker/images')
                            const resumeLink = await cloudNaryPostMediaOnePost(resume,'worker/resumes')
                            const stuctData = await WorkerModel({
                                userId:req.user.id,
                                picture:imageLink,
                                name:name,
                                address:address,
                                description:description,
                                educations:educations,
                                skils:skils,
                                portpolio:portpolio,
                                contacts:contacts,
                                resume:resumeLink
                            })
                            await stuctData.save();
                            return res.send(returnResponseTrueMissionfuinction("saved"))

                        }else{
                            return res.send(returnResponseFalseMissionfuinction("plz field all advanced required fields"))                        
                        }
                    }else{
                        const imageLink = await cloudNaryPostMediaOnePost(image,'worker')
                        const stuctData = await WorkerModel({
                            userId: req.user.id,
                            picture:imageLink,
                            name:name,
                            address:address,
                            description:description,
                            skils:skils,
                            contacts:contacts
                        })
                        await stuctData.save()
                        return res.send(returnResponseTrueMissionfuinction("saved"))

                    }
                }else{
                    return res.send(returnResponseFalseMissionfuinction("plz field all required fields"))                        
                }
            }else{
                return res.send(returnResponseFalseMissionfuinction("user not found"))
            }
        }catch(err){
            return res.send(returnResponseFalseMissionfuinction(err.message))
        }
    }

    static getWorker = async (req,res) =>{
        try{
            const {page} = req.query;
            const limitsCount = 10;

            let SendData;

            SendData = await WorkerModel.find().skip(page*limitsCount).limit(limitsCount)
            
            return res.send({mission:true,data:SendData})
            
        }catch (err) {
            res.send({mission:false,message:err.message})
        }
    }
}

export default WorkerController