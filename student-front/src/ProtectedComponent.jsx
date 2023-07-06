import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticateContext } from "./AuthenticateContext";
const ProtectedComponent = ({ children }) => {
  const { authenticate } = useContext(AuthenticateContext);

  if (!authenticate) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedComponent;
