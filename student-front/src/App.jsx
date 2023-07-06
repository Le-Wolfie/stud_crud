import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Student from "./Student";
import "./index.css";
import "./student.css";
import "./student-form.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch all students from backend
  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  // Delete all students from backend
  function deleteStudents() {
    fetch("http://localhost:8000/delete", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents([]);
      });
  }

  function handleStudent(student) {
    navigate("/edit-student", { state: { student: student } });
  }

  return (
    <div className='App'>
      <h1 className='bigassheader'>Students</h1>
      {students.map((student, i) => {
        return (
          <Student key={i} student={student} handleStudent={handleStudent} />
        );
      })}
      <Link to={"/create-student"}>
        <button className='create-btn'>Create Student</button>
      </Link>
      <button className='delete-btn' onClick={deleteStudents}>
        Clear All Students
      </button>
    </div>
  );
}

export default App;
