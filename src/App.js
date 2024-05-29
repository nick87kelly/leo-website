import React, { useState } from "react";
import "./App.css";
import HeaderSection from "./components/HeaderSection";
import IconSection from "./components/IconSection";
import LeftSection from "./components/LeftSection";
import MainSection from "./components/MainSection";
import TabSection from "./components/TabSection";

const App = () => {
  const tabs = ["Videos", "Photos", "Contact"];
  const [currentTab, setCurrentTab] = useState("Videos");
  return (
    <div className="body" id="main-container">
      <HeaderSection></HeaderSection>
      <IconSection></IconSection>
      <LeftSection></LeftSection>
      <MainSection curr={currentTab} tabs={tabs}></MainSection>
      <TabSection
        curr={currentTab}
        setCurr={setCurrentTab}
        tabs={tabs}
      ></TabSection>
    </div>
  );
};

export default App;
