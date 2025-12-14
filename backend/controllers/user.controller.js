const db = require("../models");
const User = db.User;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "SECRET_KEY_JWT_2025";

/* 
   RÉCUPÉRER TOUS LES UTILISATEURS
*/
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(" ERREUR FINDALL :", error);
    res.status(500).json({ ok: false, error: "Erreur serveur" });
  }
};

/* 
   CRÉATION D’UN UTILISATEUR
*/
exports.create = async (req, res) => {
  try {
    const { login, password, fullName, role } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        ok: false,
        error: "Login et mot de passe obligatoires"
      });
    }

    const exists = await User.findOne({ where: { login } });
    if (exists) {
      return res.status(409).json({
        ok: false,
        error: "Utilisateur existe déjà"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      login,
      password: hashedPassword,
      fullName: fullName || "",
      role: role || "user"
    });

    res.status(201).json({
      ok: true,
      id: user.id
    });

  } catch (error) {
    console.error("ERREUR CREATE USER :", error);
    res.status(500).json({
      ok: false,
      error: "Erreur serveur"
    });
  }
};

/* 
   LOGIN UTILISATEUR (JWT)
*/
exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        ok: false,
        error: "Login et mot de passe requis"
      });
    }

    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "Utilisateur introuvable"
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        ok: false,
        error: "Mot de passe incorrect"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        fullName: user.fullName,
        role: user.role
      },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      ok: true,
      token,
      fullName: user.fullName,
      role: user.role
    });

  } catch (error) {
    console.error("❌ ERREUR LOGIN :", error);
    res.status(500).json({
      ok: false,
      error: "Erreur serveur"
    });
  }
};

/* 
   LOGOUT UTILISATEUR
*/
exports.logout = (req, res) => {
  res.json({
    ok: true,
    message: "Utilisateur déconnecté"
  });
};
