import React, { useState, useEffect } from "react";

function Contact() {
  const contactLogo = require("../assets/misc/face.webm");
  const dnaLogo = require("../assets/misc/dna.webm");
  const defaultLogo = require("../assets/profilePics/default.png");
  const batteryLogo = require("../assets/misc/battery.png");
  const leftFp = require("../assets/misc/leftFingerprint.png");
  const rightFp = require("../assets/misc/rightFingerprint.png");
  const userIdLength = 10;
  const [userId, setUserId] = useState(
    "USR-" +
      [..."abcdefghijklmnopqrsuvwxyzABCDEFGHIJKLMNOPQRSUVWXYZ0123456789"]
        .map((e, i, a) => a[Math.floor(Math.random() * a.length)])
        .join("")
        .slice(0, userIdLength)
  );
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      var newChar = [
        ..."abcdefghijklmnopqrsuvwxyzABCDEFGHIJKLMNOPQRSUVWXYZ0123456789",
      ]
        .map((e, i, a) => a[Math.floor(Math.random() * a.length)])
        .join("")
        .slice(0, 1);
      var newIndex = Math.floor(Math.random() * userIdLength + 4);

      setUserId(
        (prev) =>
          prev.substring(0, newIndex) + newChar + prev.substring(newIndex + 1)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
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
        <div id="left-fingerprint">
          <div className="fingerprint-info">L</div>
          <img src={leftFp} className="fingerprint-img" alt="uh oh" />
        </div>
        <div id="right-fingerprint">
          <div className="fingerprint-info">R</div>
          <img src={rightFp} className="fingerprint-img" alt="uh oh" />
        </div>
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
        <div id="contact-random1">
          <div id="gender-title">sex:</div>
          <div className="gender" id="female-gender">
            F
          </div>
          <div className="gender" id="male-gender">
            M
          </div>
        </div>
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
