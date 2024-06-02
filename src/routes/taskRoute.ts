import { Router } from 'express';
import {
  createTaskController,
  getAllTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController
} from '../controllers/taskController';

const router = Router();

router.post('/:user_id/tasks', createTaskController);
router.get('/:user_id/tasks', getAllTaskController);
router.get('/:user_id/tasks/:task_id', getTaskController);
router.put('/:user_id/tasks/:task_id', updateTaskController);
router.delete('/:user_id/tasks/:task_id', deleteTaskController);

export default router;