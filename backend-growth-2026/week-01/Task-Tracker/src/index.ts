import path from 'node:path';
import readline from 'node:readline/promises';
import { createFileIfMissing } from './utils/CreateFile.js';
import { addTask } from './commands/addTask.js';
import { updateTask } from './commands/updateTask.js';
import { deleteTask } from './commands/deleteTask.js';
import { listTasks, listTasksWithStatus } from './commands/listTask.js';

export const DATA_DIR = path.resolve(
  process.env.DATA_DIR ?? path.resolve(process.cwd(), 'dist')
);

export const TASKS_FILE_PATH = path.join(DATA_DIR, 'tasks.json');

async function main() {
  await createFileIfMissing(TASKS_FILE_PATH);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'task-cli> ',
  });

  rl.prompt();

  rl.on('line', (line) => {
    const input = line.trim();

    // first word should be : add, update, delete, list
    const [command, ...args] = input.split(' ');
    if (command === 'add' && args.length > 0) {
      addTask(args.join(' ')).catch((error) => {
        console.error('Error adding task:', error);
      });
    } else if (command === 'update' && args.length >= 2) {
        const [id, ...descriptionParts] = args;
        const newDescription = descriptionParts.join(' ');
        updateTask(id, newDescription).catch((error) => {
          console.error('Error updating task:', error);
        });
    } else if ((command === 'mark-done' || command === 'mark-in-progress') && args.length === 1) {
      const id = args[0];
      const newStatus = command === 'mark-done' ? 'done' : 'in-progress';
      updateTask(id, newStatus).catch((error) => {
        console.error('Error updating task status:', error);
      });
    } else if (command === 'delete' && args.length === 1) {
        deleteTask(args[0]).catch((error) => {
            console.error('Error deleting task:', error);
        });
    } else if (command === 'list') {
        if (args.length === 1) {
            listTasksWithStatus(args[0]).catch((error) => {
                console.error('Error listing tasks:', error);
            });
        } else {
            listTasks().catch((error) => {
                console.error('Error listing tasks:', error);
            });
        }
    } else {
      console.log(`Invalid command: '${command}'`);
    }

    rl.prompt();
  });

  rl.on('SIGINT', () => {
    console.log('\nExiting shell...');
    rl.close();
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});
