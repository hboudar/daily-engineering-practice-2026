import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';


async function main() {

  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'github-activity> ',
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }

    const [username] = input.split(' ');

    try {
      console.log(`You entered username: ${username}`);
      // Here you would add the logic to handle the username and interact with GitHub API
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
