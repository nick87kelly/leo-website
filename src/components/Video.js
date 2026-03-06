import React, { useRef, useState, useEffect } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import dragElement from "../draggable";

function Video(props) {
  const videoContainerRef = useRef();
  const videoRef = useRef();
  const visualizerRef = useRef();
  const handleYoutube = () => {
    try {
      const url = new URL(props.yt);
      if (
        url.hostname === "www.youtube.com" ||
        url.hostname === "youtube.com" ||
        url.hostname === "youtu.be"
      ) {
        window.open(props.yt, "_blank", "noopener,noreferrer");
      }
    } catch {
      // Invalid URL, do nothing
    }
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
  const [resizeLogo, setResizeLogo] = useState("expand_less");
  const [width, setWidth] = useState("0");
  const [canPlay, setCanPlay] = useState(false);
  const [pausePlayIcon, setPausePlayIcon] = useState("stop");

  const handleProgress = (e) => {
    setProgress((e.target.currentTime / e.target.duration) * 100);
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  const handleResize = () => {
    if (resizeLogo === "expand_more") {
      setWidth("0");
      setResizeLogo("expand_less");
    } else {
      setWidth("90%");
      setResizeLogo("expand_more");
    }
  };

  const handleScrub = (e) => {
    const newTime = (e.target.value / 100) * duration;
    videoRef.current.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  const wasPlayingRef = useRef(false);

  const handleScrubStart = () => {
    wasPlayingRef.current = !videoRef.current.paused;
    videoRef.current.pause();
    setPausePlayIcon("play_arrow");
  };
  const handleScrubEnd = () => {
    if (wasPlayingRef.current) {
      videoRef.current.play();
      setPausePlayIcon("stop");
    }
  };

  const handleVolume = (e) => {
    videoRef.current.volume = e.target.value / 100;
  };

  useEffect(() => {
    const analyzer = new AudioMotionAnalyzer(visualizerRef.current, {
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
    return () => analyzer.destroy();
  }, []);

  useEffect(() => {
    videoRef.current?.load();
  }, [props.url]);

  return (
    <div
      id="video-container"
      ref={videoContainerRef}
      style={{ zIndex: props.zIndex }}
      onPointerDown={props.bringToFront}
    >
      <div id="video-header">
        <div id="video-title">{props.title}</div>
        <div id="video-header-controls">
          <button
            id="video-resize"
            onClick={handleResize}
            aria-label="Resize video player"
          >
            <i className="material-icons">{resizeLogo}</i>
          </button>
          <button
            id="video-exit"
            onClick={() => {
              props.playVideo(false);
            }}
            aria-label="Close video player"
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
        crossOrigin="anonymous"
        onTimeUpdate={handleProgress}
        ref={videoRef}
        onCanPlayThrough={() => {
          setCanPlay(true);
          if (resizeLogo === "expand_less") {
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
          aria-label="Volume control"
        ></input>
        <button
          title="YouTube"
          id="yt-button"
          onClick={handleYoutube}
          aria-label="Open on YouTube"
        >
          <i className="material-icons">smart_display</i>
        </button>
        <button
          title="Pause/Play"
          id="pause-play-button"
          onClick={handlePausePlay}
          aria-label="Pause or play video"
        >
          <i className="material-icons">{pausePlayIcon}</i>
        </button>
        <input
          id="video-progress"
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={isNaN(duration) ? 0 : progress}
          onChange={handleScrub}
          onInput={handleScrub}
          onPointerDown={handleScrubStart}
          onPointerUp={handleScrubEnd}
          onPointerCancel={handleScrubEnd}
          aria-label="Video progress"
          style={{ "--progress": `${isNaN(duration) ? 0 : progress}%` }}
        ></input>
      </div>
    </div>
  );
}

export default Video;
