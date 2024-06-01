import React, { useState, useEffect } from "react";

function Contact() {
  const contactLogo = require("../assets/misc/face.webm");
  const dnaLogo = require("../assets/misc/dna.webm");
  const defaultLogo = require("../assets/profilePics/default.png");
  const batteryLogo = require("../assets/misc/battery.png");
  const [userId, setUserId] = useState(
    "USR-" +
      [..."abcdefghijklmnopqrsuvwxyzABCDEFGHIJKLMNOPQRSUVWXYZ0123456789"]
        .map((e, i, a) => a[Math.floor(Math.random() * a.length)])
        .join("")
        .slice(0, 15)
  );
  const [loader, setLoader] = useState(true);
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setUserId(
  //         "USR-" +
  //           [..."abcdefghijklmnopqrsuvwxyzABCDEFGHIJKLMNOPQRSUVWXYZ0123456789"]
  //             .map((e, i, a) => a[Math.floor(Math.random() * a.length)])
  //             .join("")
  //             .slice(0, 15)
  //       );
  //     }, 200);

  //     return () => clearInterval(interval);
  //   }, []);
  return (
    <>
      {/* <video playsInline autoPlay muted loop id="myVideo">
        <source src={require("../assets/misc/bg7.mp4")} type="video/mp4" />
      </video> */}
      <div id="contact-main-container">
        <div id="contact-header">
          <div id="contact-name">LEONARDO GIRON</div>
          <img
            src={batteryLogo}
            style={{ height: "200%" }}
            id="contact-battery"
            alt="uh oh"
          />
        </div>
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
        <div id="contact-random2">
          <div id="contact-id-title">user-id:</div>
          <div id="contact-id-container">
            <div id="contact-id">{userId}</div>
          </div>
        </div>
        <div id="contact-random3">
          <video id="dna-icon" playsInline muted loop autoPlay>
            <source src={dnaLogo}></source>
          </video>
        </div>
        <div id="contact-random4"></div>
        <div id="contact-info"></div>
      </div>
    </>
  );
}

export default Contact;
