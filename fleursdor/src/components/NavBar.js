import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function NavBar({ menu }) {

  const [search, setSearch] = useState("");

  //  Infos d’authentification depuis Redux
  const token = useSelector(state => state.auth.token);
  const fullName = useSelector(state => state.auth.fullName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  LOGOUT JWT
  const handleLogout = async () => {

    // (optionnel) appel backend logout
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    //  suppression JWT côté client
    dispatch(logout());

    //  retour accueil
    navigate("/home");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`🔍 Résultat : ${search || "Aucune saisie"}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
      <div className="container">

        <Link className="navbar-brand fw-bold text-success fs-4" to="/home">
          Fleurs D’Or
        </Link>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto align-items-center gap-3">

            {menu.map(item => (
              <li className="nav-item" key={item.url}>
                <Link className="nav-link" to={item.url}>
                  {item.label}
                </Link>
              </li>
            ))}

            {/* 👤 UTILISATEUR CONNECTÉ */}
            {token && (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle fw-bold"
                  data-bs-toggle="dropdown"
                >
                  {fullName}
                </span>

                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {/* 🔍 Recherche */}
            <li className="nav-item">
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                />
                <button className="btn btn-success">
                  <FaSearch />
                </button>
              </form>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
