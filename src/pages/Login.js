// import "../styles/pages.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "../firebase";
import { useState } from "react";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Display success message using Toastify library
      toast.success("Login successfully", { autoClose: 5000 });
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="pages">
      <div className="from-container">
        <span>Login</span>
        {/* Form for user registration */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={() => setErr(false)}
          />

          <input
            type="password"
            placeholder="password atleast 8 letters"
            required
            onChange={() => setErr(false)}
          />
          <button>Login</button>
        </form>
        {err && (
          <small style={{ color: "red", marginTop: "10px" }}>
            Invalid user or password
          </small>
        )}
        {/* Option to navigate to the register page if the user don't has an account */}
        <span className="small">
          Don't have a account ? <Link to="/register">Register</Link>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
