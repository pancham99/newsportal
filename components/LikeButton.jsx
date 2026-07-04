"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { base_api_url } from "../config/config";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikeButton = ({ newsId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch initial like state
  useEffect(() => {
    if (!newsId) return;
    const fetchLikes = async () => {
      try {
        const url = user
          ? `${base_api_url}/api/like/${newsId}?userId=${user._id}`
          : `${base_api_url}/api/like/${newsId}`;
        const { data } = await axios.get(url);
        setLikeCount(data.likeCount || 0);
        setLiked(data.liked || false);
      } catch (err) {
        console.error("Fetch likes error:", err);
      }
    };
    fetchLikes();
  }, [newsId, user]);

  const handleToggle = async () => {
    if (!user) {
      router.push("/authPage");
      return;
    }
    if (loading) return;

    // Optimistic update
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikeCount((c) => (wasLiked ? c - 1 : c + 1));

    try {
      setLoading(true);
      const { data } = await axios.post(`${base_api_url}/api/like/toggle`, {
        newsId,
        userId: user._id,
      });
      // Sync with server response
      setLiked(data.liked);
      setLikeCount(data.likeCount);
    } catch (err) {
      // Revert on error
      setLiked(wasLiked);
      setLikeCount((c) => (wasLiked ? c + 1 : c - 1));
      console.error("Like toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition
        ${liked
          ? "bg-red-50 border-red-300 text-red-600"
          : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500"
        } disabled:opacity-70`}
      title={user ? (liked ? "Like हटाएं" : "Like करें") : "Like करने के लिए लॉगिन करें"}
    >
      {liked ? (
        <AiFillHeart className="text-red-500 text-lg" />
      ) : (
        <AiOutlineHeart className="text-lg" />
      )}
      <span>{likeCount > 0 ? likeCount : ""} {liked ? "Liked" : "Like"}</span>
    </button>
  );
};

export default LikeButton;
