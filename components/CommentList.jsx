"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; 
import CommentBox from './CommentBox';
import { base_api_url } from '../config/config';

const CommentList = ({ newsId, refresh, onCommentAdded }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${base_api_url}/api/comment/get/${newsId}`);
            setComments(res.data.comments || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        if (newsId) {
            fetchComments();
        }
    }, [newsId, refresh, fetchComments]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🗨️ Comments</h2>

            {comments.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet.</p>
            ) : (
                <div className="space-y-4">
                    {comments.map((c, i) => {
                        if (i < 4) {
                            return (
                                <div
                                    key={c._id}
                                    className="flex justify-center items-center  gap-3 border-b pb-2 border-gray-200"
                                >
                                    {/* Avatar */}
                                    <div className="text-gray-600 text-2xl">
                                        <FaUserCircle />
                                    </div>

                                    {/* Comment Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-semibold text-gray-800">
                                                {c.userName}
                                            </h4>
                                            {/* Optionally add date or time here */}
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1">{c.commentText}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            )}


             <div className='pt-2'>
                <CommentBox newsId={newsId} onCommentAdded={onCommentAdded}/>
            </div>
        </div>
    );
};

export default CommentList;
