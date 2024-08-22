import express from 'express'
import { UserController } from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'
import { CaptureController } from '../controller/capture-controller'
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/users', UserController.get)
apiRouter.patch('/api/users', UserController.update)

apiRouter.post('/api/captures', upload.single('image'), CaptureController.create)