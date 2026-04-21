import path from 'node:path';

export const DATA_DIR = path.resolve(
  process.env.DATA_DIR ?? path.resolve(process.cwd(), 'dist'),
);

export const TASKS_FILE_PATH = path.join(DATA_DIR, 'tasks.json');
