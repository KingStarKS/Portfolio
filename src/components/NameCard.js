import React from "react";

const NameCard = () => {
  return (
    <>
      <div className="name-card-wrapper">
        <svg
          viewBox="0 0 600 200"
          xmlns="http://www.w3.org/2000/svg"
          className="name-svg"
        >
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="name-text"
          >
            KULDEEP SINGH
          </text>

          <text
            x="50%"
            y="80%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="subtitle-text"
          >
            
          </text>
        </svg>

        <style>{`
          body {
            margin: 0;
            background: #000;
            text-align: center;
          }

          .name-card-wrapper {
            display: inline-block;
            width: 100%;
            height: 100vh;
          }

          .name-svg {
            width: 80%;
            height: 100%;
          }

          .name-text {
            font-family: 'Brush Script MT', cursive, Arial, sans-serif;
            font-size: 48px;
            fill: none;
            stroke: white;
            stroke-width: 2px;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            letter-spacing: 4px;
            animation: draw 4s ease forwards;
          }

          .subtitle-text {
            font-family: Arial, sans-serif;
            font-size: 10px;
            fill: white;
            font-weight: normal;
          }

          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default NameCard;
