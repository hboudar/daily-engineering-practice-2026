# Task Tracker CLI

A small task-tracking CLI built with TypeScript and Node.js. It stores tasks in a local JSON file, uses `readline` for interactive input, and validates data with `zod` before writing it back to disk.

## What It Does

- Add tasks
- Update task descriptions
- Mark tasks as `in-progress` or `done`
- Delete tasks
- List all tasks or filter by status
- Create the backing data file automatically when it is missing

## Approach

The project is organized around a simple CLI loop in `src/index.ts`.

1. The app starts by resolving the task storage path and ensuring the data file exists.
2. User input is read from `readline` and split into a command plus arguments.
3. Command handlers in `src/commands` perform the actual task operations.
4. Shared file access lives in `src/utils/readWriteTask.ts`, which reads and writes the JSON file.
5. Task records are validated with `TaskSchema` so malformed data fails fast instead of silently corrupting the store.

This keeps the codebase small, but still separates CLI parsing, persistence, and task validation into distinct layers.

## Storage Model

Tasks are stored as JSON objects with this shape:

- `id`: unique identifier
- `description`: task text
- `status`: `todo`, `in-progress`, or `done`
- `createdAt`: creation timestamp
- `updatedAt`: last update timestamp

By default, the file is written to `dist/tasks.json`. You can override the location by setting `DATA_DIR` before running the app.

## Commands

Run the CLI with:

```bash
npm run dev
```

Available commands inside the prompt:

- `add <description>`
- `update <id> <new description>`
- `mark-in-progress <id>`
- `mark-done <id>`
- `delete <id>`
- `list`
- `list <status>`

Example session:

```text
task-cli> add Finish backend practice notes
task-cli> list
task-cli> mark-done 2f0f1b5d-5cb8-4b61-8f93-9d8f8dc4b8b4
task-cli> delete 2f0f1b5d-5cb8-4b61-8f93-9d8f8dc4b8b4
```

## Project Structure

```bash
.
├── package.json
├── README.md
├── tsconfig.json
└── src
    ├── config.ts
    ├── index.ts
    ├── commands
    │   ├── addTask.ts
    │   ├── deleteTask.ts
    │   ├── listTask.ts
    │   └── updateTask.ts
    ├── types
    │   └── Task.ts
    └── utils
        ├── CreateFile.ts
        └── readWriteTask.ts
```

## Development

Build the project with:

```bash
npm run build
```

The compiled output is emitted to `dist/`.