// -----------------------------------------------------
// 1) IMPORTS DES MODULES
// -----------------------------------------------------
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models");
const test = require("./test/test");
const bcrypt = require("bcryptjs");

// -----------------------------------------------------
// 2) INITIALISATION DU SERVEUR
// -----------------------------------------------------
const server = express();

// Autoriser accès depuis React
server.use(cors());

// Permettre réception du JSON
server.use(express.json());

// -----------------------------------------------------
// 3) DOSSIER STATIC POUR LES IMAGES UPLOADÉES
// -----------------------------------------------------
// Ce dossier est utilisé par Multer
server.use("/images", express.static("uploads"));


// -----------------------------------------------------
// 4) METRICS (nombre de requêtes / minute)
// -----------------------------------------------------
let reqCountLastMinute = 0;

server.use((req, res, next) => {
  reqCountLastMinute++;
  next();
});

setInterval(() => {
  console.log(`[METRICS] Requêtes reçues la dernière minute : ${reqCountLastMinute}`);
  reqCountLastMinute = 0;
}, 60_000);

server.get("/metrics", (req, res) => {
  res.json({ requests_last_minute: reqCountLastMinute });
});


// -----------------------------------------------------
// 5) AUTHENTIFICATION ADMIN SIMPLE
// -----------------------------------------------------
// -----------------------------------------------------
// 5) VERIFIER SI UN ADMIN EXISTE (PAR ROLE)
// -----------------------------------------------------
server.get("/adminExists", async (req, res) => {
  const admin = await db.User.findOne({
    where: { role: "admin" }
  });

  res.json({ exists: !!admin });
});


server.post("/admin/create", async (req,res)=>{
  const User = db.User;
  const { login, password } = req.body;

  const exists = await User.findOne({ where:{ login } });
  if(exists) return res.json({ ok:false, error:"Admin already exists" });

  await User.create({ login, password, fullName:"Admin" });
  res.json({ ok:true });
});

server.post("/admin/login", async (req, res) => {
  const { login, password } = req.body;

  const admin = await db.User.findOne({ where: { login, role: "admin" } });
  if (!admin) {
    return res.json({ ok: false, error: "Admin introuvable" });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return res.json({ ok: false, error: "Mot de passe incorrect" });
  }

  res.json({
    ok: true,
    id: admin.id,
    fullName: admin.fullName,
    role: admin.role
  });
});

// -----------------------------------------------------
// 6) ROUTES AVEC ROUTER()
// -----------------------------------------------------
const bouquetRoutes = require("./routes/bouquet.routes");
const flowerRoutes = require("./routes/flower.routes");
const userRoutes = require("./routes/user.routes");
const panierRoutes = require("./routes/panier.routes"); 

// Montage des routes API
server.use("/api/bouquets", bouquetRoutes);
server.use("/api/flowers", flowerRoutes);
server.use("/api/users", userRoutes);
server.use("/api/cart", panierRoutes);


// -----------------------------------------------------
// 7) SYNCHRONISATION DE LA BASE
// -----------------------------------------------------
db.sequelize.sync().then(async () => {
  console.log("Base SQLite synchronisée.");

 //await test(db); // tests automatiques
  console.log("Tests effectués.");
});

// -----------------------------------------------------
// 8) DEMARRAGE DU SERVEUR
// -----------------------------------------------------
const PORT = 5000;
server.listen(PORT, () =>
  console.log(`Serveur disponible sur http://localhost:${PORT}`)
);
