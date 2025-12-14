import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";


export default function MonCompte() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [mode, setMode] = useState("login"); // login | create
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/adminExists")
      .then(res => res.json())
      .then(data => {
        if (!data.exists) setMode("create");
      });
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const url =
    mode === "login"
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users"; // CREATE USER

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password })
  });

  const data = await res.json();

  if (!data.ok) return alert(data.error);

  if (mode === "login") {
    dispatch(loginSuccess({
      token: data.token,
      fullName: data.fullName,
      role: data.role
    }));

    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("token", data.token);

    if (data.role === "admin") navigate("/admin/home");
    else navigate("/"); // user normal
  } else {
    alert("Compte créé avec succès. Connectez-vous.");
    setMode("login");
  }
};



  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "350px" }}>
        
       <h3 className="text-center mb-3">
        {mode === "login" ? "Connexion" : "Créer un compte"}
       </h3>


        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label>Username</label>
            <input
              autoComplete="off"
              className="form-control"
              value={login}
              onChange={e => setLogin(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Mot de passe</label>
            <input
              type="password"
              autoComplete="new-password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
             Se connecter
          </button>

          <p className="text-center mt-3">
           {mode === "login" ? (
            <span
             style={{ cursor: "pointer", color: "green" }}
             onClick={() => setMode("register")}
           >
             Créer un compte
            </span>
          ) : (
            <span
             style={{ cursor: "pointer", color: "green" }}
             onClick={() => setMode("login")}
            >
             Se connecter
            </span>
           )}
         </p>


        </form>
      </div>
    </div>
  );
}
