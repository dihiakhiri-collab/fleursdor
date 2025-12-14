// middleware/auth.js
// On importe la librairie jsonwebtoken
// Elle permet de vérifier et décoder les tokens JWT
const jwt = require("jsonwebtoken");

// On exporte un middleware Express
// Un middleware est une fonction qui s’exécute AVANT les routes (controllers)
module.exports = (req, res, next) => {

     // On récupère l'en-tête HTTP "Authorization"
  // Exemple attendu :
  // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  //Où est lu le JWT côté backend
  const authHeader = req.headers.authorization;

   // Si l'en-tête Authorization n'existe pas
  // Cela signifie que l'utilisateur n'est PAS authentifié
  if (!authHeader) {
    req.user = null; // On indique qu'il n'y a pas d'utilisateur connecté
    return next();  // On continue vers le contrôleur sans bloquer
  }

   // On extrait uniquement le token
  // "Bearer TOKEN" → on garde seulement TOKEN
  const token = authHeader.split(" ")[1];//JWT attend uniquement le token, pas "Bearer "  
                                         //split(" ")-->coupe la chaîne en deux
                                          //[1]-->le token JWT
  try {
    // On vérifie le token avec la clé secrète du serveur
    // Si le token est valide :
    // - jwt.verify décode le token
    // - decoded contient les infos de l'utilisateur (id, login, role, etc.)
    const decoded = jwt.verify(token, "SECRET_KEY_JWT_2025");


    // On attache l'utilisateur à la requête
    // Tous les contrôleurs pourront lire req.user
    req.user = decoded; // utilisateur connecté

   } catch (err) {
    // Si le token est invalide ou expiré
    // L'utilisateur est considéré comme non authentifié
    req.user = null;
  }


  // On autorise la requête à continuer vers le contrôleur
  next();
};

