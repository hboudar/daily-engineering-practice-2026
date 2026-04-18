import { readTasks, writeTasks } from "../utils/readWriteTask.js";

export async function updateTask(id: string, newDescription: string): Promise<void> {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        throw new Error(`Task not found: ${id}`);
    }

    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();

    await writeTasks(tasks);
}