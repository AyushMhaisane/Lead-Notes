import express from 'express';
import multer from 'multer';
import { getNotes, createNote, deleteNote } from '../controllers/noteController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', verifyToken, getNotes);
router.post('/', verifyToken, upload.single('image'), createNote);
router.delete('/:id', verifyToken, deleteNote);

export default router;