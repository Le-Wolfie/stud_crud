import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const EditStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    grade: "",
    gender: "male", // default value
  });
  const studentId = location.state.student._id;

  useEffect(() => {
    if (location.state && location.state.student) {
      // if there's a student that was passed in
      setStudent(location.state.student); // fill the form with the student's data
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentObj = {
      name: e.target.name.value,
      email: e.target.email.value,
      grade: e.target.grade.value,
      gender: e.target.gender.value,
    };
    fetch(`http://localhost:8000/update/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentObj),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOneDelete = () => {
    fetch(`http://localhost:8000/delete/${studentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='form-input'>
      <h2 className='form-header'>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Student Name</label>
        <input type='text' name='name' defaultValue={student.name} />
        <label>Student Email</label>
        <input type='email' name='email' defaultValue={student.email} />
        <label>Student Gender</label>
        <select name='gender' defaultValue={student.gender}>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
        <label>Student Grade</label>
        <input
          type='number'
          name='grade'
          min='0'
          max='4'
          step='0.01'
          defaultValue={student.grade}
        />
        <button className='submit-btn' type='submit'>
          Submit
        </button>
        <button className='delete-btn' type='reset' onClick={handleOneDelete}>
          Delete Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
