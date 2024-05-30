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
  const ytArray = [
    "https://www.youtube.com/watch?v=BMx9TKez03E",
    "https://www.youtube.com/watch?v=ohf6Bva5jNA",
    "https://www.youtube.com/watch?v=ohf6Bva5jNA",
    "https://www.youtube.com/watch?v=2xXJpM2BoNE",
    "https://www.youtube.com/watch?v=2xXJpM2BoNE",
    "https://www.youtube.com/watch?v=5Pdjlu48Zr8",
    "https://www.youtube.com/watch?v=AjWSlrg21Yg",
    "https://www.youtube.com/watch?v=qkFVYFNp4sQ",
    "https://www.youtube.com/watch?v=SKjHMHsbvAQ",
    "https://www.youtube.com/watch?v=0Q99LJfdGVg",
    "https://www.youtube.com/watch?v=leOS709UPys",
  ];
  function handleVideoClick(t, yt, u) {
    props.playVideo(true);
    props.showPhoto(false);
    props.setTitle(t);
    props.setUrl(u);
    props.setYt(yt);
    Array.from(document.querySelectorAll(".file-name")).forEach(function (el) {
      el.classList.remove("active");
    });
    document.getElementById(t).classList.add("active");
  }
  function handlePhotoClick(u) {
    props.showPhoto(true);
    props.playVideo(false);
    props.setUrl(u);
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
                    ytArray[i],
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
