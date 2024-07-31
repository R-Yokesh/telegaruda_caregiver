import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div class="loading">
      <svg height="96px" width="128px" viewBox="0 0 64 48">
        <polyline
          id="back"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        ></polyline>
        <polyline
          id="front"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        ></polyline>
      </svg>
    </div>
  );
};

export default Loader;
