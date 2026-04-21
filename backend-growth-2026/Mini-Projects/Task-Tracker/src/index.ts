import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { TASKS_FILE_PATH } from './config.js';
import { createFileIfMissing } from './utils/CreateFile.js';
import { addTask } from './commands/addTask.js';
import { updateTask } from './commands/updateTask.js';
import { deleteTask } from './commands/deleteTask.js';
import { listTasks, listTasksWithStatus } from './commands/listTask.js';

async function main() {
  await createFileIfMissing(TASKS_FILE_PATH);

  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'task-cli> ',
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }

    const [command, ...args] = input.split(' ');

    try {
      if (command === 'add' && args.length > 0) {
        await addTask(args.join(' '));
      } else if (command === 'update' && args.length >= 2) {
        const [id, ...descriptionParts] = args;
        const newDescription = descriptionParts.join(' ');
        await updateTask(id, { description: newDescription });
      } else if (
        (command === 'mark-done' || command === 'mark-in-progress') &&
        args.length === 1
      ) {
        const id = args[0];
        const newStatus = command === 'mark-done' ? 'done' : 'in-progress';
        await updateTask(id, { status: newStatus });
      } else if (command === 'delete' && args.length === 1) {
        await deleteTask(args[0]);
      } else if (command === 'list' && args.length <= 1) {
        if (args.length === 1) {
          await listTasksWithStatus(args[0]);
        } else {
          await listTasks();
        }
      } else {
        console.log(`Invalid command: ${input}`);
      }
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
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
  console.error(
    'An error occurred:',
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
});
