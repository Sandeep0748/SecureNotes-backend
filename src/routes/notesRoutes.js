const express = require('express');
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');
const {
  authenticateToken,
} = require('../middleware/authMiddleware');
const {
  validateNoteInput,
  handleValidationErrors,
} = require('../middleware/validationMiddleware');

const router = express.Router();

// All note routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /v1/notes:
 *   get:
 *     summary: Get all notes (admin sees all, users see theirs)
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *       401:
 *         description: Unauthorized
 */
router.get('/', getNotes);

/**
 * @swagger
 * /v1/notes/{id}:
 *   get:
 *     summary: Get a specific note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Note details
 *       404:
 *         description: Note not found
 */
router.get('/:id', getNoteById);

/**
 * @swagger
 * /v1/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Note created successfully
 */
router.post('/', validateNoteInput, handleValidationErrors, createNote);

/**
 * @swagger
 * /v1/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Note updated successfully
 */
router.put('/:id', validateNoteInput, handleValidationErrors, updateNote);

/**
 * @swagger
 * /v1/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Note deleted successfully
 */
router.delete('/:id', deleteNote);

module.exports = router;
