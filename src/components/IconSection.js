import React, { useEffect, useRef } from "react";
const logo = require("../assets/misc/cameraAnim.webm");
const sparkle = require("../assets/misc/sparkle.png");

const IconSection = () => {
  const sparkleRef = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      sparkleRef.current.style.top = Math.random() * 80 + "%";
      sparkleRef.current.style.left = Math.random() * 80 + "%";
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="icon-section">
      <video id="icon" playsInline muted loop autoPlay>
        <source src={logo}></source>
      </video>
      <img ref={sparkleRef} src={sparkle} id="icon-sparkle" />
    </div>
  );
};

export default IconSection;
