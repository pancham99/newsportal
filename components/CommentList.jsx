"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import CommentBox from "./CommentBox";
import { base_api_url } from "../config/config";
import moment from "moment";

const CommentList = ({ newsId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${base_api_url}/api/comment/get/${newsId}`);
      setComments(data.comments || []);
    } catch (err) {
      console.error("Fetch comments error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newsId) fetchComments();
  }, [newsId]);

  const handleDelete = async (commentId) => {
    if (!user) return;
    try {
      await axios.delete(`${base_api_url}/api/comment/delete/${commentId}`, {
        data: { userId: user._id },
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  const displayed = showAll ? comments : comments.slice(0, 4);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mt-6">
      {/* Header */}
      <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        🗨️ कमेंट्स
        {comments.length > 0 && (
          <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
            {comments.length}
          </span>
        )}
      </h2>

      {/* Comment list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 py-2">
          अभी तक कोई कमेंट नहीं। पहले कमेंट करें!
        </p>
      ) : (
        <div className="space-y-4">
          {displayed.map((c) => (
            <div key={c._id} className="flex gap-3 border-b border-gray-50 pb-3 last:border-0">
              <FaUserCircle className="text-gray-400 text-2xl shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-800 truncate">
                    {c.userName}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-gray-400">
                      {moment(c.createdAt).fromNow()}
                    </span>
                    {/* Delete — only for comment owner */}
                    {user && user._id === c.userId?.toString() && (
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-gray-300 hover:text-red-500 transition"
                        title="Delete"
                      >
                        <FaTrash size={11} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">{c.commentText}</p>
              </div>
            </div>
          ))}

          {/* Show more / less */}
          {comments.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-red-600 font-medium hover:underline mt-1"
            >
              {showAll ? "कम दिखाएं ▲" : `और ${comments.length - 4} कमेंट देखें ▼`}
            </button>
          )}
        </div>
      )}

      {/* Comment box */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <CommentBox newsId={newsId} onCommentAdded={fetchComments} />
      </div>
    </div>
  );
};

export default CommentList;
