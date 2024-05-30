import React, { useEffect, useState, useRef } from "react";
const logo = require("../assets/misc/cameraAnim.webm");
const sparkle = require("../assets/misc/sparkle.png");
const defaultLogo = require("../assets/profilePics/default.png");

const IconSection = () => {
  const sparkleRef = useRef();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      sparkleRef.current.style.top = Math.random() * 80 + "%";
      sparkleRef.current.style.left = Math.random() * 80 + "%";
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="icon-section">
      <video
        id="icon"
        playsInline
        muted
        loop
        autoPlay
        onCanPlayThrough={() => {
          setLoader(false);
        }}
      >
        <source src={logo}></source>
      </video>
      <img ref={sparkleRef} src={sparkle} id="icon-sparkle" />
      <img
        src={defaultLogo}
        style={{ display: loader ? "block" : "none" }}
        id="default-loader"
      />
    </div>
  );
};

export default IconSection;
