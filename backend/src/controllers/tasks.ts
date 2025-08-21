// src/controllers/tasks.ts - tamamını değiştir
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: number;
}

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: req.userId ? { userId: req.userId } : {}
    });
    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, status, dueDate, priority } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const task = await prisma.task.create({
      data: { 
        title, 
        description, 
        status, 
        dueDate: dueDate ? new Date(dueDate) : null,
        priority, 
        userId: req.userId! 
      },
    });
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, status, dueDate, priority } = req.body;

  try {
    const task = await prisma.task.updateMany({
      where: req.userId ? { 
        id: Number(id),
        userId: req.userId 
      } : { id: Number(id) },
      data: { 
        title, 
        description, 
        status, 
        dueDate: dueDate ? new Date(dueDate) : null,
        priority 
      },
    });
    
    if (task.count === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.json({ message: "Task updated successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.deleteMany({ 
      where: req.userId ? { 
        id: Number(id),
        userId: req.userId 
      } : { id: Number(id) }
    });
    
    if (task.count === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.json({ message: "Task deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};