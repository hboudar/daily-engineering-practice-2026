import { readTasks, writeTasks } from "../utils/readWriteTask.js";

export async function deleteTask(id: string): Promise<void> {
  const tasks = await readTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  await writeTasks(filteredTasks);
}
