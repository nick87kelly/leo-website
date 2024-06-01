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
  const [age, setAge] = useState(0);
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

  useEffect(() => {
    const interval2 = setInterval(() => {
      var t1 = new Date();
      var t2 = new Date(2002, 0, 20);
      var dif = t1.getTime() - t2.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      var Seconds_Between_Dates = Math.floor(Math.abs(Seconds_from_T1_to_T2));
      setAge(Seconds_Between_Dates);
    }, 1000);
    return () => clearInterval(interval2);
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
        <div id="contact-gender">
          <div id="gender-title">sex:</div>
          <div className="gender" id="female-gender">
            F
          </div>
          <div className="gender" id="male-gender">
            M
          </div>
        </div>
        <div id="contact-userid">
          <div id="contact-id-title">user-id:</div>
          <div id="contact-id-container">
            <div id="contact-id">{userId}</div>
          </div>
        </div>
        <div id="contact-dna">
          <video id="dna-icon" playsInline muted loop autoPlay>
            <source src={dnaLogo}></source>
          </video>
        </div>
        <div id="contact-hr">
          <div className="heart-rate">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 150 73"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="#009B9E"
                points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
              />
            </svg>
            <div className="fade-in"> </div>
            <div className="fade-out"> </div>
          </div>
        </div>
        <div id="contact-info">
          <div id="contact-age-container" className="contact-details">
            <div id="contact-age-title" className="contact-title">
              age:
            </div>
            <div id="contact-age">
              {Math.floor(age / 31556952) +
                "y " +
                Math.floor((age % 31556952) / 2629746) +
                "m " +
                Math.floor(((age % 31556952) % 2629746) / 604800) +
                "w " +
                Math.floor((((age % 31556952) % 2629746) % 604800) / 86400) +
                "d " +
                Math.floor(
                  ((((age % 31556952) % 2629746) % 604800) % 86400) / 3600
                ) +
                "h " +
                Math.floor(
                  (((((age % 31556952) % 2629746) % 604800) % 86400) % 3600) /
                    60
                ) +
                "m " +
                Math.floor(
                  (((((age % 31556952) % 2629746) % 604800) % 86400) % 3600) %
                    60
                ) +
                "s"}
            </div>
          </div>
          <div id="contact-occupation-container" className="contact-details">
            <div id="contact-occupation-title" className="contact-title">
              occupation:
            </div>
            <div id="contact-occupation">Videographer</div>
          </div>
          <div id="contact-email-container" className="contact-details">
            <div id="contact-email-title" className="contact-title">
              email:
            </div>
            <div id="contact-email">
              <address>
                <a
                  href="mailto:leogiron075@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  leogiron075@gmail.com
                </a>
              </address>
            </div>
          </div>
          <div id="contact-instagram-container" className="contact-details">
            <div id="contact-instagram-title" className="contact-title">
              instagram:
            </div>
            <div id="contact-instagram">
              <a
                href="https://www.instagram.com/leodayung0g_/"
                target="_blank"
                rel="noopener noreferrer"
              >
                leodayung0g_
              </a>
            </div>
          </div>
          <div id="contact-youtube-container" className="contact-details">
            <div id="contact-youtube-title" className="contact-title">
              youtube:
            </div>
            <div id="contact-youtube">
              <a
                href="https://www.youtube.com/@leogiron02"
                target="_blank"
                rel="noopener noreferrer"
              >
                leogiron02
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
