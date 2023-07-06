import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticateContext } from "./AuthenticateContext";
const ProtectedComponent = ({ children }) => {
  const { authenticate } = useContext(AuthenticateContext);
  // cannot use useNavigate() here because this component is not a child of <Router>, gotta use <Navigate> instead
  if (!authenticate) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedComponent;
