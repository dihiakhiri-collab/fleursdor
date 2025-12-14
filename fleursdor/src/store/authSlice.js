import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token"),
    fullName: sessionStorage.getItem("fullName"),
    role: sessionStorage.getItem("role")   // ✅ OK
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.fullName = action.payload.fullName;
      state.role = action.payload.role;    // ✅ OK

      // 🔐 Persistance
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("fullName", action.payload.fullName);
      sessionStorage.setItem("role", action.payload.role);
    },
    logout(state) {
      state.token = null;
      state.fullName = null;
      state.role = null;

      sessionStorage.clear();
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
