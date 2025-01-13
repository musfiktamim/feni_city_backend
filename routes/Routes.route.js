import express from "express"
import authentication from "../middleware/authentication.middleware.js";
import DoctorController from "../controller/doctor.controller.js";
import User from "../controller/user.controller.js";
import BloodController from "../controller/blood.controller.js";

const router = express.Router();


// user Route
router.get("/user-get", authentication, User.UserGet)
router.post("/v1/user/user-post", User.UserPost)
router.post("/v1/user/user-post-login", User.userLogIn)


// doctor route 
router.get("/doctor-get", DoctorController.DoctorGet)
router.post("/create-doctor", authentication, DoctorController.DoctorCreate)

// blood route

router.get("/blood-get-all", BloodController.getAll)
router.post("/blood-create", authentication, BloodController.createBlood)
router.get("/get-blood-chunk", BloodController.getChunk);
router.get("/get-blood-byId", BloodController.getElementById);



export default router