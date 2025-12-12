import React, { useEffect, useState } from "react";

export default function AdminBouquetValidate() {

  const [bq, setBq] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("bouquetDraft");
    if(saved) setBq(JSON.parse(saved));
  }, []);

  const handleValidate = async () => {
    const res = await fetch("http://localhost:5000/admin/bouquet/save", {
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify(bq)
    });
    const data = await res.json();

    if(data.ok){
      alert("Bouquet enregistré en base !");
      sessionStorage.removeItem("bouquetDraft");
    }
  };

  if(!bq) return <p>Aucun brouillon</p>; // marche pas parceque j'ai validé un bouquet vide 

  return (
    <div className="container mt-4">
      <h3>Valider le bouquet</h3>

      <p><b>Nom :</b> {bq.nom}</p>
      <p><b>Description :</b> {bq.descr}</p>
      <p><b>Prix :</b> {bq.prix}</p>
      <p><b>Image :</b> {bq.image}</p>

      <button className="btn btn-success" onClick={handleValidate}>
        Enregistrer définitivement
      </button>
    </div>
  );
}
