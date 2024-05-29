import React, { useState } from "react";
import FileComponent from "./FileComponent";
import Video from "./Video";
import Photo from "./Photo";

const MainSection = (props) => {
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(false);
  const [photo, setPhoto] = useState(false);
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
                    url={setUrl}
                    title={setTitle}
                    showPhoto={setPhoto}
                    playVideo={setVideo}
                    type="video"
                  />
                ) : tab === "Photos" ? (
                  <FileComponent
                    url={setUrl}
                    showPhoto={setPhoto}
                    playVideo={setVideo}
                    type="photo"
                  />
                ) : (
                  <>
                    {/* <div className="contact-filter-overlay"></div> */}
                    <video playsInline autoPlay muted loop id="myVideo">
                      <source
                        src={require("../assets/misc/bg7.mp4")}
                        type="video/mp4"
                      />
                    </video>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {video ? (
        <Video
          url={url}
          title={title}
          showPhoto={setPhoto}
          playVideo={setVideo}
        />
      ) : (
        <></>
      )}
      {photo ? (
        <Photo url={url} showPhoto={setPhoto} playVideo={setVideo} />
      ) : (
        <></>
      )}
    </>
  );
};

export default MainSection;
