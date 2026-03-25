import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/community.css";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [lang, setLang] = useState("en"); // ✅ Language State
  const user = JSON.parse(localStorage.getItem("user"));

  const text = {
    en: {
      title: "Community Forum",
      sub: "Browse predictions shared by the LeafVisionAI community.",
      comments: "Comments",
      noComments: "No comments yet",
      placeholder: "Add a comment...",
      alertEmpty: "Comment cannot be empty",
      alertLogin: "Please sign in first",
      model: "Model",
    },
    hi: {
      title: "समुदाय मंच",
      sub: "LeafVisionAI समुदाय द्वारा साझा किए गए अनुमान देखें।",
      comments: "टिप्पणियाँ",
      noComments: "अभी कोई टिप्पणी नहीं",
      placeholder: "टिप्पणी लिखें...",
      alertEmpty: "टिप्पणी खाली नहीं हो सकती",
      alertLogin: "कृपया पहले लॉग इन करें",
      model: "मॉडल",
    },
  };

  // ✅ Load shared predictions
  useEffect(() => {
    API.get("/predictions/shared").then((res) => {
      setPosts(res.data.predictions);
    });
  }, []);

  // ✅ Add comment to a post
  const handleAddComment = async (postId) => {
    if (!commentInput.trim()) return alert(text[lang].alertEmpty);
    if (!user) return alert(text[lang].alertLogin);

    try {
      const res = await API.post(`/predictions/comment/${postId}`, {
        text: commentInput,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: res.data.comments } : p
        )
      );

      setCommentInput("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <>
      <Navbar />

      <div className="community-page">

        {/* ✅ LANGUAGE TOGGLE */}
        <div className="lang-toggle">
          <button onClick={() => setLang("en")}>EN</button>
          <button onClick={() => setLang("hi")}>हिंदी</button>
        </div>

        <h1>{text[lang].title}</h1>
        <p className="comm-sub">{text[lang].sub}</p>

        <div className="post-list">
          {posts.map((p) => (
            <div key={p._id} className="post-card">

              {/* USER HEADER */}
              <div className="post-header">
                <div className="avatar-circle">
                  {p.userId?.name?.substring(0, 2).toUpperCase()}
                </div>

                <div>
                  <p className="post-user">{p.userId?.name}</p>
                  <p className="post-time">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <img src={p.imageUrl} alt="" className="post-image" />

              {/* META */}
              <div className="post-meta-row">
                <span className="confidence-badge">
                  {p.confidence}% confidence
                </span>
              </div>

              {/* BODY */}
              <div className="post-body">
                <p className="post-disease">{p.disease}</p>
                <p className="post-model">
                  {text[lang].model}: {p.model}
                </p>
              </div>

              {/* COMMENTS */}
              <div className="comments-section">
                <h4 className="comment-title">{text[lang].comments}</h4>

                <div className="comment-list">
                  {p.comments?.length > 0 ? (
                    p.comments.map((c, index) => (
                      <div key={index} className="comment-item">
                        <span className="comment-user">
                          {c.user?.name || "User"}:
                        </span>
                        <span className="comment-text">{c.text}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-comments">
                      {text[lang].noComments}
                    </p>
                  )}
                </div>

                {/* ADD COMMENT */}
                <div className="comment-input-row">
                  <input
                    type="text"
                    placeholder={text[lang].placeholder}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button onClick={() => handleAddComment(p._id)}>➤</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
