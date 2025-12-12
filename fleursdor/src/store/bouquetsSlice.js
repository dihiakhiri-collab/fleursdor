//Gère la logique métiers (charger, liker, etc.)
//C’est le module Redux qui gère tout ce qui concerne les bouquets :
//les données (state.items)
//les actions utilisateur (toggleLocalLiked, sendLike, etc.)
//la communication backend (loadBouquets, sendLike)
//C’est ici que la logique métier se trouve.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../comm/api";

// thunk qui Appelle mon backend (GET /api/bouquets) et Met à jour Redux automatiquement quand la réponse arrive.
//createAsyncThunk lance une requête asynchrone (vers le backend).
export const loadBouquets = createAsyncThunk("bouquets/load", async () => {
  const data = await api.fetchBouquets();
  return data;
});

// Thunk pour like (optimistic update + reconcile)et Met à jour le compteur de likes après confirmation du serveur.
export const sendLike = createAsyncThunk("bouquets/sendLike", async ({ id, action }, { rejectWithValue }) => {
  try {
    const res = await api.likeBouquet(id, action);
    return { id, likesCount: res.likesCount };
  } catch (err) {
    return rejectWithValue(err);
  }
});

const bouquetsSlice = createSlice({
  name: "bouquets",
  initialState: { items: [], status: "idle" },
  reducers: {
    // mise à jour locale optimiste : set liked boolean pour client UI
    //permet de Mettre à jour localement l’état du bouquet (sans attendre le backend).
    toggleLocalLiked(state, action) {
      const id = action.payload;
      const b = state.items.find((x) => x.id === id);
      if (b) {
        b.liked = !b.liked;
        b.likesCount = b.likesCount || 0;
        b.likesCount += b.liked ? 1 : -1;
        if (b.likesCount < 0) b.likesCount = 0;
      }
    },
    setBouquets(state, action) {
      state.items = action.payload;
    },
  },

  //Quand la requête loadBouquets() réussit, on remplace la liste de bouquets par celle reçue du serveur.
  extraReducers(builder) {
    builder
      .addCase(loadBouquets.pending, (s) => (s.status = "loading"))
      .addCase(loadBouquets.fulfilled, (s, a) => {
        s.items = a.payload.map((b) => ({ ...b, liked: false, likesCount: b.likesCount || 0 }));
        s.status = "idle";
      })
      .addCase(sendLike.fulfilled, (s, a) => {
        // reconcile server likesCount with local item
        const id = a.payload.id;
        const b = s.items.find((x) => x.id === id);
        if (b) b.likesCount = a.payload.likesCount;
      });
  },
});

export const { toggleLocalLiked, setBouquets } = bouquetsSlice.actions;
export default bouquetsSlice.reducer;
