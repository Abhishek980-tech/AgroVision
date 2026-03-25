import "../styles/hero.css";
import leafImg from "../assets/leaf.jpeg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          Protect Your Tomato Crops with <span>AI-Powered</span> Disease Detection
        </h1>

        <p>
          Upload images of your tomato leaves and get instant, accurate disease
          diagnosis. Improve crop health using advanced AI.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/signin")}
          >
            Get Started Free →
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="hero-card">
        <h3>Disease Detected</h3>
        <p className="analysis-text">Analysis Complete</p>

        <div className="image-box">
          <img src={leafImg} alt="leaf" className="hero-leaf-img" />
        </div>

        <div className="progress-area">
          <p className="disease-name">Late Blight</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "94%" }}
            ></div>
          </div>

          <p className="percent-text">94.5%</p>
        </div>

        <p className="recommend-text">
          ✔ Treatment recommendations available
        </p>
      </div>
    </section>
  );
}
