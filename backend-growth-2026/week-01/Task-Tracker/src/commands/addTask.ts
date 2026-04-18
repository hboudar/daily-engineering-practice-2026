import { randomUUID } from "node:crypto";
import {Task, TaskSchema} from "../types/Task.js";
import { readTasks, writeTasks } from "../utils/readWriteTask.js";
import { object } from "zod/v4/mini";

function createTask(title: string): Task {
  const now = new Date().toISOString();

  return TaskSchema.parse({
    id: randomUUID(),
    description: title,
    status: "todo",
    createdAt: now,
    updatedAt: now,
  });
}

export async function addTask(title: string): Promise<Task> {
  try {
    const tasks = await readTasks();
    const newTask = createTask(title);

    tasks.push(newTask);
    await writeTasks(tasks);

    return newTask;
  } catch (error) {
    throw "Error adding task";
  }
}