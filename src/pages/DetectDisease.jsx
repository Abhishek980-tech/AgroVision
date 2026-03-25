import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/detect.css";
import { useNavigate } from "react-router-dom";
import remedies from "../remedies.json"; 

export default function DetectDisease() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [share, setShare] = useState(true);
  const [result, setResult] = useState(null);
  const [remedy, setRemedy] = useState(null); 
  const [lang, setLang] = useState("en");

  const model = "MobileNetV2";
  const nav = useNavigate();
  const fileInputRef = useRef();

  const text = {
    en: {
      title: "Disease Detection",
      sub: "Upload a tomato leaf image to detect plant diseases using AI.",
      uploadTitle: "Upload Image",
      uploadSub: "Click the box to upload",
      detectTitle: "Detection Results",
      detectSub: "Your analysis will appear here",
      noResult: "No Analysis Yet",
      noResultSub: "Upload an image and click Analyze Image.",
      share: "Share to Community",
      shareSub: "Allow your predictions to appear publicly.",
      analyze: "Analyze Image",
      know: "Know More",
      alert: "Please upload an image first.",
      cause: "Cause",
      cure: "How to Cure"
    },
    hi: {
      title: "बीमारी पहचान",
      sub: "AI की मदद से टमाटर की पत्तियों की बीमारी पहचानें।",
      uploadTitle: "चित्र अपलोड करें",
      uploadSub: "अपलोड करने के लिए क्लिक करें",
      detectTitle: "पहचान परिणाम",
      detectSub: "आपका परिणाम यहाँ दिखेगा",
      noResult: "अभी कोई परिणाम नहीं",
      noResultSub: "चित्र अपलोड करें और विश्लेषण करें।",
      share: "समुदाय में साझा करें",
      shareSub: "आपका परिणाम सभी को दिखेगा।",
      analyze: "जांच करें",
      know: "और जानें",
      alert: "कृपया पहले एक चित्र अपलोड करें।",
      cause: "कारण",
      cure: "इलाज"
    },
  };

  const handleFileChange = (e) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;
    setFile(uploaded);
    setPreview(URL.createObjectURL(uploaded));
  };

  // ✅ MAIN ANALYZE FUNCTION (WITH REMEDIES CONNECTED)
  const handleAnalyze = async () => {
    if (!file) return alert(text[lang].alert);

    try {
      const form = new FormData();
      form.append("image", file);
      form.append("model", model);
      form.append("share", share);

      const res = await API.post("/predictions/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data.prediction);

      
      const diseaseName = res.data.prediction.disease;
      const diseaseRemedy = remedies[diseaseName];
      setRemedy(diseaseRemedy);

    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please sign in first");
        nav("/signin");
      } else {
        alert(err.response?.data?.message || "Prediction failed");
      }
    }
  };

  const handleKnowMore = () => {
    nav("/bot", {
      state: {
        disease: result?.disease,
        confidence: result?.confidence,
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="detect-page">

        {/* ✅ LANGUAGE TOGGLE */}
        <div className="lang-toggle">
          <button onClick={() => setLang("en")}>EN</button>
          <button onClick={() => setLang("hi")}>हिंदी</button>
        </div>

        <h1>{text[lang].title}</h1>
        <p className="detect-sub">{text[lang].sub}</p>

        <div className="detect-top-grid">

          {/* ✅ UPLOAD CARD */}
          <div className="upload-card">
            <h3>{text[lang].uploadTitle}</h3>
            <p className="card-sub">{text[lang].uploadSub}</p>

            <div
              className="upload-box"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {preview ? (
                <img src={preview} alt="preview" style={{ width: "100%", borderRadius: "14px" }} />
              ) : (
                <>
                  <div className="upload-icon">⬆️</div>
                  <p className="upload-text">Click to upload</p>
                  <p className="upload-sub">JPG, PNG, WebP allowed</p>
                </>
              )}
            </div>
          </div>

          {/* ✅ RESULT CARD */}
          <div className="results-card">
            <h3>{text[lang].detectTitle}</h3>
            <p className="card-sub">{text[lang].detectSub}</p>

            <div className="results-box">
              {result ? (
                <>
                  <img src={result.imageUrl} alt="Result" style={{ width: "100%", borderRadius: "14px" }} />
                  <h3 style={{ marginTop: "10px" }}>{result.disease}</h3>
                  <p>{result.confidence}% confidence</p>

                  ✅ REMEDY DISPLAY
                  {remedy && (
                    <div className="remedy-box" style={{ marginTop: "14px" }}>
                      <h4>🦠 {text[lang].cause}</h4>
                      <p>{remedy.description}</p>

                      <h4 style={{ marginTop: "10px" }}>✅ {text[lang].cure}</h4>
                      <ul style={{ paddingLeft: "18px" }}>
                        {remedy.actions.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="know-more-wrapper">
                    <button className="know-more-btn" onClick={handleKnowMore}>
                      {text[lang].know}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="results-icon">🧠</div>
                  <p className="results-title">{text[lang].noResult}</p>
                  <p className="results-text">{text[lang].noResultSub}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ✅ BOTTOM SECTION */}
        <div className="detect-bottom">
          <div className="model-section">
            <div className="share-toggle-row">
              <div>
                <p className="step-title">{text[lang].share}</p>
                <p className="step-text">{text[lang].shareSub}</p>
              </div>

              <div
                className={`toggle-switch ${share ? "on" : ""}`}
                onClick={() => setShare(!share)}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>

            <button className="analyze-btn" onClick={handleAnalyze}>
              {text[lang].analyze}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
