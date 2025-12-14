// On importe React pour pouvoir utiliser la syntaxe JSX
import React from "react";
import { isAuthenticated, whoIsAuthenticated } from "../pages/Authentification/Authentifier";

// src/components/Bouquet.js
//  Composant "Bouquet" : affiche une carte avec image, nom, description, prix, Like  (avec compteur) et Commander 


export default function Bouquet({ bouquet, onToggleLike }) {

//const handleLike = async () => {
  //const res = await fetch(`http://localhost:5000/api/bouquets/${bouquet.id}/like`, {
  //  method: "POST"
//  });

  //const data = await res.json();

  // On demande au parent de mettre à jour le bouquet
  //onToggleLike(bouquet.id, data.likes);
//};

  return (
    // Conteneur principal pour une seule carte de bouquet
    <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">

      {/* Carte Bootstrap représentant un bouquet */}
      <div
        className="card shadow-sm border-0"
        style={{
          width: "100%",
          maxWidth: "320px",
          borderRadius: "20px",
          overflow: "hidden",
          transition: "transform 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >

        {/* Image du bouquet */}
        <img
          src={`http://localhost:5000/images/${bouquet.image}`}
          className="card-img-top"
          alt={bouquet.nom}
          style={{
            height: "250px",
            objectFit: "cover",
           }}
        />


        {/* Corps de la carte : texte et actions */}
        <div className="card-body text-center">

          {/* Nom du bouquet */}
          <h5 className="card-title text-success fw-bold">{bouquet.nom}</h5>

          {/* Description */}
          <p className="card-text text-muted" style={{ minHeight: "70px" }}>
            {bouquet.descr}
          </p>

          {/* Prix */}
          <p className="fw-bold text-danger">{bouquet.prix} DA</p>

          {/* compteur likes */}
          <p className="text-muted mb-2">
            💖 {bouquet.likesCount ?? 0} like
            {(bouquet.likesCount ?? 0) > 1 ? "s" : ""}
          </p>

          {/* boutons actions */}
          <div className="d-flex justify-content-center gap-3 mt-3">

            {/* Bouton Like */}
            <button
              type="button"
              disabled={!isAuthenticated()}  
              className={`btn px-4 py-2 fw-semibold ${
                bouquet.liked
                  ? "btn-danger text-white shadow-sm"
                  : "btn-outline-danger text-danger"
              }`}
              style={{ borderRadius: "25px" }}
              onClick={() => onToggleLike(bouquet.id)} 
            >
             {/* {bouquet.liked ? "♥ Liked" : "♡ Like"}*/}
             ❤️ {bouquet.likesCount}
            </button>

           { /*Afiicher les utilisateurs qui ont fait des clics*/}

            <span
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={async () => {
                const res = await fetch(
                 `http://localhost:5000/api/bouquets/${bouquet.id}/users`,
                 {
                   headers: {
                     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                   },
                 }
               );
               const users = await res.json();
               alert(users.join(", "));
             }}
           >
              Voir Utilisateurs
           </span>



            {/* Bouton Commander */}
            <button
              type="button"
              className="btn px-4 py-2 fw-semibold text-white"
              style={{
                borderRadius: "25px",
                background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
              }}
              onClick={async () => {
                 // 1️) Pas connecté
                if (!isAuthenticated()) {
                  alert("Veuillez vous connecter");
                  return;
                }
                  // 2️) Admin bloqué
                if (whoIsAuthenticated()?.role === "admin") {
                  alert("Admin ne peut pas commander");
                  return;
                }
                // 3️⃣ Appel backend
                try {
                    const res = await fetch(`http://localhost:5000/api/cart/${bouquet.id}`, 
                     {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        },
                      }
                   );
                  
                 if (!res.ok) {
                    throw new Error("Erreur lors de l'ajout au panier");
                  }

                  alert("Ajouté au panier ");
                } catch (err) {
                  alert("Erreur serveur ");
                  console.error(err);
               }
             }}

            >
              Commander
            </button>
          </div>

          {/* Boutons admin */}
          {sessionStorage.getItem("admin") && (
            <div className="mt-3 d-flex justify-content-center gap-2">
              <button className="btn btn-primary btn-sm">Modifier</button>
              <button className="btn btn-danger btn-sm">Supprimer</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
