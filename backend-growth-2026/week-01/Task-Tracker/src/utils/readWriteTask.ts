import { promises as fs } from "fs";
import { z } from "zod";
import { Task, TaskSchema } from "../types/Task.js";



const FILE_PATH = "../tasks.json";

export async function readTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);

    return z.array(TaskSchema).parse(parsed);
  } catch (error: any) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function writeTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}