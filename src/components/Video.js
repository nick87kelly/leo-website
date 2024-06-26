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
  const handlePausePlay = () => {
    if (pausePlayIcon === "stop") {
      videoRef.current.pause();
      setPausePlayIcon("play_arrow");
    } else {
      videoRef.current.play();
      setPausePlayIcon("stop");
    }
  };
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [resizeLogo, setResizeLogo] = useState("expand_more");
  const [width, setWidth] = useState("0");
  const [canPlay, setCanPlay] = useState(false);
  const [pausePlayIcon, setPausePlayIcon] = useState("stop");

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

  const handleVolume = (e) => {
    videoRef.current.volume = e.target.value / 100;
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
          if (resizeLogo === "expand_more") {
            handleResize();
          }
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
        <input
          id="vol-control"
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue="100"
          onChange={handleVolume}
          onInput={handleVolume}
        ></input>
        <button title="YouTube" id="yt-button" onClick={handleYoutube}>
          <i className="material-symbols-outlined">youtube_activity</i>
        </button>
        <button
          title="Pause/Play"
          id="pause-play-button"
          onClick={handlePausePlay}
        >
          <i className="material-icons">{pausePlayIcon}</i>
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
