import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/profile.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [predictions, setPredictions] = useState([]);
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || null
  );
  const [lang, setLang] = useState("en"); // ✅ Language State

  const fileInputRef = useRef();

  const text = {
    en: {
      clickUpload: "Click on avatar to upload photo",
      predictions: "Predictions",
      myPreds: "My Predictions",
    },
    hi: {
      clickUpload: "फोटो अपलोड करने के लिए अवतार पर क्लिक करें",
      predictions: "अनुमान",
      myPreds: "मेरे अनुमान",
    },
  };

  useEffect(() => {
    if (!user) return;

    API.get(`/predictions/user/${user.id}`).then((res) => {
      setPredictions(res.data.predictions);
    });
  }, []);

  // ✅ HANDLE IMAGE FROM DEVICE
  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setProfilePic(imageURL);
    localStorage.setItem("profilePic", imageURL);
    window.location.reload(); // temporary save
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">

        {/* ✅ LANGUAGE TOGGLE */}
        <div className="lang-toggle">
          <button onClick={() => setLang("en")}>EN</button>
          <button onClick={() => setLang("hi")}>हिंदी</button>
        </div>

        <div className="profile-header">
          <div className="profile-banner"></div>

          <div className="profile-main">
            {/* ✅ PROFILE IMAGE WITH UPLOAD */}
            <div
              className="avatar-large profile-avatar-click"
              onClick={() => fileInputRef.current.click()}
              title={text[lang].clickUpload}
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="profile-avatar-img"
                />
              ) : (
                <>
                  {user?.name?.charAt(0)}
                  {user?.name?.charAt(1)}
                </>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                style={{ display: "none" }}
              />
            </div>

            <div>
              <h2>{user?.name}</h2>
              <p className="profile-email">{user?.email}</p>
              <p className="profile-hint">
                {text[lang].clickUpload}
              </p>
            </div>
          </div>

          <div className="profile-stats-row">
            <div className="profile-stat">
              <p className="stat-number">{predictions.length}</p>
              <p className="stat-label">
                {text[lang].predictions}
              </p>
            </div>
          </div>
        </div>

        <div className="profile-body">
          <h3>{text[lang].myPreds}</h3>

          <div className="profile-pred-grid">
            {predictions.map((p) => (
              <div key={p._id} className="profile-pred-card">
                <img
                  src={p.imageUrl}
                  alt=""
                  className="profile-pred-image"
                />

                <div className="profile-pred-bottom">
                  <span className="confidence-badge">
                    {p.confidence}% confidence
                  </span>

                  <p className="pred-disease">{p.disease}</p>

                  <p className="pred-time">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
