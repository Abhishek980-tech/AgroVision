import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>LeafVisionAI</h3>
        <p>AI-powered plant disease detection.</p>
      </div>

      <div>
        <h4>Product</h4>
        <ul>
          <li>Features</li>
          <li>Pricing</li>
          <li>API</li>
        </ul>
      </div>

      <div>
        <h4>Resources</h4>
        <ul>
          <li>Documentation</li>
          <li>Blog</li>
          <li>Support</li>
        </ul>
      </div>

      <div>
        <h4>Legal</h4>
        <ul>
          <li>Privacy</li>
          <li>Terms</li>
        </ul>
      </div>
    </footer>
  );
}
