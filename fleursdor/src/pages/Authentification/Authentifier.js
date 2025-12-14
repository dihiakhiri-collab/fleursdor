//export function isAuthenticated(){
  //return true;   // on suppose que l'utilisateur est connecté 
//}
//export function whoIsAuthenticated(){
  //return "Dihia";  //renvoie une valeur FAUSSE mais correcte (simulé)
//}
import store from "../../store/store";

export function isAuthenticated() {
  return !!store.getState().auth.token;
}

export function whoIsAuthenticated() {
  return store.getState().auth.fullName;
}
