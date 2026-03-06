import React, { useState, useRef, useCallback } from "react";
import "./App.css";
import HeaderSection from "./components/HeaderSection";
import IconSection from "./components/IconSection";
import LeftSection from "./components/LeftSection";
import MainSection from "./components/MainSection";
import TabSection from "./components/TabSection";
import Video from "./components/Video";
import Photo from "./components/Photo";

const App = () => {
  const tabs = ["Videos", "Photos", "Contact"];
  const [currentTab, setCurrentTab] = useState("Videos");
  const [videoUrl, setVideoUrl] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [yt, setYt] = useState("");
  const [caption, setCaption] = useState("");
  const zCounter = useRef(11);
  const [videoZ, setVideoZ] = useState(10);
  const [photoZ, setPhotoZ] = useState(10);
  const bringVideoToFront = useCallback(() => {
    zCounter.current += 1;
    setVideoZ(zCounter.current);
  }, []);
  const bringPhotoToFront = useCallback(() => {
    zCounter.current += 1;
    setPhotoZ(zCounter.current);
  }, []);
  return (
    <div className="body" id="main-container">
      <HeaderSection></HeaderSection>
      <IconSection></IconSection>
      <LeftSection></LeftSection>
      <MainSection
        curr={currentTab}
        tabs={tabs}
        setVideoUrl={setVideoUrl}
        setPhotoUrl={setPhotoUrl}
        setTitle={setTitle}
        showPhoto={setPhoto}
        playVideo={setVideo}
        setYt={setYt}
        setCaption={setCaption}
        bringVideoToFront={bringVideoToFront}
        bringPhotoToFront={bringPhotoToFront}
      ></MainSection>
      <TabSection
        curr={currentTab}
        setCurr={setCurrentTab}
        tabs={tabs}
      ></TabSection>
      {video ? (
        <Video
          url={videoUrl}
          title={title}
          yt={yt}
          playVideo={setVideo}
          zIndex={videoZ}
          bringToFront={bringVideoToFront}
        />
      ) : (
        <></>
      )}
      {photo ? (
        <Photo
          url={photoUrl}
          caption={caption}
          showPhoto={setPhoto}
          zIndex={photoZ}
          bringToFront={bringPhotoToFront}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
