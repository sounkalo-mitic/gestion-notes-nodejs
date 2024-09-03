// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Définir les routes pour chaque opération CRUD
router.get('/notes', noteController.getAllNotes);      // Obtenir toutes les notes
router.post('/notes', noteController.createNote);      // Créer une nouvelle note
router.get('/notes/:id', noteController.getNoteById);  // Obtenir une note par ID
router.put('/notes/:id', noteController.updateNote);   // Mettre à jour une note
router.delete('/notes/:id', noteController.deleteNote);// Supprimer une note

module.exports = router;
