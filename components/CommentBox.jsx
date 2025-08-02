"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { base_api_url } from '../config/config';

const CommentBox = ({ newsId, onCommentAdded }) => {
  const { user } = useAuth();
  console.log(user)
  const router = useRouter();

  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');



  

  // Sync user info
  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserId(user._id);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Redirect if user not logged in
    if (!user) {
      router.push('/authPage'); // or '/login'
      return;
    }

    // ✅ Validate comment input
    if (!commentText.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    try {
      await axios.post(`${base_api_url}/api/comment/add`, {
        newsId,
        userName,
        userId,
        commentText,
      });

      setCommentText('');
      if (onCommentAdded) onCommentAdded(); // Refresh comment list
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mt-4">
      <textarea
        placeholder="Write a comment..."
        className="border p-2 w-full rounded mb-2"
        rows="3"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${user ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
      >
        {user ? "Post Comment" : "Login to Comment"}
      </button>
    </form>
  );
};

export default CommentBox;
