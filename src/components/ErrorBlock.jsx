import React from 'react';

const ErrorBlock = ({ error, onRetry }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error occurred:</strong>
      <p className="block sm:inline">{error.message}</p>
      {onRetry && (
        <button
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorBlock;
