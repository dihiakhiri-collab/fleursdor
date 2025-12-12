import React, { useState, useEffect } from "react";

export default function AdminBouquetAdd() {

  const [nom, setNom] = useState("");
  const [descr, setDescr] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);   // <-- un vrai fichier

  const [listeFleurs, setListeFleurs] = useState([]);
  const [fleurChoisie, setFleurChoisie] = useState("");
  const [quantite, setQuantite] = useState("");


  // --- RECUP DU BROUILLON ---
  useEffect(() => {
    const saved = sessionStorage.getItem("bouquetDraft");
    if (saved) {
      const obj = JSON.parse(saved);
      setNom(obj.nom || "");
      setDescr(obj.descr || "");
      setPrix(obj.prix || "");
      setListeFleurs(obj.listeFleurs || []);
      // l'image ne peut pas être rechargée (sécurité)
    }
  }, []);

  // --- SAVE DRAFT ---
  useEffect(() => {
    const data = { nom, descr, prix, listeFleurs };
    sessionStorage.setItem("bouquetDraft", JSON.stringify(data));
  }, [nom, descr, prix, listeFleurs]);


  // --- CHOIX IMAGE ---
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);     // <-- stocker le fichier, PAS son nom
  };


  // --- AJOUT FLEUR ---
  const ajouterFleur = () => {
    if (!fleurChoisie || !quantite) {
      return alert("Veuillez choisir une fleur et une quantité.");
    }

    setListeFleurs([
      ...listeFleurs,
      { nom: fleurChoisie, quantite: parseInt(quantite) }
    ]);

    setFleurChoisie("");
    setQuantite("");
  };


  const supprimerFleur = (i) => {
    const arr = [...listeFleurs];
    arr.splice(i, 1);
    setListeFleurs(arr);
  };


  // --- ENVOI FINAL ---
  const handleValidate = async () => {

    if (!nom || !descr || !prix || !image) {
      return alert("Veuillez remplir nom, description, prix et image !");
    }

    if (listeFleurs.length === 0) {
      return alert("Ajoutez au moins une fleur !");
    }

    // *** FORM DATA POUR MULTER ***
    const fd = new FormData();
    fd.append("nom", nom);
    fd.append("descr", descr);
    fd.append("prix", prix);
    fd.append("image", image);     // <-- fichier réel
    fd.append("flowers", JSON.stringify(listeFleurs));

    const res = await fetch("http://localhost:5000/api/bouquets", {
      method: "POST",
      body: fd,         // <-- PAS de headers !
    });

    const data = await res.json();

    alert("Bouquet enregistré en BDD !");

    sessionStorage.removeItem("bouquetDraft");
    window.location.href = "/bouquets";
  };



  return (
    <div className="container mt-4">

      <h3>Ajouter un Bouquet</h3>

      <div className="mb-3">
        <label>Nom</label>
        <input className="form-control"
          value={nom}
          onChange={e => setNom(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea className="form-control"
          value={descr}
          onChange={e => setDescr(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Prix</label>
        <input className="form-control" type="number"
          value={prix}
          onChange={e => setPrix(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Image</label>
        <input type="file" className="form-control" onChange={handleImage} />
      </div>

      <hr />

      <h4>Fleurs du bouquet</h4>

      <select className="form-select"
        value={fleurChoisie}
        onChange={e => setFleurChoisie(e.target.value)}
      >
        <option value="">Choisir une fleur...</option>
        <option>Rose</option>
        <option>Tulipe</option>
        <option>Orchidée</option>
      </select>

      <input type="number"
        className="form-control mt-2"
        placeholder="Quantité"
        value={quantite}
        onChange={e => setQuantite(e.target.value)}
      />

      <button className="btn btn-success mt-2"
        onClick={ajouterFleur}>
        Ajouter cette fleur
      </button>

      <ul className="mt-3">
        {listeFleurs.map((f, i) => (
          <li key={i}>
            {f.nom} — {f.quantite}
            <button className="btn btn-sm btn-danger ms-2"
              onClick={() => supprimerFleur(i)}>
              X
            </button>
          </li>
        ))}
      </ul>

      <button
        className="btn btn-primary mt-3"
        onClick={handleValidate}>
        Valider le bouquet
      </button>

    </div>
  );
}
