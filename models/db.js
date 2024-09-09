const mysql = require('mysql2');
require('dotenv').config(); 

// Crée une connexion à la base de données MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,      
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME   
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
