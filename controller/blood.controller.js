import BloodModel from "../model/Blood.Model.js";
import { cloudNaryPostMediaOnePost } from "../module/cloudnaris.js";

class BloodController {
    static createBlood = async (req, res) => {
        try {
            if (req.user) {
                const { image, donner_name, contact, date_of_birth, height, Weight, blood_group, hemoglobin, last, description, doned, remark, othersData } = req.body;

                let imageUrls = {
                    url: "",
                    secure_url: "",
                    public_id: ""
                }
                if (donner_name && contact && height && Weight && blood_group) {
                    console.log("valid")
                    if (image) {
                        const { public_id, secure_url, url } = await cloudNaryPostMediaOnePost(image)
                        if (public_id && secure_url && url) {
                            imageUrls = { url: url, secure_url: secure_url, public_id: public_id };
                        }
                    }



                    const savedData = await BloodModel({
                        userId: req.user.id,
                        donner_name: donner_name,
                        picture: { url: imageUrls.url, secure_url: imageUrls.secure_url, public_id: imageUrls.public_id },
                        contact: contact,
                        date_of_birth: date_of_birth,
                        height: height,
                        Weight: Weight,
                        blood_group: blood_group,
                        hemoglobin: hemoglobin,
                        last: last,
                        doned: doned,
                        description: description,
                        remark: remark,
                        othersData: othersData
                    })
                    const returnedData = await savedData.save();
                    return res.send({ mission: true, message: `blood donner added successfully! thanks for donation sir ${returnedData.donner_name}` })
                } else {
                    return res.send({ mission: false, message: "please field required fields" })
                }
            } else {
                return res.send({ mission: false, message: "user not found" })
            }
        } catch (err) {
            return res.send({ mission: false, message: err.message })
        }

    }

    static getAll = async (req, res) => {
        try {
            const findBlood = await BloodModel.find();
            return res.send({ mission: true, data: findBlood })
        } catch (err) {
            return res.send({ mission: false, message: err.message })
        }
    }

    static getChunk = async (req, res) => {
        try {
            console.log(req.query)
            const {page,blood_group} = req.query
            const changes = blood_group.replace(" ","+")
            const limits = 10;
            console.log(changes)
            let bloodData;
            if(changes!=`All`){
                bloodData = await BloodModel.find({blood_group:changes}).skip(page * limits).limit(limits)
            }else{
                bloodData = await BloodModel.find().skip(page * limits).limit(limits)
            }
            return res.send(bloodData)
        } catch (err) {
            return res.send({ mission: false, message: err.message })
        }
    }

    static bloodgroupParamsget = async (req,res)=>{
        console.log(req)
    }

    static getElementById = async (req, res) => {
        try {
            const { _id } = req.body
            const userId = req.user.id;
            if (_id && userId) {
                const BloodById = await BloodModel.findById(_id);
                if (BloodById && BloodById.userId && userId) {
                    return res.send({ mission: false, data: BloodById })
                } else {
                    return res.send({ mission: false, message: `${!BloodById && "is not found please try again"} ${BloodById.userId !== userId ? "you can't edits this" : null} ` })
                }
            }
        } catch (err) {
            return res.send({ mission: false, message: err.message })
        }

    }

}

export default BloodController;