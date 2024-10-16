import React, { useState } from "react";
import { signIn } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const SignIn = () => {
  const [sigInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...sigInData, [name]: value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!sigInData.email || !sigInData.password) {
      alert("all fields are required!!");
      return;
    }
    try {
      await signIn(sigInData);
      navigate("/");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSignInSubmit}>
        <div className="sub-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="please enter email"
            name="email"
            value={sigInData.email}
            onChange={handleChange}
          />
        </div>
        <div className="sub-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="please enter password"
            name="password"
            value={sigInData.password}
            onChange={handleChange}
          />
        </div>
        <button>SignIn</button>
      </form>
    </div>
  );
};

export default SignIn;
