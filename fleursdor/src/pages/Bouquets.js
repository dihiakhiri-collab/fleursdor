// src/pages/Bouquets.js
//import React, { useEffect, useState } from "react";
//import Bouquet from "../components/Bouquet";

//export default function Bouquets() {
 // const [bouquets, setBouquets] = useState([]);

  // Charger depuis localStorage ou serveur
 // useEffect(() => {
   // const localData = localStorage.getItem("mesBouquets");
   // if (localData) {
     // setBouquets(JSON.parse(localData));
     // return;
  //  }

   // fetch("http://localhost:5000/api/bouquets")
      //.then((res) => res.json())
      //.then((data) => {
      //  setBouquets(data);
      //  localStorage.setItem("mesBouquets", JSON.stringify(data));
     // })
    //  .catch((err) => console.error("Erreur récupération bouquets :", err));
 // }, []);

  // Fonction Like/Unlike
  //const toggleLike = (id) => {
    //const updated = bouquets.map((b) =>
     // b.id === id ? { ...b, liked: !b.liked } : b
    //);
    //setBouquets(updated);
    //Sauvegarde la liste des bouquets (tableau d’objets) dans localStorage sous la clé mesBouquets.
   // localStorage.setItem("mesBouquets", JSON.stringify(updated));


    //fetch(`http://localhost:5000/like?id=${id}`)
      //.then((res) => res.json())
     // .then((data) => console.log("Réponse serveur :", data))
     // .catch((err) => console.error("Erreur Like :", err));
 // };

  //return (
    //<div className="container">
     // <h2 className="text-center text-success mb-4">Nos Bouquets 💐</h2>

      //<div className="row g-4">
       // {bouquets.length > 0 ? (
          //bouquets.map((bq) => (
         //   <Bouquet key={bq.id} bouquet={bq} onToggleLike={() => toggleLike(bq.id)} />
         // ))
       // ) : (
         // <p className="text-center text-muted">Chargement des bouquets...</p>
       // )}
    //  </div>
    //</div>
  //);
//}

// src/pages/Bouquets.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Bouquet from "../components/Bouquet";
import { loadBouquets, toggleLocalLiked, sendLike, setBouquets } from "../store/bouquetsSlice";
import myFetch from "../comm/myFetch";

export default function Bouquets() {
  const dispatch = useDispatch();
  const bouquets = useSelector((s) => s.bouquets.items);

  // load initial (tries localStorage first)
  useEffect(() => {
    const local = localStorage.getItem("mesBouquets");
    if (local) {
      try {
        dispatch(setBouquets(JSON.parse(local)));
      } catch {}
    }
    // Fait une requete vers le backend
    dispatch(loadBouquets()).then((res) => {
    if (res.payload) {
      localStorage.setItem("mesBouquets", JSON.stringify(res.payload));
    }
  });

  }, [dispatch]);


  //3.c) Synchronisation automatique entre onglets
  // Ce polling recharge les bouquets toutes les 60 secondes. Donc si j likes un bouquet dans Firefox, Chrome verra le changement dans la minute suivante, sans rafraîchir.
  useEffect(() => {  //Exécuté une seule fois quand la page “Bouquets” est affichée
    const id = setInterval(() => {
      // use myFetch directly or dispatch(loadBouquets)
      myFetch("/api/bouquets")//Fait une requête HTTP au backend ou Demande la nouvelle liste de bouquets
        .then((data) => {
          dispatch(setBouquets(data.map(b => ({ ...b, liked: false })))); //Met à jour le store Redux ou Actualise les données affichées à l’écran
          localStorage.setItem("mesBouquets", JSON.stringify(data)); //Sauvegarde localement/Met à jour la copie du tableau dans le navigateur
        })
        .catch((err) => console.error("Polling error:", err));
    }, 60000); //Crée un timer répétitif /Exécute le code à l’intérieur toutes les 60 secondes (soit 1 minute)

    return () => clearInterval(id); //Arrête le timer quand la page est fermée
  }, [dispatch]);

 const handleToggleLike = (id) => {
  const bouquet = bouquets.find(b => b.id === id);
  if (!bouquet) return;

  // Mise à jour optimiste
  dispatch(toggleLocalLiked(id));

  // Déterminer l'action like ou unlike
  const action = bouquet.liked ? "unlike" : "like";

  // Envoyer au backend
  dispatch(sendLike({ id, action })).then(() => {
    const state = storeGetSnapshot();
    localStorage.setItem("mesBouquets", JSON.stringify(state.bouquets.items));
  });
};


  // helper to read store synchronously (we import store)
  // place this function at top of file or in a util file (we use dynamic import here)
  function storeGetSnapshot() {
    try {
      // eslint-disable-next-line
      const { store } = require("../store/store");
      return store.getState();
    } catch {
      return { bouquets: { items: [] } };
    }
  }

  return (
    <div className="container">
      <h2 className="text-center text-success mb-4">Nos Bouquets </h2>
      <div className="row g-4">
        {bouquets.length > 0 ? (
          bouquets.map((bq) => (
            <Bouquet
              key={bq.id}
              bouquet={bq}
              onToggleLike={() => handleToggleLike(bq.id)}
            />
          ))
        ) : (
          <p className="text-center text-muted">Chargement des bouquets...</p>
        )}
      </div>
    </div>
  );
}

//polling :Actualise automatiquement les bouquets et les likes chaque minute
//Redux sert à organiser et gérer l’état global d’une application, en rendant les changements prévisibles, traçables et accessibles partout, ce qui simplifie le développement des applications complexes.