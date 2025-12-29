import React, { useState } from 'react';

function LinkCopy() {
  const [copied, setCopied] = useState(false);
  const link = "https://example.com/your-link";

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-between px-4 py-3 font-mono text-sm text-gray-800">
      <span className="truncate">{link}</span>
      <button
        onClick={handleCopy}
        className="ml-4 px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default LinkCopy;
