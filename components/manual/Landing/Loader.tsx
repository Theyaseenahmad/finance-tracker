import React from "react";

const Loader: React.FC = () => {
  return (
    <svg height="100" width="100" className="loader  flex items-center justify-center">
      <circle
        className="dot animate-blink"
        cx="30%"
        cy="45%"
        r="8"
        fill="rgb(255, 228, 230)"  // Rose-100

        style={{ animationDelay: "0ms" }}
      />
      <circle
        className="dot animate-blink"
        cx="50%"
        cy="45%"
        r="8"
        fill="rgb(255, 228, 230)"  // Rose-100

        style={{ animationDelay: "250ms" }}
      />
      <circle
        className="dot animate-blink"
        cx="70%"
        cy="45%"
        r="8"
        fill="rgb(255, 228, 230)"  // Rose-100

        style={{ animationDelay: "500ms" }}
      />
    </svg>
  );
};

export default Loader;
