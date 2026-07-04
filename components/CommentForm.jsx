"use client";

import CommentList from "./CommentList";
import LikeButton from "./LikeButton";

const CommentForm = ({ news }) => {
  const newsId = news?._id;

  if (!newsId) return null;

  return (
    <div className="w-full space-y-4">
      {/* Like button row */}
      <div className="flex items-center gap-3 pt-2">
        <LikeButton newsId={newsId} />
      </div>

      {/* Comments */}
      <CommentList newsId={newsId} />
    </div>
  );
};

export default CommentForm;
