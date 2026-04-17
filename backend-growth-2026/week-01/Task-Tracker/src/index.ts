import { addTask } from "./commands/AddTask.js";
import { createFileIfMissing } from "./commands/CreateFile.js";
import readline from 'node:readline/promises';


async function main() {
    await createFileIfMissing('tasks.json');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'task-cli> ',
    });

    rl.prompt(); // Start the prompt

    rl.on('line', (line) => { // This event is emitted whenever the user inputs a line and presses Enter.
        const input = line.trim();

        // first word should be : add, update, delete, list
        const [command, ...args] = input.split(' ');
        if (command === 'add' && args.length > 0) {
            addTask(args.join(' ')).catch((error) => {
                console.error('Error adding task:', error);
            });
        } else {
            console.log(`Invalid command: '${command}'`);
        }

        // console.log(`read: '${input}'`);
        // console.log(`command: '${command}'`);
        // console.log(`args: '${args.join(', ')}'`);
        rl.prompt();
    });

    rl.on('SIGINT', () => { // This event is emitted when the user presses Ctrl+C.
    console.log('\nExiting shell...');
    rl.close();
    });

    rl.on('close', () => { // This event is emitted when the readline interface is closed, either by the user pressing Ctrl+C or by calling rl.close().
        process.exit(0);
    });

}

main().catch((error) => {
    console.error('An error occurred:', error);
    process.exit(1);
});