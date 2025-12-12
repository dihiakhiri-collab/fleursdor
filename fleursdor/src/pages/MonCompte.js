import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MonCompte() {
  const navigate = useNavigate();
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

    const route = mode === "create" ? "/admin/create" : "/admin/login";

    const res = await fetch("http://localhost:5000" + route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password })
    });

    const data = await res.json();
    if (!data.ok) return alert(data.error);

     sessionStorage.setItem("role", data.role);
        if(data.role === "admin"){
      navigate("/admin/home");
    } else {
      navigate("/");
    }
  
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "350px" }}>
        
        <h3 className="text-center mb-3">
          {mode === "create" ? "Créer Administrateur" : "Connexion"}
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

          <button className="btn btn-success w-100">
            {mode === "create" ? "Créer Admin" : "Se connecter"}
          </button>

        </form>
      </div>
    </div>
  );
}
