import React from 'react';

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      fill={index < rating ? 'red' : 'gray'}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M10 .25a.75.75 0 0 1 .673.418l2.55 5.951 6.355.546a.75.75 0 0 1 .416 1.279l-4.854 4.25 1.456 6.84a.75.75 0 0 1-1.088.827L10 16.69l-6.042 3.22a.75.75 0 0 1-1.088-.827l1.456-6.84-4.854-4.25a.75.75 0 0 1 .416-1.28l6.355-.545L9.327.668A.75.75 0 0 1 10 .25z"
      />
    </svg>
  ));

  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
