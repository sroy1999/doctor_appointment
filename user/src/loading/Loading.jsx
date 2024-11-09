import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setShowLoading(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
        {
            showLoading ? (
                <div className="loader">
                    {/* Your loading spinner can be a simple CSS animation or a graphic */}
                    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (<div></div>)
        }
    </div>
  )
}

export default Loading;