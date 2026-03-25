import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/bot.css";
import { useLocation } from "react-router-dom";

export default function AgriBot() {

  // ✅ GET DATA FROM DETECT PAGE
  const location = useLocation();
  const diseaseData = location.state;

  const [lang, setLang] = useState("en");

  const text = {
    en: {
      title: "🤖 AgriCure Bot",
      welcome: "🌱 Hello! I am AgriCure Bot. I can guide you about plant diseases and treatments.",
      hint: "🌾 Ask in Hindi or English • Use Voice 🎤 or Camera 📷",
      placeholder: "Ask in Hindi or English...",
      send: "Send",
      captured: "📸 Leaf image captured successfully!",
      failed: "❌ Bot failed. Try again."
    },
    hi: {
      title: "🤖 एग्रीक्योर बॉट",
      welcome: "🌱 नमस्ते! मैं आपको फसलों की बीमारियों और इलाज की जानकारी देता हूँ।",
      hint: "🌾 हिंदी या इंग्लिश में पूछें • आवाज़ 🎤 या कैमरा 📷 का उपयोग करें",
      placeholder: "यहाँ सवाल लिखें...",
      send: "भेजें",
      captured: "📸 पत्ती की फोटो सफलतापूर्वक ली गई!",
      failed: "❌ बॉट जवाब नहीं दे पाया।"
    }
  };

  const [messages, setMessages] = useState([
    { sender: "bot", text: text[lang].welcome }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ✅ AUTO PROMPT FROM DETECT PAGE
  useEffect(() => {
    if (diseaseData?.disease) {
      const autoQuestion = `I detected ${diseaseData.disease} with ${diseaseData.confidence}% confidence. What is the treatment?`;
      setInput(autoQuestion);
    }
  }, [diseaseData]);

  // 🎤 VOICE
  const recognitionRef = useRef(null);

  // 📷 CAMERA
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  // ===========================
  // ✅ SEND MESSAGE
  // ===========================
  const sendMessage = async (msg) => {
    if (!msg.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: msg }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await API.post("/bot", { message: msg });

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: res.data.reply }
        ]);
        setIsTyping(false);
      }, 900);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: text[lang].failed }
      ]);
      setIsTyping(false);
    }
  };

  // ✅ ENTER KEY SEND
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // ===========================
  // 🎤 VOICE INPUT
  // ===========================
  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setInput(voiceText);
      sendMessage(voiceText);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // ===========================
  // 📷 START CAMERA
  // ===========================
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (err) {
      alert("Camera permission denied");
    }
  };

  // ===========================
  // 📸 CAPTURE IMAGE
  // ===========================
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    setMessages(prev => [
      ...prev,
      { sender: "user", text: text[lang].captured }
    ]);

    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    setCameraOn(false);
  };

  return (
    <>
      <Navbar />

      <div className="chat-page">

        {/* ✅ LANGUAGE TOGGLE */}
        <div className="lang-toggle">
          <button onClick={() => setLang("en")}>EN</button>
          <button onClick={() => setLang("hi")}>हिंदी</button>
        </div>

        <h2>{text[lang].title}</h2>

        <div className="chat-window">
          <div className="bot-welcome">{text[lang].hint}</div>

          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.sender}`}>
              {m.text}
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg bot typing">
              <span>.</span><span>.</span><span>.</span>
            </div>
          )}
        </div>

        {/* 📷 CAMERA PREVIEW */}
        {cameraOn && (
          <div className="camera-box">
            <video ref={videoRef} autoPlay className="camera-view"></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

            <div className="camera-actions">
              <button onClick={captureImage}>📸 Capture</button>
              <button className="danger" onClick={() => setCameraOn(false)}>
                ❌ Close
              </button>
            </div>
          </div>
        )}

        {/* ✅ INPUT AREA */}
        <div className="chat-input">
          <button className="voice-btn" onClick={startVoice}>🎤</button>
          <button className="cam-btn" onClick={startCamera}>📷</button>

          <input
            type="text"
            placeholder={text[lang].placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button className="send-btn" onClick={() => sendMessage(input)}>
            {text[lang].send}
          </button>
        </div>
      </div>
    </>
  );
}
