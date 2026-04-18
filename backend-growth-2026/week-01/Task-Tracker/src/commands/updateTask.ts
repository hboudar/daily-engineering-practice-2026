import { readTasks, writeTasks } from "../utils/readWriteTask.js";

export async function updateTask(id: string, newStatus: string): Promise<void> {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        throw new Error(`Task not found: ${id}`);
    }

    if (newStatus === 'done' || newStatus === 'in-progress') {
        tasks[taskIndex].status = newStatus;
    } else {
        tasks[taskIndex].description = newStatus;
    }
    await writeTasks(tasks);
}