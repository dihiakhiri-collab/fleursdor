import React from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaLeaf } from "react-icons/fa";

export default function AdminHome() {

  //sécurité : si pas admin → retour accueil
 // if (sessionStorage.getItem("role") !== "admin") {
   // window.location.href = "/";
   // return null; // pour éviter une erreur React
 // }

  return (
    <div style={{
      padding: "60px",
      minHeight: "100vh",
      background: "linear-gradient(145deg, #EBD4FF, #DAD6FF)"
    }}>
      
      <h1 style={{ color:"#0a7b5c", marginBottom:"20px" }}>
        Espace Administrateur
      </h1>

      {/* message admin */}
      <h3>Bienvenue Administrateur </h3>

      <p>Bienvenue dans le panneau de gestion :</p>

      <div style={{ marginTop: "40px" }}>
        <Link className="btn btn-success m-2" to="/admin/addBouquet">
          <FaPlusCircle /> Ajouter un Bouquet
        </Link>

        <Link className="btn btn-warning m-2" to="/admin/addFlower">
          <FaLeaf /> Ajouter une Fleur
        </Link>
      </div>
    </div>
  );
}
