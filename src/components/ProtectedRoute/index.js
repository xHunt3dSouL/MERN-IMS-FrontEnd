import { useContext } from "react";
import Login from "../../pages/Login";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Login />;
  }

  return <>{children}</>;
}
