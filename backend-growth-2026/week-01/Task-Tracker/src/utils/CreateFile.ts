import { open } from 'node:fs/promises';

export async function createFileIfMissing(filePath: string): Promise<void> {
  try {
    const fileHandle = await open(filePath, 'wx', 0o644);
    await fileHandle.close();

    console.log(`File created: ${filePath}`);
    return ;
  } catch (error: any) {
    if (error?.code === 'EEXIST') {
      console.log(`File already exists: ${filePath}`);
      return ;
    }

    throw error;
  }
}