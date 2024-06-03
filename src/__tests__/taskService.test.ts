import { createNewTask, findAllTask, findOneTask, updateOneTask, deleteOneTask } from '../services/taskService';
//import { Task } from '../src/models/taskModel';

describe('Task Service', () => {
  const userId = 'user-123';

  it('should create a new task', () => {
    const taskData = { title: 'Test Task', description: 'Task Description', dueDate: new Date(), status: 'To Do' as const };
    const task = createNewTask(userId, taskData);
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Task Description');
    expect(task.status).toBe('To Do');
  });

  it('should get all tasks for a user', () => {
    const tasks = findAllTask(userId);
    expect(Array.isArray(tasks)).toBe(true);
  });

  it('should get a specific task by id', () => {
    const taskData = { title: 'Another Task', description: 'Another Description', dueDate: new Date(), status: 'In Progress' as const };
    const task = createNewTask(userId, taskData);
    const fetchedTask = findOneTask(userId, task.id);
    expect(fetchedTask).toEqual(task);
  });

  it('should update an existing task', () => {
    const taskData = { title: 'Update Task', description: 'Update Description', dueDate: new Date(), status: 'Done' as const };
    const task = createNewTask(userId, taskData);
    const updatedData = { title: 'Updated Task', description: 'Updated Description', dueDate: new Date(), status: 'To Do' as const};
    const updatedTask = updateOneTask(userId, task.id, updatedData);
    expect(updatedTask?.title).toBe('Updated Task');
    expect(updatedTask?.status).toBe('To Do');
  });

  it('should delete a task', () => {
    const taskData = { title: 'Delete Task', description: 'Delete Description', dueDate: new Date(), status: 'Done' as const};
    const task = createNewTask(userId, taskData);
    const success = deleteOneTask(userId, task.id);
    expect(success).toBe(true);
    const fetchedTask = findOneTask(userId, task.id);
    expect(fetchedTask).toBe(null);
  });
});