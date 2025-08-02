"use client";

import React, { useState } from 'react'
import CommentList from "../components/CommentList"
import CommentBox from "../components/CommentBox"

const CommentForm = ({ news }) => {
    const { _id: newsId } = news

    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh); // force reload
    };

    return (
        <div className='text-black w-full gap-5'>
            <CommentList newsId={newsId} refresh={refresh} onCommentAdded={handleRefresh}/>
        </div>
    )
}

export default CommentForm