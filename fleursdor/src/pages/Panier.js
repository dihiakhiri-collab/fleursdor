import React from "react";
import { useSelector } from "react-redux";
import myFetch from "../comm/myFetch";

export default function Panier({ bouquets }) {

  //  On récupère le token depuis Redux
  const token = useSelector(state => state.auth.token);

  //  Fonction d’achat
  const acheter = async () => {

    // Si pas connecté → refus
    if (!token) {
      alert("Vous devez être connecté pour acheter");
      return;
    }

    //  Appel backend avec JWT
    const res = await myFetch("/api/panier/acheter", {
      method: "POST",
      headers: {
        //  Envoi du JWT (la clé) au backend
        Authorization: `Bearer ${token}`
      },
      body: {
        bouquets //  Liste des bouquets du panier
      }
    });

    alert(res.message);
  };

  return (
    <div>
      <h2>Mon panier</h2>

      {bouquets.map(b => (
        <div key={b.id}>
          {b.nom} - {b.prix} €
        </div>
      ))}

      <button onClick={acheter}>
        Acheter
      </button>
    </div>
  );
}
