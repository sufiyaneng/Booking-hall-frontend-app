import React, { useState } from "react";
import { signUp } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const SignUp = () => {
  const [sigupData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...sigupData, [name]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!sigupData.username || !sigupData.email || !sigupData.password) {
      alert("all fields are required!!");
      return;
    }
    try {
      await signUp(sigupData);
      navigate("/signin");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSignUpSubmit}>
        <div className="sub-container">
          <label>UserName</label>
          <input
            type="text"
            placeholder="please enter name"
            name="username"
            value={sigupData.username}
            onChange={handleChange}
          />
        </div>
        <div className="sub-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="please enter email"
            name="email"
            value={sigupData.email}
            onChange={handleChange}
          />
        </div>
        <div className="sub-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="please enter password"
            name="password"
            value={sigupData.password}
            onChange={handleChange}
          />
        </div>
        <button>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
