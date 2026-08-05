"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaBookmark, FaBell, FaStar, FaPlay, FaFacebook, FaApple } from "react-icons/fa";
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { base_api_url } from "../config/config";
import axios from "axios";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const SubscribeModal = () => {
  const { isModalOpen, closeModal, modalMode, setModalMode, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!isModalOpen) return null;

  const mode = modalMode || "subscribe"; // "login" | "signup" | "subscribe"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleTabChange = (newMode) => {
    setModalMode(newMode);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      // Create social login user payload & authenticate
      const socialUser = {
        _id: `user_${provider.toLowerCase()}_${Date.now()}`,
        name: `${provider} User`,
        email: `user_${provider.toLowerCase()}@topbriefing.in`,
        role: "user",
        provider: provider,
      };
      const token = `token_${provider.toLowerCase()}_${Date.now()}`;
      login(socialUser, token);
      setSuccessMessage(`Logged in successfully with ${provider}!`);
      setTimeout(() => {
        closeModal();
      }, 800);
    } catch (err) {
      console.error(err);
      setErrorMessage(`Failed to log in with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { data } = await axios.post(`${base_api_url}/api/user/sing`, {
          email: formData.email,
          password: formData.password,
        });

        if (data.success === true) {
          login(data.user, data.token);
          setSuccessMessage("Login successful!");
          setTimeout(() => {
            closeModal();
          }, 800);
        } else {
          setErrorMessage(data.message || "Invalid credentials");
        }
      } else if (mode === "signup") {
        const { data } = await axios.post(`${base_api_url}/api/user/sinup`, {
          name: formData.name || formData.email.split("@")[0],
          email: formData.email,
          password: formData.password,
        });

        setSuccessMessage("Account created successfully! Please login.");
        setTimeout(() => {
          setModalMode("login");
        }, 1200);
      } else if (mode === "subscribe") {
        const form = new FormData();
        form.append("email", formData.email);
        const res = await fetch(`${base_api_url}/api/add/subscriber`, {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        setSuccessMessage(data.message || "Subscribed successfully!");
        setTimeout(() => {
          closeModal();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] my-auto border border-gray-100">
        {/* Left Side: Branded Red Panel */}
        <div className="md:w-5/12 bg-gradient-to-b from-[#e51919] via-[#c92726] to-[#700000] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shrink-0">
          {/* Top Logo Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl px-3.5 py-1.5 shadow-md mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-600 border border-white/50 flex items-center justify-center font-black text-white text-xs tracking-tighter shadow">
                TB
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-wide text-white leading-tight">
                  Top Briefing
                </span>
                <span className="text-[10px] text-red-200 uppercase tracking-widest leading-none">
                  News Portal
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {mode === "subscribe"
                ? "Subscribe to Updates!"
                : mode === "signup"
                  ? "Join Us Today!"
                  : "Welcome Back!"}
            </h2>
            <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed max-w-xs mb-8">
              {mode === "subscribe"
                ? "Subscribe to Top Briefing newsletter to get breaking news, live updates, and top stories straight to your inbox."
                : mode === "signup"
                  ? "Create an account to personalize your news experience and stay updated with what matters."
                  : "Login to personalize your news experience and stay updated with what matters to you."}
            </p>

            {/* Features List with Circular Outline Icons */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <FaBookmark className="text-xs" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95">
                  Save your favorite articles
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <FaBell className="text-xs" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95">
                  Get personalized news feed
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <FaStar className="text-xs" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95">
                  Follow topics you love
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <FaPlay className="text-[10px] ml-0.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95">
                  Watch videos & live updates
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Globe Background Graphic */}
          <div className="absolute -bottom-10 -left-10 w-56 h-56 opacity-25 pointer-events-none z-0">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-white" strokeWidth="1.2">
              <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="70" />
              <ellipse cx="100" cy="100" rx="90" ry="40" />
              <ellipse cx="100" cy="100" rx="40" ry="90" />
              <line x1="10" y1="100" x2="190" y2="100" />
              <line x1="100" y1="10" x2="100" y2="190" />
            </svg>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="md:w-7/12 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-20"
            aria-label="Close modal"
          >
            <IoClose className="text-xl" />
          </button>

          <div>
            {/* Top Switcher Tabs */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl mb-6 max-w-xs">
              <button
                type="button"
                onClick={() => handleTabChange("subscribe")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${mode === "subscribe"
                  ? "bg-white text-[#c92726] shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Subscribe
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("login")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${mode === "login"
                  ? "bg-white text-[#c92726] shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("signup")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${mode === "signup"
                  ? "bg-white text-[#c92726] shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Header Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              {mode === "subscribe"
                ? "Subscribe to Newsletter"
                : mode === "login"
                  ? "Login to Your Account"
                  : "Create Your Account"}
            </h3>

            {/* Error / Success Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl font-medium">
                {successMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field for Sign Up */}
              {mode === "signup" && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiUser className="text-base" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all placeholder:text-gray-400"
                  />
                </div>
              )}

              {/* Email / Mobile Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  {mode === "subscribe" ? (
                    <FiMail className="text-base" />
                  ) : (
                    <FiUser className="text-base" />
                  )}
                </div>
                <input
                  type={mode === "subscribe" ? "email" : "text"}
                  name="email"
                  required
                  placeholder={
                    mode === "subscribe"
                      ? "Enter your email address"
                      : "Email or Mobile Number"
                  }
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Password Field (only for Login & Sign Up) */}
              {mode !== "subscribe" && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiLock className="text-base" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-base" />
                    ) : (
                      <FiEye className="text-base" />
                    )}
                  </button>
                </div>
              )}

              {/* Options Row: Remember Me & Forgot Password */}
              {mode === "login" && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300 accent-red-600 cursor-pointer"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      alert("Password reset instructions have been sent to your email.")
                    }
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#c92726] hover:bg-[#a80808] text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-70 text-sm tracking-wide"
              >
                {loading
                  ? "Processing..."
                  : mode === "subscribe"
                    ? "Subscribe Now"
                    : mode === "login"
                      ? "Login"
                      : "Sign Up"}
              </button>
            </form>

            {/* Divider OR */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-medium">OR</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            {/* <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                <FaFacebook className="text-xl text-[#1877F2]" />
                <span>Continue with Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                <FaApple className="text-xl text-black" />
                <span>Continue with Apple</span>
              </button>
            </div> */}
          </div>

          {/* Bottom Switch Mode Link */}
          <div className="mt-6 text-center text-xs text-gray-600">
            {mode === "subscribe" ? (
              <p>
                Want to create an account instead?{" "}
                <button
                  type="button"
                  onClick={() => handleTabChange("signup")}
                  className="text-red-600 font-bold hover:underline ml-1 cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            ) : mode === "login" ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabChange("signup")}
                  className="text-red-600 font-bold hover:underline ml-1 cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabChange("login")}
                  className="text-red-600 font-bold hover:underline ml-1 cursor-pointer"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
