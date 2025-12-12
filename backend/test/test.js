module.exports = async (db) => {
  try {
    const { Bouquet, Flower, User } = db;

    console.log("Vérification des données...");

    // Fonction utilitaire : insérer sans doublon
    async function ensureBouquet(nom, descr, prix, image) {
      let bouquet = await Bouquet.findOne({ where: { nom } });
      if (!bouquet) {
        bouquet = await Bouquet.create({ nom, descr, prix, image });
        console.log("Bouquet ajouté :", nom);
      } else {
        console.log("Bouquet déjà présent :", nom);
      }
      return bouquet;
    }

    async function ensureFlower(nom, description, prixUnitaire) {
      let flower = await Flower.findOne({ where: { nom } });
      if (!flower) {
        flower = await Flower.create({ nom, description, prixUnitaire });
        console.log("Fleur ajoutée :", nom);
      } else {
        console.log("Fleur déjà présente :", nom);
      }
      return flower;
    }

    // --- INSÉRER LES FLEURS ---
    const rose = await ensureFlower("Rose", "Fleur classique", 200);
    const lys = await ensureFlower("Lys", "Fleur blanche", 300);

    // --- INSÉRER LES BOUQUETS ---
    const bouquetTunis = await ensureBouquet(
      "Bouquet De Tunis ",
      "Un dossage parfait de jasmin et de tulipes, couleurs éclatantes.",
      1500,
      "/images/bouquetTunes3.jpg"
    );

    const bouquetAlger = await ensureBouquet(
      "Bouquet D'Alger ",
      "Mélange de jasmins et senteurs méditerranéennes pour votre bureau.",
      2500,
      "/images/bouquetAlger2.jpg"
    );

    const bouquetOran = await ensureBouquet(
      "Bouquet D'Oran ",
      "Mélange de roses et de lys pour parfumer votre intérieur.",
      2000,
      "/images/bouquetAlger2.jpg"
    );

    // Ajouter les fleurs au bouquet principal (uniquement si pas déjà ajouté)
    await bouquetTunis.addFlower(rose, { through: { quantity: 10 } });
    await bouquetTunis.addFlower(lys, { through: { quantity: 5 } });

    // --- INSÉRER UTILISATEUR ---
    let admin = await User.findOne({ where: { login: "admin" } });
    if (!admin) {
      await User.create({
        login: "admin",
        password: "1234",
        fullName: "Admin User"
      });
      console.log("Utilisateur admin ajouté");
    } else {
      console.log(" Utilisateur admin déjà présent");
    }

    console.log("Test terminé sans duplications !");
  } catch (err) {
    console.error(" Erreur seed :", err);
  }
};
