import { readTasks, writeTasks } from "../utils/readWriteTask.js";

export async function deleteTask(id: string): Promise<void> {
  const tasks = await readTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);

  if (filteredTasks.length === tasks.length) {
    console.error(`Task not found: ${id}`);
    return;
  }

  await writeTasks(filteredTasks);
  console.log(`Task deleted successfully (ID: ${id})`);
}
