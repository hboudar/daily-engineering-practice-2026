import { writeFile } from 'node:fs/promises';

export async function createFileIfMissing(filePath: string): Promise<void> {
  try {
    await writeFile(filePath, '[]', {
      encoding: 'utf-8',
      flag: 'wx',
      mode: 0o644,
    });

    console.log(`File created: ${filePath}`);
  } catch (error: any) {
    if (error?.code === 'EEXIST') {
      console.log(`File already exists: ${filePath}`);
      return;
    }

    throw error;
  }
}