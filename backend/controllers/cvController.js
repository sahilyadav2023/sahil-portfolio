import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesDir = path.join(__dirname, '../files');

// ─── GET /api/cv/download/pdf ──────────────────────────────────────────────────
// Streams the PDF resume to the client.
//
// ASYNC I/O DEMONSTRATION:
//   `fs.createReadStream()` reads the file in chunks without loading it all
//   into memory. This is Node.js non-blocking I/O — the stream pipes data
//   directly to the HTTP response as it's read, freeing the event loop.
//
//   `fs.promises.access()` is the async version of checking if a file exists.
//   It uses the OS I/O system non-blocking — no thread blocking.

export const downloadPDF = async (req, res) => {
  try {
    const filePath = path.join(filesDir, 'sahil-Resume.pdf');

    // Async file existence check (non-blocking)
    await fs.promises.access(filePath, fs.constants.R_OK);

    res.setHeader('Content-Disposition', 'attachment; filename="sahil-yadav-CV.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    // Stream the file — does NOT load entire file into RAM (optimization)
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    readStream.on('error', (streamErr) => {
      console.error('PDF stream error:', streamErr);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Error while streaming file.' });
      }
    });

  } catch (err) {
    // File doesn't exist on server
    res.status(404).json({
      success: false,
      message: 'CV PDF not found on server. Please contact me directly.',
    });
  }
};

// ─── GET /api/cv/download/docx ─────────────────────────────────────────────────
// Streams the DOCX resume to the client.
// Returns a friendly 404 if not yet uploaded (instead of crashing).

export const downloadDOCX = async (req, res) => {
  try {
    const filePath = path.join(filesDir, 'sahil-Resume.docx');

    // Async file existence check
    await fs.promises.access(filePath, fs.constants.R_OK);

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="sahil-yadav-CV.docx"'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    readStream.on('error', (streamErr) => {
      console.error('DOCX stream error:', streamErr);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Error while streaming file.' });
      }
    });

  } catch (err) {
    // .docx not uploaded yet — graceful response
    res.status(404).json({
      success: false,
      message: '.docx version coming soon! Please download the PDF version for now.',
      pdfAvailable: true,
      pdfUrl: '/api/cv/download/pdf',
    });
  }
};
