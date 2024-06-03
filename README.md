# Task Management Web Application

This project is a simplified task management web application. It allows users to manage their tasks by creating, updating, deleting, and listing them. Each task consists of a title, description, due date, and status.

## Features

- **User Authentication**: Users can create an account by giving name, email and log in to manage their tasks.
- **Task Management**: Users can create, update, delete, and list tasks.
- **Task Attributes**: Each task has a title, description, due date, and status (e.g., "To Do", "In Progress", "Done").
- **RESTful API**: The backend provides a RESTful API for interacting with tasks and users.
- **TypeScript**: The backend logic is written in TypeScript for enhanced type safety.

## Backend Structure

The backend follows a modular structure with the following components:

- **Model**: Contains TypeScript interfaces defining the data models (e.g., User, Task).
- **Service**: Implements business logic for tasks and users (e.g., createTask, getTasks).
- **Controller**: Defines API endpoints and handles HTTP request/response logic.
- **Route**: Maps API endpoints to controller functions.
- **Server**: Entry point for starting the backend server.

## Getting Started

To run the project locally, follow these steps:

1. Install Node.js and npm.
2. Clone the repository.
3. Navigate to the project directory.
4. Install dependencies: `npm install`.
5. Set up environment variables (if any).
6. Start the server: `npm start`.
7. Access the application at the specified URL (default: http://localhost:3000).

## Dependencies

- **Express**: Web framework for handling HTTP requests.
- **TypeScript**: Superset of JavaScript with static typing.
- **uuid**: Library for generating unique identifiers.
- **ts-node**: TypeScript execution environment for Node.js, enables to directly run TypeScript without the need for compilation to JavaScript (.js) files first.
- **nodemon**: Tool for automatically restarting node.js application when file changes in the directory are detected.
- **dotenv**: Node.js module that loads environment variables from a .env file into process.env, used for storing sensitive information.
- **cors**:  Node.js middleware that enables Cross-Origin Resource Sharing (CORS) in the Express.js application. 

## DevDependencies

- **@types/express**: TypeScript definitions for Express.
- **@types/node**: TypeScript definition for Node.js.
- **@types/uuid**: TypeScript definition for uuid
- **@types/cors**: TypeScript definition for cors

## Code Structure

```sh
task-management/
├── src/
│   ├── controllers/
│   │   ├── userController.ts
│   │   └── taskController.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Task.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── taskRoutes.ts
│   ├── services/
│   │   ├── userService.ts
│   │   └── taskService.ts
│   ├── __tests__/
│   │   ├── userController.test.ts
│   │   ├── taskController.test.ts
│   │   └── userService.test.ts
│   │   └── taskService.test.ts
│   ├── server.ts
│   └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Using Nodemon

Nodemon is a tool that helps in automatically restarting the Node.js application when file changes in the directory are detected. It's particularly useful during development as it eliminates the need to manually stop and restart the server every time you make changes to your code.

To use Nodemon in your project, you can install it globally or locally as a development dependency:

```sh
npm install --save-dev nodemon
```

Once installed, you can configure nodemon by creating a nodemon.json file in the root directory of your project.
```bash
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node ./src/server.ts"
}
```
- "watch": ["src"]: Specifies the directories to watch for file changes. In this, it watches the src directory.

- "ext": "ts": Specifies the file extensions to monitor for changes. In this, it's set to .ts files.

- "exec": "ts-node ./src/server.ts": Specifies the command to execute when changes are detected. In this, it runs ts-node to execute the TypeScript server file (server.ts).

## API Endpoints

- Expose a RESTful API with the following endpoints:

    - `POST /users`: Create a new user.
    
    - `POST /users/:user_id/tasks`: Create a new task for the specified user.
    
    - `GET /users/:user_id/tasks`: Retrieve all tasks for the specified user.
    
    - `GET /users/:user_id/tasks/:task_id`: Retrieve a specific task for the specified user.
    
    - `PUT /users/:user_id/tasks/:task_id`: Update a specific task for the specified user.
    
    - `DELETE /users/:user_id/tasks/:task_id`: Delete a specific task for the specified user.


## Source code directory
- **src/**:
  - **controllers/**: Contains controller logic for handling HTTP requests and responses.
    - **userController.ts**: Controller for user-related operations, such as createUser (POST).
    - **taskController.ts**: Controller for task-related operations, such as createTask (POST), getAllTask (GET), getTask (GET), updateTask (PUT), deleteTask (DELETE).

  - **models/**: Contains TypeScript interfaces defining data models.
    - **User.ts**: Interface for defining user data structure with properties (id, name, email).
    - **Task.ts**: Interface for defining task data structure with properties (id, title, description, dueDate, status).

  - **routes/**: Contains route definitions for API endpoints.
    - **userRoutes.ts**: Defines routes for user-related endpoints.
    - **taskRoutes.ts**: Defines routes for task-related endpoints.

  - **services/**: Contains business logic for interacting with data models.
    - **userService.ts**: Service for user-related operations, such as createNewUser.
    - **taskService.ts**: Service for task-related operations, such as createNewTask, findAllTask, findOneTask, updateOneTask, deleteOneTask. 

  - **server.ts**: Entry point for starting the backend server.
  - **index.ts**: Main file to start the application.

## Jest Testing Framework Guide

Jest is a JavaScript testing. It is used for testing JavaScript code. Jest provides a rich set of features such as test assertion, mocking, and code coverage reporting, making it a popular choice among developers for writing tests.

## Initializing Jest in a Project

### Step 1: Install Jest

You can install Jest using npm:

```bash
npm install --save-dev jest
npm install --save-dev @types/babel__traverse @types/jest ts-jest
```
### Step 2: Intialize Jest

It will create 'jest.config.js' where we can add functionality

```bash
npx jest --init
```

Now, configure the 'jest.config.js' file and you can add this code directly to your package.json

```bash
"jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testMatch": [
      "**/__tests__/**/*.test.ts"
    ]
  }
```

-"preset": Specifies the preset to use for Jest configuration, `ts-jest` is a preset specifically designed for TypeScript projects, which provides default configurations and transforms TypeScript code for Jest to understand and execute.

-"testEnvironment": Specifies which test environment to use. The `"node"` environment allows Jest to run tests in a Node.js-like environment, providing access to Node.js globals and modules.

-"testMatch": Specifies the glob patterns that Jest uses to detect test files, it's set to `["**/__tests__/**/*.test.ts"]`. This pattern will match all `.test.ts` files inside the `__tests__` directory and its subdirectories.







