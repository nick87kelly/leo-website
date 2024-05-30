import React, { useState } from "react";
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
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(false);
  const [photo, setPhoto] = useState(false);
  return (
    <div className="body" id="main-container">
      <HeaderSection></HeaderSection>
      <IconSection></IconSection>
      <LeftSection></LeftSection>
      <MainSection
        curr={currentTab}
        tabs={tabs}
        setUrl={setUrl}
        setTitle={setTitle}
        showPhoto={setPhoto}
        playVideo={setVideo}
      ></MainSection>
      <TabSection
        curr={currentTab}
        setCurr={setCurrentTab}
        tabs={tabs}
      ></TabSection>
      {video ? <Video url={url} title={title} playVideo={setVideo} /> : <></>}
      {photo ? <Photo url={url} showPhoto={setPhoto} /> : <></>}
    </div>
  );
};

export default App;
