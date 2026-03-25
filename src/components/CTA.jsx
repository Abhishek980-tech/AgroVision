import "../styles/cta.css";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <h2>Ready to protect your crops?</h2>
      <p>Join thousands of farmers improving yield with LeafVisionAI.</p>

      <button
        className="cta-btn"
        onClick={() => navigate("/signin")}
      >
        Get Started Free →
      </button>
    </section>
  );
}
