import express from "express"
import authentication from "../middleware/authentication.middleware.js";
import DoctorController from "../controller/doctor.controller.js";
import User from "../controller/user.controller.js";
import BloodController from "../controller/blood.controller.js";
import CarRentController from "../controller/carrent.controller.js";
import toletController from "../controller/tolet.controller.js";
import TourismController from "../controller/tourism.controller.js";
import WorkerController from "../controller/worker.controller.js";
import NewsController from "../controller/news.controller.js";

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

// car rent
router.post('/create-car-rent',authentication,CarRentController.createCarRent)
router.get("/get-car-rent",CarRentController.getCarRent)

// tolet

router.post("/tolet-create",authentication,toletController.createToLet);
router.get("/get-tolet",toletController.getTolete)


// tourism
router.post("/create-tourism",authentication,TourismController.createTourism)
router.get("/get-tourism",TourismController.getTourism)

//worker
router.post("/create-worker",authentication,WorkerController.createWorker)
router.get("/get-worker",WorkerController.getWorker)

// news
router.post("/create-news",authentication,NewsController.createNews)


export default router