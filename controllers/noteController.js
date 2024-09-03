// controllers/noteController.js
const db = require('../models/db');

// Obtenir toutes les notes
exports.getAllNotes = (req, res) => {
    db.query('SELECT * FROM notes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Créer une nouvelle note
exports.createNote = (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
    db.query(sql, [title, content], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, title, content });
    });
};

// Obtenir une note spécifique
exports.getNoteById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM notes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Note non trouvée' });
        }
        res.status(200).json(results[0]);
    });
};

// Mettre à jour une note
exports.updateNote = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Note non trouvée' });
        }
        res.status(200).json({ id, title, content });
    });
};

// Supprimer une note
exports.deleteNote = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Note non trouvée' });
        }
        res.status(204).send();
    });
};
