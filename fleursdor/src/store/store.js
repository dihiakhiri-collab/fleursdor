
//Contient toute la mémoire globale de l’app(Le cerveau central)
import { configureStore } from "@reduxjs/toolkit";
import bouquetsReducer from "./bouquetsSlice";
import authReducer from "./authSlice";


export const store = configureStore({ //Crée le store Redux (un seul pour toute l’app).
  reducer: {
    auth: authReducer,
    bouquets: bouquetsReducer,   //bouquetsReducer :C’est le module (slice) qui gère la partie “bouquets”.
  },                             
});
export default store;
//Il est branché à ton application via le <Provider store={store}> dans index.js.
 //Tous tes composants (Bouquets, Home, etc.) peuvent lire ou modifier ce store grâce à Redux.