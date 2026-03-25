import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("en"); // ✅ Language State
  const nav = useNavigate();

  const text = {
    en: {
      title: "Create Account 🌱",
      name: "Full Name",
      email: "Email",
      password: "Password",
      btn: "Register",
      haveAcc: "Already have an account?",
      signin: "Sign In",
    },
    hi: {
      title: "नया अकाउंट बनाएँ 🌱",
      name: "पूरा नाम",
      email: "ईमेल",
      password: "पासवर्ड",
      btn: "रजिस्टर करें",
      haveAcc: "पहले से अकाउंट है?",
      signin: "लॉग इन करें",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-container">

      {/* ✅ LANGUAGE TOGGLE */}
      <div className="lang-toggle">
        <button onClick={() => setLang("en")}>EN</button>
        <button onClick={() => setLang("hi")}>हिंदी</button>
      </div>

      <div className="register-card">
        <h2>{text[lang].title}</h2>

        <form onSubmit={handleSubmit}>
          <label>{text[lang].name}</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button type="submit" className="register-btn">
            {text[lang].btn}
          </button>
        </form>

        <p className="go-signin">
          {text[lang].haveAcc}{" "}
          <span onClick={() => nav("/signin")} className="signin-link">
            {text[lang].signin}
          </span>
        </p>
      </div>
    </div>
  );
}
