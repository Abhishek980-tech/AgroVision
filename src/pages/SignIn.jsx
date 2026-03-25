import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("en"); // ✅ Language State
  const nav = useNavigate();

  const text = {
    en: {
      title: "Welcome Back 👋",
      email: "Email",
      password: "Password",
      btn: "Sign In",
      noAcc: "Don’t have an account?",
      create: "Create one",
    },
    hi: {
      title: "वापस आपका स्वागत है 👋",
      email: "ईमेल",
      password: "पासवर्ड",
      btn: "लॉग इन करें",
      noAcc: "कोई अकाउंट नहीं है?",
      create: "नया बनाएं",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="signin-container">

      {/* ✅ LANGUAGE TOGGLE */}
      <div className="lang-toggle">
        <button onClick={() => setLang("en")}>EN</button>
        <button onClick={() => setLang("hi")}>हिंदी</button>
      </div>

      <div className="signin-card">
        <h2>{text[lang].title}</h2>

        <form onSubmit={handleSubmit}>
          <label>{text[lang].email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>{text[lang].password}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn">
            {text[lang].btn}
          </button>
        </form>

        <p className="go-register">
          {text[lang].noAcc}{" "}
          <span onClick={() => nav("/register")} className="register-link">
            {text[lang].create}
          </span>
        </p>
      </div>
    </div>
  );
}
