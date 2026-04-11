import express from 'express';
import { downloadPDF, downloadDOCX } from '../controllers/cvController.js';

const router = express.Router();

// GET /api/cv/download/pdf  — serves PDF resume
router.get('/download/pdf', downloadPDF);

// GET /api/cv/download/docx — serves .docx resume (returns 404 if not uploaded yet)
router.get('/download/docx', downloadDOCX);

export default router;
