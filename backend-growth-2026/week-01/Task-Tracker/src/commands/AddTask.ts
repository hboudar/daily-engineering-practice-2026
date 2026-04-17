import { promises as fs } from "node:fs";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const TaskStatusSchema = z.enum(["todo", "in-progress", "done"]);

const TaskSchema = z.object({
  id: z.string(),
  description: z.string().min(1),
  status: TaskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Task = z.infer<typeof TaskSchema>;

const FILE_PATH = "../tasks.json";


async function writeTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

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

export async function addTask(title: string): Promise<Task> {
  const tasks = await readTasks();
  const newTask = createTask(title);

  tasks.push(newTask);
  await writeTasks(tasks);

  return newTask;
}

