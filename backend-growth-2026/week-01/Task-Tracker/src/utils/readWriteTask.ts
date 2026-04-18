import { promises as fs } from 'fs';
import { z } from 'zod';
import { Task, TaskSchema } from '../types/Task.js';
import { DATA_DIR, TASKS_FILE_PATH } from '../config.js';

export async function ensureTasksFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(TASKS_FILE_PATH);
  } catch {
    await fs.writeFile(TASKS_FILE_PATH, '[]', 'utf-8');
  }
}

export async function readTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(TASKS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);

    if (
      !Array.isArray(parsed) ||
      !parsed.every((item) => typeof item === 'object' && item !== null)
    ) {
      throw new Error('Invalid task data format');
    }

    return z.array(TaskSchema).parse(parsed);
  } catch (error: any) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function writeTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(TASKS_FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}
