const Student = ({ student, handleStudent }) => {
  return (
    <div
      className='student'
      onClick={() => {
        handleStudent(student);
      }}
    >
      <table className='table-student'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.gender}</td>
            <td>{student.grade}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Student;
