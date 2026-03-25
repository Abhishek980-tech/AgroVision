import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [predictions, setPredictions] = useState([]);
  const [liveCount, setLiveCount] = useState(0);
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();

  const text = {
    en: {
      welcome: "Welcome back",
      live: "Live Monitoring Active",
      quick: "Quick Actions",
      start: "Start Detection →",
      livePred: "Live Predictions",
      auto: "Auto-updated every 10 sec",
      community: "Community",
      visit: "Visit Forum →",
      health: "Crop Health",
      overall: "Overall Crop Health",
      confidenceLive: "Prediction Confidence (Live)",
      distribution: "Disease Distribution",
      daily: "Daily Predictions",
      recent: "Your Recent Predictions",
      noPred: "No predictions yet",
      confText: "confidence",
      use: "How To Use",
      upload: "Upload Image",
      uploadSub: "Choose a clear tomato leaf photo.",
      analyze: "Analyze Leaf",
      analyzeSub: "AI identifies disease instantly.",
      view: "View Results",
      viewSub: "See prediction & confidence score.",
    },
    hi: {
      welcome: "वापसी पर स्वागत है",
      live: "लाइव मॉनिटरिंग चालू है",
      quick: "त्वरित कार्य",
      start: "डिटेक्शन शुरू करें →",
      livePred: "लाइव भविष्यवाणी",
      auto: "हर 10 सेकंड में अपडेट",
      community: "समुदाय",
      visit: "फोरम देखें →",
      health: "फसल स्वास्थ्य",
      overall: "कुल फसल स्वास्थ्य",
      confidenceLive: "भविष्यवाणी विश्वास (लाइव)",
      distribution: "रोग वितरण",
      daily: "दैनिक भविष्यवाणी",
      recent: "आपकी हाल की भविष्यवाणियाँ",
      noPred: "अभी तक कोई भविष्यवाणी नहीं",
      confText: "विश्वसनीयता",
      use: "कैसे उपयोग करें",
      upload: "छवि अपलोड करें",
      uploadSub: "स्पष्ट पत्ती की तस्वीर चुनें।",
      analyze: "विश्लेषण करें",
      analyzeSub: "एआई तुरंत रोग बताता है।",
      view: "परिणाम देखें",
      viewSub: "विश्वास स्कोर देखें।",
    },
  };

  useEffect(() => {
    if (!user) return;

    const fetchPredictions = async () => {
      const res = await API.get(`/predictions/user/${user.id}`);
      setPredictions(res.data.predictions);
      setLiveCount(res.data.predictions.length);
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 10000);
    return () => clearInterval(interval);
  }, []);

  const getHealthScore = () => {
    if (!predictions.length) return 0;
    const avg =
      predictions.reduce((sum, p) => sum + p.confidence, 0) /
      predictions.length;
    return Math.round(avg);
  };

  const healthScore = getHealthScore();

  const lineData = predictions.slice(-7).map((p, index) => ({
    name: `#${index + 1}`,
    confidence: p.confidence,
  }));

  const diseaseMap = {};
  predictions.forEach((p) => {
    diseaseMap[p.disease] = (diseaseMap[p.disease] || 0) + 1;
  });

  const pieData = Object.keys(diseaseMap).map((key) => ({
    name: key,
    value: diseaseMap[key],
  }));

  const dateMap = {};
  predictions.forEach((p) => {
    const date = new Date(p.createdAt).toLocaleDateString();
    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  const barData = Object.keys(dateMap).map((key) => ({
    date: key,
    count: dateMap[key],
  }));

  return (
    <>
      <Navbar />
      <div className="dashboard">

        {/* ✅ LANGUAGE TOGGLE */}
        <div className="lang-toggle">
          <button onClick={() => setLang("en")}>EN</button>
          <button onClick={() => setLang("hi")}>हिंदी</button>
        </div>

        <h1>
          {text[lang].welcome}, {user?.name}!
        </h1>

        <div className="live-status">
          <span className="live-dot"></span>
          {text[lang].live}
        </div>

        {/* ✅ TOP CARDS */}
        <div className="dash-cards-row">
          <div className="dash-card glass">
            <p className="dash-card-title">{text[lang].quick}</p>
            <button className="start-btn" onClick={() => navigate("/detect")}>
              {text[lang].start}
            </button>
          </div>

          <div className="dash-card glass">
            <p className="dash-card-title">{text[lang].livePred}</p>
            <p className="dash-card-main animate-pulse">{liveCount}</p>
            <p className="dash-card-sub">{text[lang].auto}</p>
          </div>

          <div className="dash-card glass">
            <p className="dash-card-title">{text[lang].community}</p>
            <button className="secondary-btn" onClick={() => navigate("/community")}>
              {text[lang].visit}
            </button>
          </div>

          <div className="dash-card glass">
            <p className="dash-card-title">{text[lang].health}</p>
            <div className="health-meter-wrapper">
              <svg width="160" height="100" viewBox="0 0 180 110">
                <path d="M10 100 A80 80 0 0 1 170 100" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                <path d="M10 100 A80 80 0 0 1 170 100" fill="none" stroke="#16a34a" strokeWidth="12" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - healthScore} />
                <text x="90" y="85" textAnchor="middle" fontSize="20" fontWeight="800" fill="#16a34a">
                  {healthScore}%
                </text>
              </svg>
              <p className="health-label">{text[lang].overall}</p>
            </div>
          </div>
        </div>

        {/* ✅ LIVE CHART */}
        <div className="chart-box glass">
          <h2>{text[lang].confidenceLive}</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
              >
                {pieData.map((_, i) => (
                  <Cell
                  key={i}
                  fill={[
                    "#16a34a",   // green
                    "#22c55e",   // light green
                    "#4ade80",   // mint
                    "#86efac",   // soft green
                    "#bbf7d0",   // pale green
                    "#34d399",   // teal green
                     ][i % 6]}
                     />
                     ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* ✅ PIE + BAR */}
        <div className="chart-grid">
          <div className="chart-box glass">
            <h2>{text[lang].distribution}</h2>
            <ResponsiveContainer width="100%" height={280}>
  <PieChart>
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>

    <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={95}
      innerRadius={45}
      paddingAngle={4}
      labelLine={false}
      label={({ name, percent }) =>
        `${name} ${(percent * 100).toFixed(0)}%`
      }
      filter="url(#shadow)"
      animationBegin={0}
      animationDuration={1200}
    >
      {pieData.map((_, i) => (
        <Cell
          key={i}
          fill={[
            "#16a34a", // rich green
            "#22c55e", // fresh green
            "#4ade80", // mint
            "#34d399", // teal
            "#86efac", // soft green
            "#10b981", // emerald
          ][i % 6]}
        />
      ))}
    </Pie>

    <Tooltip
      contentStyle={{
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #ddd",
        fontWeight: "600",
      }}
    />
  </PieChart>
</ResponsiveContainer>

          </div>

          <div className="chart-box glass">
            <h2>{text[lang].daily}</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ✅ ✅ ✅ RECENT PREDICTIONS RESTORED ✅ ✅ ✅ */}
        <div className="dash-bottom-grid">
          <div className="recent-box glass">
            <h2>{text[lang].recent}</h2>

            <div className="prediction-list">
              {predictions.length > 0 ? (
                predictions.map((p) => (
                  <div key={p._id} className="prediction-item">
                    <div className="prediction-left">
                      <img
                        src={p.imageUrl}
                        alt="leaf"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <p className="pred-disease">{p.disease}</p>
                        <p className="pred-meta">
                          {p.confidence}% {text[lang].confText}
                        </p>
                      </div>
                    </div>

                    <p className="pred-date">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ marginTop: "10px", color: "#777" }}>
                  {text[lang].noPred}
                </p>
              )}
            </div>
          </div>

          <div className="getstarted-box glass">
            <h2 className="how-title">{text[lang].use}</h2>

            <div className="how-steps">
              <div className="how-row">
                <div className="how-number">1</div>
                <div>
                  <p className="how-main">{text[lang].upload}</p>
                  <p className="how-sub">{text[lang].uploadSub}</p>
                </div>
              </div>

              <div className="how-row">
                <div className="how-number">2</div>
                <div>
                  <p className="how-main">{text[lang].analyze}</p>
                  <p className="how-sub">{text[lang].analyzeSub}</p>
                </div>
              </div>

              <div className="how-row">
                <div className="how-number">3</div>
                <div>
                  <p className="how-main">{text[lang].view}</p>
                  <p className="how-sub">{text[lang].viewSub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
