import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

router.use(isAuthenticated);

router.post("/task/create", createTask);
router.get("/task", getTasks);
router.put("/tasks/:taskId", updateTask);
router.delete("/task/delete/:taskId", deleteTask);


export default router;