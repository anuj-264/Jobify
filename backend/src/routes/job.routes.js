import { Router } from "express";
import { getAllJobs, getSingleJob, createJob, updateJob, deleteJob, showStats } from "../controllers/job.controller.js";
import { validateJobInput , validateJobId} from "../middlewares/validation.middleware.js";
const router = Router();


router.route('/')
.get(getAllJobs)
.post(validateJobInput,createJob);

router.route('/stats')
.get(showStats);

router.route('/:id')
.get(validateJobId,getSingleJob)
.patch(validateJobId,validateJobInput,updateJob)
.delete(validateJobId,deleteJob);

export default router;