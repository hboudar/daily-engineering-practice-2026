import { ta } from "zod/locales";
import { readTasks, writeTasks } from "../utils/readWriteTask.js";

export async function updateTask(id: string, newStatus: string): Promise<void> {
    try {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex((task) => task.id === id);

        if (taskIndex === -1) {
            console.error(`Task not found: ${id}`);
            return;
        }

        if (newStatus === 'done' || newStatus === 'in-progress') {
            tasks[taskIndex].status = newStatus;
        } else {
            tasks[taskIndex].description = newStatus;
        }
        tasks[taskIndex].updatedAt = new Date().toISOString();
        await writeTasks(tasks);
        console.log(`Task updated: ${id}`);
    } catch (error) {
        throw 'Error updating task';
    }
}