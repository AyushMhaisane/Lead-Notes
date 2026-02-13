import { Request, Response } from 'express';
import Note from '../models/Note';
import cloudinary from '../config/cloudinary';
import fs from 'fs';

// @desc    Get all notes for the logged-in user
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req: Request, res: Response) => {
  try {
    // The user ID comes from our auth middleware (req.user)
    const userId = (req as any).user.uid; 

    const notes = await Note.find({ userId }).sort({ createdAt: -1 }); // Newest first
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = (req as any).user.uid;
    let imageUrl = '';

   
    if (req.file) {
     
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'lead-notes', 
      });

      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const note = await Note.create({
      userId,
      title,
      content,
      imageUrl,
    });

    res.status(201).json(note);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId !== (req as any).user.uid) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await note.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};