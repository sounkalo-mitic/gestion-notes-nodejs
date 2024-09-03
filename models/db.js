// models/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Charge les variables d'environnement du fichier .env

// Crée une connexion à la base de données MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,      // Hôte de la base de données (ex: localhost)
    user: process.env.DB_USER,      // Utilisateur de la base de données
    password: process.env.DB_PASSWORD,  // Mot de passe de la base de données
    database: process.env.DB_NAME   // Nom de la base de données
});

// Connecte à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err.message);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});

module.exports = db; // Exporte la connexion pour l'utiliser dans d'autres fichiers
