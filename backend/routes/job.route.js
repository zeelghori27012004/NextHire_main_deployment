import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
  getAdminJobs, 
  getAllJobs, 
  getJobById, 
  postJob,
  getBookmarkedJobs // Add this import
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/bookmarked").get(isAuthenticated, getBookmarkedJobs); // This line is correct now

export default router;