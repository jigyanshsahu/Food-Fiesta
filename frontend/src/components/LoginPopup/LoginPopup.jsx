import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import { useToast } from "../../context/ToastContext";
import axios from "axios";

const LoginPopup = ({ setShowlogin }) => {
  const { url, settoken } = useContext(StoreContext);
  const toast = useToast();
  const [currentstate, setcurrentstate] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const oncChangeHandler = (event) => {
    const { name, value } = event.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const onlogin = async (event) => {
    event.preventDefault();
    if (loading) return;

    let newUrl = url;
    if (currentstate === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      setLoading(true);
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        settoken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowlogin(false);
        toast.success(currentstate === 'Login' ? 'Welcome back! 👋' : 'Account created! 🎉');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup__overlay" onClick={() => setShowlogin(false)} />
      
      <form onSubmit={onlogin} className="login-popup__container animate-scale-in">
        <div className="login-popup__header">
          <h2 className="login-popup__title">
            {currentstate === "Sign-Up" ? "Create Account" : "Login"}
          </h2>
          <button 
            type="button"
            className="login-popup__close-btn" 
            onClick={() => setShowlogin(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="login-popup__inputs">
          {currentstate === "Sign-Up" && (
            <div className="login-popup__input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={oncChangeHandler}
                value={data.name}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="login-popup__input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={oncChangeHandler}
              value={data.email}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login-popup__input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={oncChangeHandler}
              value={data.password}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button type="submit" className="login-popup__submit-btn" disabled={loading}>
          {loading ? "Please wait..." : currentstate === "Sign-Up" ? "Sign Up" : "Sign In"}
        </button>

        <div className="login-popup__condition">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the <span>Terms & Privacy Policy</span></label>
        </div>

        <div className="login-popup__footer">
          {currentstate === "Login" ? (
            <p>
              New here?{" "}
              <span className="login-popup__toggle" onClick={() => setcurrentstate("Sign-Up")}>
                Create an account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span className="login-popup__toggle" onClick={() => setcurrentstate("Login")}>
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
