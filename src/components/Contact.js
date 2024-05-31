import React, { useState } from "react";

function Contact() {
  const contactLogo = require("../assets/misc/face.webm");
  const defaultLogo = require("../assets/profilePics/default.png");
  const [loader, setLoader] = useState(true);
  return (
    <>
      {/* <video playsInline autoPlay muted loop id="myVideo">
        <source src={require("../assets/misc/bg7.mp4")} type="video/mp4" />
      </video> */}
      <div id="contact-main-container">
        <div id="contact-header"></div>
        <div id="left-fingerprint"></div>
        <div id="right-fingerprint"></div>
        <div id="face-scan">
          <video
            id="contact-icon"
            playsInline
            muted
            loop
            autoPlay
            onCanPlayThrough={() => {
              setLoader(false);
            }}
          >
            <source src={contactLogo}></source>
          </video>
          <img
            src={defaultLogo}
            style={{ display: loader ? "block" : "none" }}
            className="default-loader"
            alt="uh oh"
          />
          <div id="face-scan-bar"></div>
        </div>
        <div id="contact-random1"></div>
        <div id="contact-random2"></div>
        <div id="contact-random3"></div>
        <div id="contact-random4"></div>
        <div id="contact-info"></div>
      </div>
    </>
  );
}

export default Contact;
