import { Router } from 'express';
import { register, login, listAllUsers, updateUser, deleteUser } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/adminMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// ↓ Rota protegida (somente admin pode ver todos os usuários)
router.get('/users', authenticate, isAdmin, listAllUsers);
router.put('/users/:id', authenticate, isAdmin, updateUser);
router.delete('/users/:id', authenticate, isAdmin, deleteUser);

export default router;
