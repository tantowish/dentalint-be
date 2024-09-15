import express from 'express'
import { UserController } from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'
import { CaptureController } from '../controller/capture-controller'
import multer from 'multer';
import { BlogController } from '../controller/blog-controller';
import { NoteController } from '../controller/note-controller';
import { ClinicController } from '../controller/clinic-controller';
import { PatientController } from '../controller/patient-controller';

const upload = multer({ storage: multer.memoryStorage() });

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/users', UserController.get)
apiRouter.patch('/api/users', UserController.update)

// Capture API
apiRouter.get('/api/captures', CaptureController.list)
apiRouter.get('/api/captures/:id', CaptureController.get)
apiRouter.post('/api/captures', upload.single('image'), CaptureController.create)

// Blog API
apiRouter.get('/api/blogs', BlogController.list)
apiRouter.get('/api/blogs/latest', BlogController.latest)
apiRouter.get('/api/blogs/:id', BlogController.get)

// Daily Notes API
apiRouter.get('/api/notes', NoteController.list)
apiRouter.get('/api/notes/:id', NoteController.get)
apiRouter.post('/api/notes', NoteController.create)

// Clinic API
apiRouter.get('/api/clinics/:id', ClinicController.get)
apiRouter.get('/api/clinics', ClinicController.list)

// Patient API
apiRouter.post('/api/patients', PatientController.create)

// Appointment API
