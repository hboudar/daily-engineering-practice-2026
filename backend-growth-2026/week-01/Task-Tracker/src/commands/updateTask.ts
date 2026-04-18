import { readTasks, writeTasks } from "../utils/readWriteTask.js";
import { TaskStatus } from "../types/Task.js";

type UpdateTaskInput = {
  description?: string;
  status?: TaskStatus;
};

export async function updateTask(id: string, updates: UpdateTaskInput): Promise<void> {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => String(task.id) === id);

    if (taskIndex === -1) {
      console.error(`Task not found: ${id}`);
      return;
    }

    const task = tasks[taskIndex];

    if (updates.status !== undefined) {
      task.status = updates.status;
    }

    if (updates.description !== undefined) {
      const trimmed = updates.description.trim();

      if (!trimmed) {
        console.error("Task description cannot be empty.");
        return;
      }

      task.description = trimmed;
    }

    task.updatedAt = new Date().toISOString();

    await writeTasks(tasks);
    console.log(`Task updated successfully (ID: ${id})`);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Error updating task");
  }
}