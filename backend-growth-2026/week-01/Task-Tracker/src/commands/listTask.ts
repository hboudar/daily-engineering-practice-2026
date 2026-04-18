import { readTasks } from "../utils/readWriteTask.js";

export async function listTasks(): Promise<void> {
    const tasks = await readTasks();
    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    console.log("Tasks:");
    tasks.forEach((task) => {
        console.log(`- [${task.status}] ${task.description} (ID: ${task.id})`);
    });
}

export async function listTasksWithStatus(status: string): Promise<void> {
    const tasks = await readTasks();
    const filteredTasks = tasks.filter((task) => task.status === status);

    if (filteredTasks.length === 0) {
        console.log(`No tasks found with status '${status}'.`);
        return;
    }

    console.log(`Tasks with status '${status}':`);
    filteredTasks.forEach((task) => {
        console.log(`- ${task.description} (ID: ${task.id})`);
    });
}