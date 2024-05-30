import React, { useRef, useState, useEffect } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import dragElement from "../draggable";

function Video(props) {
  const videoContainerRef = useRef();
  const videoRef = useRef();
  const visualizerRef = useRef();
  const handleYoutube = () => {
    window.open(props.yt, "_blank");
    return false;
  };
  const handlePlay = () => {
    videoRef.current.play();
  };
  const handlePause = () => {
    videoRef.current.pause();
  };
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [resizeLogo, setResizeLogo] = useState("expand_less");
  const [width, setWidth] = useState("0");
  const [canPlay, setCanPlay] = useState(false);

  const handleProgress = (e) => {
    setProgress((e.target.currentTime / e.target.duration) * 100);
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  const handleResize = () => {
    if (resizeLogo === "expand_less") {
      setWidth("0");
      setResizeLogo("expand_more");
    } else {
      setWidth("90%");
      setResizeLogo("expand_less");
    }
  };

  useEffect(() => {
    new AudioMotionAnalyzer(visualizerRef.current, {
      source: videoRef.current,
      ansiBands: false,
      showScaleX: false,
      bgAlpha: 0,
      overlay: true,
      mode: 1,
      frequencyScale: "log",
      showPeaks: false,
      smoothing: 0.7,
      ledBars: true,
      gradient: "orangered",
      reflexRatio: 0.4,
      reflexAlpha: 0.5,
      reflexBright: 1,
    });
    dragElement(videoContainerRef.current);
  }, []);

  useEffect(() => {
    videoRef.current?.load();
  }, [props.url]);

  return (
    <div id="video-container" ref={videoContainerRef}>
      <div id="video-header">
        <div id="video-title">{props.title}</div>
        <div id="video-header-controls">
          <button id="video-resize" onClick={handleResize}>
            <i className="material-icons">{resizeLogo}</i>
          </button>
          <button
            id="video-exit"
            onClick={() => {
              Array.from(document.querySelectorAll(".file-name")).forEach(
                function (el) {
                  el.classList.remove("active");
                }
              );
              props.playVideo(false);
            }}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
      {!canPlay && <p id="video-loader">Loading...</p>}
      <video
        style={{ width: width }}
        id="video"
        playsInline
        loop
        autoPlay
        onTimeUpdate={handleProgress}
        ref={videoRef}
        onCanPlayThrough={() => {
          setCanPlay(true);
          setWidth("90%");
        }}
      >
        <source src={props.url} />
      </video>
      <div id="video-data-container">
        <div id="visualizer-container" ref={visualizerRef}></div>

        <div id="video-data">
          {isNaN(duration)
            ? ""
            : Math.floor(currentTime / 60) +
              ":" +
              (Math.floor(currentTime % 60) < 10 ? "0" : "") +
              Math.floor(currentTime % 60) +
              " / " +
              Math.floor(duration / 60) +
              ":" +
              (Math.floor(duration % 60) < 10 ? "0" : "") +
              Math.floor(duration % 60)}
        </div>
      </div>
      <div id="video-controls">
        <button title="YouTube" id="yt-button" onClick={handleYoutube}>
          <i className="material-symbols-outlined">youtube_activity</i>
        </button>
        <button title="Play" id="play-button" onClick={handlePlay}>
          <i className="material-icons">play_arrow</i>
        </button>
        <button title="Pause" id="pause-button" onClick={handlePause}>
          <i className="material-icons">stop</i>
        </button>
        <progress
          id="video-progress"
          max="100"
          value={isNaN(duration) ? 0 : progress}
        ></progress>
      </div>
    </div>
  );
}

export default Video;
