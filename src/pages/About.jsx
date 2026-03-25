import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/about.css";

export default function About() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en"); 

  const content = {
    en: {
      title: "About LeafVision 🌱",
      subtitle:
      "LeafVision is a smart farming platform designed to help farmers easily detect diseases in tomato leaves using advanced AI technology. With just one photo, farmers can quickly understand the health of their crop, get accurate disease predictions, and receive simple treatment guidance. LeafVision also connects farmers to a community where they can learn from each other, share experiences, and improve crop productivity with confidence.",

      missionTitle: "🎯 Our Mission",
      missionText:
        "To help farmers protect crops using smart disease detection and simple guidance.",
      visionTitle: "🌍 Our Vision",
      visionText:
        "To make smart farming easy and affordable for every farmer in India.",
      whyTitle: "💡 Why Farmers Choose LeafVision?",
      whyList: [
        "✔ Easy to use",
        "✔ Instant disease detection",
        "✔ Clear treatment guidance",
        "✔ Farmer community support",
        "✔ Free to start",
      ],
      successTitle: "👨‍🌾 Farmer Success Stories",
      stories: [
        {
          name: "Ramesh, Maharashtra",
          img: "/ramesh.webp",
          story:
            "LeafVision saved my tomato crop by detecting disease early and giving the right treatment.",
        },
        {
          name: "Sunita, Karnataka",
          img: "/sunita.webp",
          story:
            "Very easy to use and very helpful. My plants became healthy again.",
        },
        {
          name: "Akash, Uttar Pradesh",
          img: "/akash.webp",
          story:
            "Through LeafVision I learned from other farmers and improved my yield.",
        },
      ],
      galleryTitle: "📸 Farming with LeafVision",
      cta: "Start Your Smart Farming Journey",
      button: "Get Started Free →",
    },

    hi: {
      title: "LeafVision के बारे में 🌱",
      subtitle:
  "LeafVision एक स्मार्ट खेती प्लेटफ़ॉर्म है जो किसानों को टमाटर की पत्तियों में होने वाली बीमारियों की पहचान करने में मदद करता है। केवल एक फोटो के माध्यम से किसान अपनी फसल की स्थिति समझ सकते हैं, सही बीमारी का पता लगा सकते हैं और आसान इलाज की जानकारी प्राप्त कर सकते हैं। AgroVision किसानों को एक-दूसरे से जुड़ने, अनुभव साझा करने और बेहतर उत्पादन करने का अवसर भी देता है।",

      missionTitle: "🎯 हमारा उद्देश्य",
      missionText:
        "किसानों की फसल को बीमारी से बचाना और सही समाधान देना हमारा उद्देश्य है।",
      visionTitle: "🌍 हमारा सपना",
      visionText:
        "हर किसान तक स्मार्ट खेती की तकनीक पहुँचाना।",
      whyTitle: "💡 किसान LeafVision क्यों चुनते हैं?",
      whyList: [
        "✔ इस्तेमाल में आसान",
        "✔ तुरंत बीमारी की पहचान",
        "✔ सही इलाज की जानकारी",
        "✔ किसान समुदाय का साथ",
        "✔ शुरू करना बिल्कुल मुफ्त",
      ],
      successTitle: "👨‍🌾 किसानों की सफलता की कहानियाँ",
      stories: [
        {
          name: "रमेश, महाराष्ट्र",
          img: "/ramesh.webp",
          story: "समय पर बीमारी पता चली और फसल बच गई।",
        },
        {
          name: "सुनीता, कर्नाटक",
          img: "/sunita.webp",
          story: "सही दवा मिली और खेती फिर से अच्छी हो गई।",
        },
        {
          name: "आकाश, उत्तर प्रदेश",
          img: "/akash.webp",
          story: "दूसरे किसानों से सीखकर मैंने अच्छा उत्पादन किया।",
        },
      ],
      galleryTitle: "📸 LeafVision के साथ खेती",
      cta: "आज ही स्मार्ट खेती शुरू करें",
      button: "मुफ्त शुरू करें →",
    },
  };

  const text = content[lang];

  return (
    <>
      <Navbar />

      <div className="about-page">

        {/* ✅ LANGUAGE TOGGLE */}
        <div className="lang-toggle">
          <button onClick={() => setLang("en")}>English</button>
          <button onClick={() => setLang("hi")}>हिंदी</button>
        </div>

        {/* ✅ HERO SECTION */}
        <div className="about-hero">
          <div className="about-left">
            <h1>{text.title}</h1>
            <p>{text.subtitle}</p>
            <button className="about-btn" onClick={() => navigate("/detect")}>
              {text.button}
            </button>
          </div>

          <div className="about-right">
            <img src="/img4.webp" alt="farming" />
          </div>
        </div>

        {/* ✅ MISSION */}
        <div className="about-section">
          <h2>{text.missionTitle}</h2>
          <p>{text.missionText}</p>
        </div>

        {/* ✅ WHY */}
        <div className="about-section soft-bg">
          <h2>{text.whyTitle}</h2>
          <ul className="about-list">
            {text.whyList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* ✅ SUCCESS STORIES */}
        <div className="about-section">
          <h2>{text.successTitle}</h2>

          <div className="about-grid">
            {text.stories.map((s, i) => (
              <div key={i} className="about-card">
                <img src={s.img} className="farmer-img" alt={s.name} />
                <h3>{s.name}</h3>
                <p>“{s.story}”</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ IMAGE GALLERY */}
        <div className="about-section">
          <h2>{text.galleryTitle}</h2>

          <div className="gallery-grid">
            <img src="/img1.webp" />
            <img src="/img2.jpg" />
            <img src="/img3.jpg" />
            <img src="/img4.webp" />
          </div>
        </div>

        {/* ✅ VISION */}
        <div className="about-section">
          <h2>{text.visionTitle}</h2>
          <p>{text.visionText}</p>
        </div>

        {/* ✅ CTA */}
        <div className="about-cta">
          <h2>{text.cta}</h2>
          <button onClick={() => navigate("/signin")}>
            {text.button}
          </button>
        </div>

      </div>
    </>
  );
}
