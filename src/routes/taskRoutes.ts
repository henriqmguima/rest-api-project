import { Router } from 'express';
import {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate); // todas protegidas

router.post('/', createTask);
router.get('/', getMyTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
