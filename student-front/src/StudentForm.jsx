import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentObj = {
      name: e.target.name.value,
      email: e.target.email.value,
      grade: e.target.grade.value,
      gender: e.target.gender.value,
    };
    fetch("http://localhost:8000/submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        navigate("/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='form-input'>
      <h2 className='form-header'>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Student Name</label>
        <input type='text' name='name' />
        <label>Student Email</label>
        <input type='email' name='email' />
        <label>Student Gender</label>
        <select name='gender'>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
        <label>Student Grade</label>
        <input type='number' name='grade' min='0' max='4' step='0.01' />
        <button className='submit-btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
