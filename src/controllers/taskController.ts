import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  try {
    const data = createTaskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        ...data,
        userId: req.user!.id,
      },
    });

    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getMyTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user!.id },
  });

  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(req.params.id),
      userId: req.user!.id,
    },
  });

  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

  res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const data = updateTaskSchema.parse(req.body);
    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user!.id,
      },
    });

    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

    const updated = await prisma.task.update({
      where: { id: task.id },
      data,
    });

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(req.params.id),
      userId: req.user!.id,
    },
  });

  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

  await prisma.task.delete({ where: { id: task.id } });
  res.status(204).send();
};
