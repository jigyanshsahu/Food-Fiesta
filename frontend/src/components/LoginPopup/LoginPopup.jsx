import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./loginpopup.css";
import { StoreContext } from "../../context/Storecontext";   // IMPORTANT FIX
import axios from "axios";

const Loginpopup = ({ setShowlogin }) => {

  const { url, settoken } = useContext(StoreContext);

  const [currentstate, setcurrentstate] = useState("Login");

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

    let newUrl = url;

    // Correct login/register selection
    if (currentstate === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const Response = await axios.post(newUrl, data);

      if (Response.data.success) {
        settoken(Response.data.token);
        localStorage.setItem("token", Response.data.token);
        setShowlogin(false);
      } else {
        alert(Response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="Login-popup cursor-pointer gap-2 absolute z-10 w-full h-full grid">
      <form onSubmit={onlogin} className="loginpopupcontainer">
        
        <div className="loginpopuptitle">
          <h2 className="text-2xl text-black">
            {currentstate === "Sign-Up" ? "Sign-Up" : "Login"}
          </h2>

          <img
            className="relative left-24 bottom-8 cursor-pointer"
            onClick={() => setShowlogin(false)}
            src={assets.cancel}
            alt="close"
          />
        </div>

        <div className="loginpopupinput flex flex-col gap-3 p-4 rounded transition-all duration-300">

          {currentstate === "Sign-Up" && (
            <input
              name="name"
              type="text"
              onChange={oncChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
              className="border p-2 rounded"
            />
          )}

          <input
            type="email"
            name="email"
            onChange={oncChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
            className="border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            onChange={oncChangeHandler}
            value={data.password}
            placeholder="Password"
            required
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-red-400 w-full py-3 text-2xl font-bold text-black rounded-2xl"
        >
          {currentstate === "Sign-Up" ? "Create Account" : "Login"}
        </button>

        <div className="loginpopupcondition flex gap-2 mt-2">
          <input type="checkbox" required />
          <p className="text-black">By continuing, I agree to the terms and privacy policy.</p>
        </div>

        {currentstate === "Login" ? (
          <p className="mt-2">
            Create a new account?{" "}
            <span
              className="hover:underline cursor-pointer"
              onClick={() => setcurrentstate("Sign-Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-2">
            Already have an account?{" "}
            <span
              className="hover:underline cursor-pointer"
              onClick={() => setcurrentstate("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;
