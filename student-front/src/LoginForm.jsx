import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticateContext } from "./AuthenticateContext";

const LoginForm = () => {
  const { login } = useContext(AuthenticateContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminObj = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const res = await login(adminObj);
    console.log(res);
    if (res) {
      navigate("/students");
    }
  };

  return (
    <div className='login-form-container'>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            name='username'
            placeholder='Enter your username'
            required
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            required
          />
        </div>
        <button className='create-btn' type='submit'>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
