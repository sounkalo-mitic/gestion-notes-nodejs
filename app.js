// app.js
const express = require('express');
const app = express();
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config(); // Charger les variables d'environnement du fichier .env

// Utiliser le middleware pour parser le JSON
app.use(express.json());

// Utiliser les routes
app.use('/api', noteRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
