'use client';
import { useState } from 'react';
import parse from 'html-react-parser';

const NewsDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  const plainText = description ? description.replace(/<[^>]*>/g, '') : '';
  const shortText = plainText.slice(0, 300);

  return (
    <div className="prose max-w-none">
      {expanded ? parse(description || "") : `${shortText}...`}
      {!expanded && plainText.length > 300 && (
        <button
          className="text-red-600 font-semibold mt-2 ml-2 inline-block"
          onClick={() => setExpanded(true)}
        >
           और पढ़ें
        </button>
      )}
    </div>
  );
};

export default NewsDescription;
