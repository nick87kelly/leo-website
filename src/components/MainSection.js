import React from "react";
import FileComponent from "./FileComponent";
import Contact from "./Contact";

const MainSection = (props) => {
  return (
    <>
      <div id="main-section">
        <div className="body" id="main-body">
          {props.tabs.map(function (tab, i) {
            return (
              <div
                key={i}
                className="tab-content"
                id={tab + "-content"}
                style={{ display: props.curr === tab ? "block" : "none" }}
              >
                {tab === "Videos" ? (
                  <FileComponent
                    setUrl={props.setUrl}
                    setTitle={props.setTitle}
                    showPhoto={props.showPhoto}
                    playVideo={props.playVideo}
                    setYt={props.setYt}
                    type="video"
                  />
                ) : tab === "Photos" ? (
                  <FileComponent
                    setUrl={props.setUrl}
                    showPhoto={props.showPhoto}
                    playVideo={props.playVideo}
                    type="photo"
                  />
                ) : (
                  <Contact />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MainSection;
