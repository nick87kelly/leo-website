import React from "react";
import videoLogo from "../assets/misc/videoLogo.png";
import videoLogoFlash from "../assets/misc/flash.png";

function FileComponent(props) {
  const imgTotal = 23;
  const videoArray = [
    "lazerDim700.mp4",
    "nettspend.mp4",
    "nettspend2.mp4",
    "shedTheory.mp4",
    "shedTheory2.mp4",
    "killxero-moxxxie.mp4",
    "freddieGibbs.mp4",
    "dog-cartierGod-ayeshaErotica.mp4",
    "sinCity-voices.mp4",
    "sinCity-getBack.mp4",
    "sinCity-flyAway.mp4",
  ];
  function handleVideoClick(t, u) {
    props.showPhoto(false);
    props.playVideo(true);
    props.title(t);
    props.url(u);
    Array.from(document.querySelectorAll(".file-name")).forEach(function (el) {
      el.classList.remove("active");
    });
    document.getElementById(t).classList.add("active");
  }
  function handlePhotoClick(u) {
    props.playVideo(false);
    props.showPhoto(true);
    props.url(u);
    Array.from(document.querySelectorAll(".file-name")).forEach(function (el) {
      el.classList.remove("active");
    });
  }

  return props.type === "video" ? (
    <>
      <div id="file-outer-container">
        <video playsInline autoPlay muted loop id="myVideo">
          <source src={require("../assets/misc/bg10.mp4")} type="video/mp4" />
        </video>
        <ul id="file-inner-container">
          {videoArray.map((e, i) => (
            <li key={i} className="file">
              <div
                className="file-icon-container"
                onClick={(e) => {
                  handleVideoClick(
                    videoArray[i],
                    require(`../assets/videos/${videoArray[i]}`)
                  );
                }}
              >
                <div id="video-icon-holder">
                  <img className="video-logo" src={videoLogo} alt="uh oh"></img>
                  <img
                    className="video-logo-flash"
                    src={videoLogoFlash}
                    alt="uh oh"
                  ></img>
                </div>

                <div id={videoArray[i]} className="file-name">
                  {videoArray[i]}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : props.type === "photo" ? (
    <div id="file-outer-container">
      <video playsInline autoPlay muted loop id="myVideo">
        <source src={require("../assets/misc/bg2.mp4")} type="video/mp4" />
      </video>
      <ul id="file-inner-container">
        {[...Array(imgTotal)].map((e, i) => (
          <li key={i} className="file">
            <div
              className="file-icon-container"
              onClick={(e) => {
                handlePhotoClick(require(`../assets/photos/${i + 1}.jpg`));
              }}
            >
              <div className="image-outer-container">
                <div className="image-inner-container">
                  <img
                    className="photo-logo"
                    src={require(`../assets/photos/${i + 1}.jpg`)}
                    alt="uh oh"
                  ></img>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
}

export default FileComponent;
