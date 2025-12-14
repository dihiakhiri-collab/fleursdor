
//App.js → contient la structure principale de ton application
//Importations des dépendances
import React, { useState } from "react";  // useState --> { useState } →gérer les données dynamiques des bouquets et leur tri.
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; //BrowserRouter -->gère les chemins de mon application (ex: /home, /bouquets).
                                                                                     // Routes, Route -->quelle page s’affiche selon le lien choisi.
import NavBar from "./components/NavBar";
import Bouquet from "./components/Bouquet";
import Home from "./pages/Home";
import Bouquets from "./pages/Bouquets";
import Fleurs from "./pages/Fleurs";
import MonCompte from "./pages/MonCompte";
import mesBouquets from "./data/mesBouquets"; //mon tableau de données contient les informations des bouquets (nom, prix, image).
import AdminHome from "./pages/AdminHome";
import AdminBouquetAdd from "./pages/AdminBouquetAdd";
import AdminBouquetValidate from "./pages/AdminBouquetValidate";
import "./App.css"; //mon fichier de style personnalisé (couleurs, marges, design)
import { isAuthenticated, whoIsAuthenticated } from "./pages/Authentification/Authentifier";
import AdminRoute from "./components/AdminRoute";



//composant principal de App

//l‘état global -->un tableau d’objets menu contenant les liens qui apparaîtront dans la barre de navigation (NavBar).
function App() {
  const isAuth = isAuthenticated();
  const menu = [
    { url: "/home", label: "Accueil" },
    { url: "/bouquets", label: "Bouquets" },
    { url: "/fleurs", label: "Fleurs" },
    { url: "/moncompte",  label: isAuth ? whoIsAuthenticated() : "Mon compte" },
  ];


//Gestion des données :useState(hook)
const [bouquets, setBouquets] = useState(mesBouquets);//je crée un état React (une “donnée vivante”) nommé bouquets.
                                                       //mesBouquets est la valeur initiale (mes bouquets définis dans data/mesBouquets.js).
                                                       //setBouquets permet de modifier cette liste (par exemple, si tu veux trier les bouquets).


//Fonction de tri des bouquets:
//Cette fonction trie les bouquets selon le prix :

const trierBouquets = (ordre) => {
  const sorted = [...bouquets].sort((a, b) =>   //crée une copie de la liste (important pour ne pas modifier l’état original directement)
    ordre === "asc" ? a.prix - b.prix : b.prix - a.prix
  );
  setBouquets(sorted);  //setBouquets(sorted) → met à jour la liste triée dans React.
};


//la structure de l'application :
return (
  <Router>   {/* Router Enveloppe toute ton application → il permet de gérer la navigation entre les pages sans recharger le site.*/}
    <NavBar menu={menu} /> {/* //NavBar menu={menu} mon composant de navigation reçoit le tableau menu pour afficher les liens (Accueil, Bouquets, etc.)*/}

    {/*structurer et à styliser la partie “contenu principal” de ta page  -->avec div*/}
    <div className="container mt-4">
      <Routes>   {/* Contient toutes les routes de mon application :*/}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />  {/* affiche la page Home*/}
        <Route
          path="/bouquets" 
          element={<Bouquets bouquets={bouquets} trierBouquets={trierBouquets} />}  
        />  {/* Affiche la page des bouquets, en lui passant des props. */} {/*  affiche la page Bouquets  ,on lui transmet deux props : bouquets → la liste à afficher, trierBouquets → la fonction pour trier*/}
        <Route path="/fleurs" element={<Fleurs />} />
        <Route path="/moncompte" element={<MonCompte />} />
       <Route
  path="/admin/home"
  element={
    <AdminRoute>
      <AdminHome />
    </AdminRoute>
  }
/>

<Route
  path="/admin/addBouquet"
  element={
    <AdminRoute>
      <AdminBouquetAdd />
    </AdminRoute>
  }
/>

<Route
  path="/admin/validateBouquet"
  element={
    <AdminRoute>
      <AdminBouquetValidate />
    </AdminRoute>
  }
/>

      </Routes>
    </div>

    <footer className="text-center mt-5 py-3 footer-custom">
       Réalisé par <b>Dihia</b> 
    </footer>
  </Router>
);

}
export default App; // exporter le fchier App.js pour que d’autres fichiers puissent l’utiliser comme le fichier index.js


