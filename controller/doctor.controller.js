import DoctorModel from "../model/Doctor.Model.js"
import { cloudNaryGetUrl, cloudNaryPostMediaOnePost } from "../module/cloudnaris.js"

class DoctorController {

    static DoctorGet = async (req, res) => {
        try {
            const skipmulty = 0;
            const limits = 10;
            const Doctors = await DoctorModel.find().limit(limits).skip(skipmulty * limits)
            return res.send({ mission: true, data: Doctors })
        } catch (err) {
            return res.send({ mission: false, message: err.message })
        }
    }

    static DoctorCreate = async (req, res) => {
        try {
            if (req.user) {
                const { name, doctorType, gender, presentworkplace, educations, chembers, contact, description, image } = req.body
                if (name && doctorType && educations && contact && gender) {
                    try {
                        if (image) {
                            const { public_id, secure_url, url } = await cloudNaryPostMediaOnePost(image)
                            if (public_id && secure_url && url) {
                                const savedDoctor = await DoctorModel({
                                    userId: req.user._id,
                                    picture: {
                                        url: url,
                                        secure_url: secure_url,
                                        piblic_id: public_id,
                                    },
                                    name: name,
                                    gender: gender,
                                    doctor_type: doctorType,
                                    present_workplace: presentworkplace,
                                    educations: educations,
                                    chembers: chembers,
                                    description: description,
                                    contact: contact,
                                })
                                const returnedData = await savedDoctor.save()
                                if (returnedData) {
                                    return res.send({ mission: true, message: "successfully added" })
                                } else {
                                    return res.send({ mission: false, "message": "some thing went wrong in your data" })
                                }
                            } else {
                                return res.send({ mission: false, "message": "something went wrong in your image" })
                            }
                        } else {
                            return res.send({ mission: false, "message": "image not have" })
                        }

                    } catch (err) {
                        return res.send({ mission: false, message: err.message })
                    }
                } else {
                    return res.send({ "mission": false, "message": "fill fields" })
                }
            } else {
                return res.send({ "mission": false, "message": "user is not found" })
            }

        } catch (error) {
            return res.send({ "mission": false, "message": error.message })
        }
    }
}

export default DoctorController