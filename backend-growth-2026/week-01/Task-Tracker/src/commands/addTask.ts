import { randomUUID } from "node:crypto";
import { Task, TaskSchema } from "../types/Task.js";
import { readTasks, writeTasks } from "../utils/readWriteTask.js";

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
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      throw new Error("Task description cannot be empty.");
    }

    const tasks = await readTasks();
    const newTask = createTask(trimmedTitle);

    tasks.push(newTask);
    await writeTasks(tasks);

    return newTask;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Error adding task");
  }
}