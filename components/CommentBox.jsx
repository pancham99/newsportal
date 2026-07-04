"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { base_api_url } from "../config/config";

const CommentBox = ({ newsId, onCommentAdded }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/authPage");
      return;
    }

    if (!commentText.trim()) {
      setError("कमेंट खाली नहीं हो सकता");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post(`${base_api_url}/api/comment/add`, {
        newsId,
        userId: user._id,
        userName: user.name,
        commentText: commentText.trim(),
      });
      setCommentText("");
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      setError("कमेंट पोस्ट नहीं हो सका, दोबारा कोशिश करें");
      console.error("Comment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={commentText}
        onChange={(e) => { setCommentText(e.target.value); setError(""); }}
        placeholder={user ? "अपना कमेंट लिखें..." : "कमेंट करने के लिए लॉगिन करें"}
        rows={3}
        disabled={!user}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
                   resize-none outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100
                   disabled:bg-gray-50 disabled:cursor-not-allowed transition"
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      <div className="flex items-center justify-between mt-2">
        {!user && (
          <button
            type="button"
            onClick={() => router.push("/authPage")}
            className="text-xs text-red-600 underline"
          >
            लॉगिन / रजिस्टर करें
          </button>
        )}
        <button
          type="submit"
          disabled={!user || loading}
          className="ml-auto px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg
                     hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "पोस्ट हो रहा है..." : "कमेंट करें"}
        </button>
      </div>
    </form>
  );
};

export default CommentBox;
