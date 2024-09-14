import { Task } from "../models/tasksModel.js";

export const createTask = async (req, res) => {
  const userId = req.user._id;
  const { title, description, dueDate, category } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }
  try {
    const taskData = { title, description, user: userId }; 
    if (dueDate) taskData.dueDate = dueDate;
    if (category) taskData.category = category;

    const task = new Task(taskData);
    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};


export const getTasks = async (req, res) => {
  const userId = req.user._id; 

  try {
    const tasks = await Task.find({ user: userId }); 
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;  
  const userId = req.user._id;   
  const { title, description,dueDate, category } = req.body;

  try {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (category) task.category = category;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};


export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId }); 
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
