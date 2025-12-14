import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const roleRedux = useSelector(state => state.auth.role);
  const roleStorage = sessionStorage.getItem("role");

  const role = roleRedux || roleStorage;

  return role === "admin"
    ? children
    : <Navigate to="/moncompte" replace />;
}
