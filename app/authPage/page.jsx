"use client";

import { useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";
import { base_api_url } from "../../config/config";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const { setUser , user} = useAuth();
  // console.log(user, "user")
  const router = useRouter()

  const handleLogin = async (form) => {
    try {
      const { data } = await axios.post(`${base_api_url}/api/user/sing`, form);
    //   toast.success("Login successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user) );
      if(data.success === true){
        router.push('/')
      }

    } catch (err) {
      console.error(err);
      // toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (form) => {
    try {
      const { data } = await axios.post(`${base_api_url}/api/user/sinup`, form);
      
    //   toast.success("Registration successful");
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      // toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className=" bg-gray-100 flex flex-col justify-center">
      {isLogin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Register onRegister={handleRegister} />
      )}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
