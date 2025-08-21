import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({});
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, dueDate, priority } = req.body;
  const task = await prisma.task.create({
    data: { title, description, status, dueDate, priority, user: { connect: { id: req.body.userId } } },
  });
  res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, dueDate, priority } = req.body;

  try {
    const task = await prisma.task.updateMany({
      where: { id: Number(id) },
      data: { title, description, status, dueDate, priority },
    });
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.deleteMany({ where: { id: Number(id) } });
    res.json({ message: "Task deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};