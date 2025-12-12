// Importation de React pour pouvoir créer un composant fonctionnel
import React from "react";

// Déclaration du composant fonctionnel Fleurs
// → Ce composant représente la page "Nos Fleurs"
export default function Fleurs() {

  // Tableau contenant les données locales des fleurs à afficher
  // Chaque fleur possède un nom et une image correspondante.
  const fleurs = [
    { nom: "Rose Rouge", image: "/images/fleur 1.jpg" },
    { nom: "Tulipe Jaune", image: "/images/fleur2.jpg" },
    { nom: "Lys Blanc", image: "/images/fleur3.jpg" },
  ];

  // Le composant retourne le contenu JSX qui sera affiché à l’écran
  return (
    // Conteneur principal centré grâce à Bootstrap
    <div className="container text-center">

      {/* Titre principal stylisé */}
      <h2 className="text-success fw-bold mb-4">Nos Fleurs </h2>

      {/* Grille de mise en page avec Bootstrap */}
      {/* "row" → permet d’organiser les cartes en colonnes flexibles */}
      <div className="row">

        {/* On parcourt chaque fleur du tableau avec .map() */}
        {/* Chaque fleur (fl) est affichée dans une carte Bootstrap */}
        {fleurs.map((fl, i) => (

          // Chaque fleur occupe une colonne (col-md-4 = 3 colonnes par ligne sur grand écran)
          // mb-4 ajoute une marge en bas pour espacer les cartes
          <div className="col-md-4 mb-4" key={i}>

            {/* Carte Bootstrap contenant l’image et le texte */}
            <div className="card shadow-sm">

              {/* Image de la fleur */}
              <img
                src={fl.image}           // chemin de l’image
                alt={fl.nom}             // texte alternatif (accessibilité)
                className="card-img-top" // classe Bootstrap pour les images dans une carte
                style={{
                  height: "250px",       // hauteur fixe
                  objectFit: "cover",    // garde le bon cadrage sans déformer l’image
                }}
              />

              {/* Corps de la carte : nom + bouton */}
              <div className="card-body">
                
                {/* Nom de la fleur */}
                <h5 className="card-title">{fl.nom}</h5>

                {/* Bouton stylisé Bootstrap */}
                <button className="btn btn-outline-success">
                  Voir plus
                </button>

                {/* Afficher boutons admin */}
                {sessionStorage.getItem("admin") && (
                  <div className="mt-3 d-flex justify-content-center gap-2">
                    <button className="btn btn-primary btn-sm">Modifier</button>
                    <button className="btn btn-danger btn-sm">Supprimer</button>
                  </div>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
