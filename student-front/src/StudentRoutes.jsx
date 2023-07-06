import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import StudentForm from "./StudentForm";
import EditStudent from "./EditStudent";
import LoginForm from "./LoginForm";
import ProtectedComponent from "./ProtectedComponent";

const StudentRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginForm />} />
        <Route
          exact
          path='/students'
          element={
            <ProtectedComponent>
              <App />
            </ProtectedComponent>
          }
        />
        <Route
          exact
          path='/create-student'
          element={
            <ProtectedComponent>
              <StudentForm />
            </ProtectedComponent>
          }
        />
        <Route
          exact
          path='/edit-student'
          element={
            <ProtectedComponent>
              <EditStudent />
            </ProtectedComponent>
          }
        />
      </Routes>
    </Router>
  );
};

export default StudentRoutes;
