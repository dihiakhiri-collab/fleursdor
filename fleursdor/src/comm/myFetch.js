//centraliser toutes les requêtes HTTP (fetch/axios) pour pouvoir basculer entre les deux facilement.
//Gère la technique du réseau (fetch/axios)/Le câble internet

//C’est un outil utilitaire qui facilite les appels API.
// Au lieu d’écrire fetch(...) ou axios(...) partout dans ton code,
//tu appelles simplement myFetch("/api/bouquets").

//support 2 modes soit avec fetch ou avec axios (si useAxios: true)
import axios from "axios";
import store from "../store/store"; 

const config = {
  useAxios: false, 
  baseURL: "http://localhost:5000",
};

export default async function myFetch(path, options = {}) {
  const url = (config.baseURL || "") + path;
  //Question 3 EXO3
  //Le but est de centraliser l’ajout du JWT dans les fonctions réseau.
//La fonction myFetch lit le token depuis Redux et ajoute l’en-tête Authorization uniquement si le token est présent.
//Cela permet au backend de savoir si l’utilisateur est authentifié sans dupliquer le code dans chaque requête.

    // 1) Récupérer le token depuis Redux
  const token = store.getState().auth?.token;

  // 2) Préparer les headers
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // 3) Ajouter Authorization UNIQUEMENT si token existe
  if (token) {
    headers.Authorization = "Bearer " + token;
  }


  if (config.useAxios) {
    // axios path
    const method = (options.method || "GET").toLowerCase();
    if (method === "get") {
      const res = await axios.get(url, { params: options.params });
      return res.data;
    } else {
      const res = await axios({ url, method, data: options.body, params: options.params });
      return res.data;
    }
  } else {
    // fetch path
    const fetchOptions = {
      method: options.method || "GET",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      body: options.body ? JSON.stringify(options.body) : undefined,
    };
    const res = await fetch(url + (options.query ? `?${new URLSearchParams(options.query)}` : ""), fetchOptions);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
}

//Envoie la requête HTTP (GET ou POST)