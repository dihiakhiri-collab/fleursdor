//Le composant qui permet à l’utilisateur de naviguer facilement dans mon site sans recharger la page grâce au système de routage de React.

// Importation des modules nécessaires
import React, { useState, useEffect } from "react"; // <-- ajout useEffect ici
import { Link } from "react-router-dom";         // Link : permet de naviguer entre les pages sans recharger le site
import { FaSearch } from "react-icons/fa";       // FaSearch : icône de loupe (provenant de la bibliothèque react-icons)

// Définition du composant NavBar
export default function NavBar({ menu }) {

  // Déclaration d'un état local pour stocker le texte saisi dans la barre de recherche
  const [search, setSearch] = useState("");

  //  nouveau state local → pour rôle admin
  const [role, setRole] = useState(sessionStorage.getItem("role"));

  // surveiller sessionStorage et mettre à jour automatiquement
  useEffect(()=>{
    const interval = setInterval(()=>{
      setRole(sessionStorage.getItem("role"));
    },400); // rafraîchit toutes les 0.4sec

    return ()=>clearInterval(interval);
  },[]);

  // Fonction appelée quand l’utilisateur valide la recherche
  const handleSearch = (e) => {
    e.preventDefault();  // empêche le rechargement de la page
    alert(`🔍 Résultat de recherche : ${search || "Aucune saisie"}`); // affiche une alerte avec le texte saisi
  };

  return (
    // Élément <nav> : c’est la barre de navigation principale
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
      <div className="container">
        
        {/* Logo / Nom du site cliquable → renvoie vers la page d’accueil */}
        <Link className="navbar-brand fw-bold text-success fs-4" to="/home">
          Fleurs D’Or
        </Link>

        {/* Bouton hamburger (visible uniquement sur mobile) */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"   // active/désactive le menu
          data-bs-target="#menu"      // identifie la partie du menu à ouvrir
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu principal + barre de recherche */}
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3">

            {/* Boucle sur le tableau `menu` envoyé depuis App.js pour créer chaque lien */}
            {menu.map((item) => (
              <li className="nav-item" key={item.url}>
                <Link className="nav-link fw-semibold text-dark" to={item.url}>
                  {item.label}
                </Link>
              </li>
            ))}

            {/* liens admin visibles seulement si role admin */}
            {role==="admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-danger fw-bold" to="/admin/home">
                    Backoffice
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/addBouquet">
                    Ajouter Bouquet
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/addFlower">
                    Ajouter Fleur
                  </Link>
                </li>
              </>
            )}

            {/* Barre de recherche à droite du menu */}
            <li className="nav-item">
              <form
                className="d-flex align-items-center"
                role="search"
                onSubmit={handleSearch}
              >

                {/* Champ de saisie */}
                <input
                  className="form-control me-2 border-0 shadow-sm"
                  type="search"
                  placeholder="Rechercher..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    borderRadius: "25px",
                    backgroundColor: "#f8f9fa",
                    width: "170px",
                    transition: "width 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.width = "210px")}
                  onBlur={(e) => (e.target.style.width = "170px")}
                />

                <button
                  className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
                  type="submit"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#71c48e",
                    border: "none",
                    transition: "0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#63b380")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#71c48e")
                  }
                >
                  <FaSearch size={14} />
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>

      {/* bouton déconnexion */}
      {role==="admin" && (
        <button className="btn btn-warning" 
          onClick={()=>{
            sessionStorage.clear();
            window.location.href="/";
          }}
        >
          Déconnexion
        </button>
      )}

    </nav>
  );
}
