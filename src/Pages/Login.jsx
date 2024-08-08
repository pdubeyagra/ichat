import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log([email, password]);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to the home page or another appropriate page after successful login
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <span className="Logo">iChat</span>
        <span className="title">Log In</span>
        <form onSubmit={handleSubmit} className="login-form" id="loginform">
          <input type="email" placeholder="Email Address" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Log In</button>
          { err && <span>{err}</span> }
        </form>
        <Link to="/register">
          <p>You do not have an account? Register</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
