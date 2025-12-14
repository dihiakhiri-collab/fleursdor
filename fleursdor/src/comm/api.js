//Fait les appels au backend avec des fonctions simples(Le traducteur entre React et le serveur)
//C’est un ensemble de fonctions métiers qui utilisent myFetch() pour communiquer avec le backend de manière claire et réutilisable.
import myFetch from "./myFetch";

export const fetchBouquets = () => myFetch("/api/bouquets");//Récupère la liste des bouquets :GET /api/bouquets
export const likeBouquet = (id) =>
  myFetch(`/api/bouquets/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

 //Ajoute ou retire un like :POST /like
export const getMetrics = () => myFetch("/metrics"); //Récupère les statistiques serveur (requêtes/minute)
