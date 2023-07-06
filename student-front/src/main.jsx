import React from "react";
import ReactDOM from "react-dom/client";
import { AuthenticateProvider } from "./AuthenticateContext";
import StudentRoutes from "./StudentRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthenticateProvider>
      <StudentRoutes />
    </AuthenticateProvider>
  </React.StrictMode>
);
