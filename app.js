// Charger les modules nécessaires
const express = require('express');
const app = express();
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config();
const cors = require('cors');

app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Utiliser les routes
app.use('/api', noteRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
