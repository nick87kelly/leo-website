import React, { useState } from "react";
import { useSanityData } from "../hooks/useSanityData";
import videoLogo from "../assets/misc/videoLogo.png";
import videoLogoFlash from "../assets/misc/flash.png";

const VIDEO_QUERY = `*[_type == "videoDocument"] | order(orderRank asc) {
  _id, title, fileName, "videoUrl": videoFile.asset->url, youtubeLink, orderRank
}`;

const PHOTO_QUERY = `*[_type == "photoDocument"] | order(orderRank asc) {
  _id, "imageUrl": image.asset->url, caption, orderRank
}`;

function FileComponent(props) {
  const query = props.type === "video" ? VIDEO_QUERY : PHOTO_QUERY;
  const { data, loading, error } = useSanityData(query);
  const [activeFile, setActiveFile] = useState(null);

  function handleVideoClick(t, yt, u) {
    props.playVideo(true);
    props.setTitle(t);
    props.setUrl(u);
    props.setYt(yt);
    if (props.bringToFront) props.bringToFront();
    setActiveFile(t);
  }

  function handlePhotoClick(u, c) {
    props.showPhoto(true);
    props.setUrl(u);
    if (props.setCaption) props.setCaption(c || "");
    if (props.bringToFront) props.bringToFront();
    setActiveFile(null);
  }

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  if (error) {
    return <div className="error-state">Unable to load content</div>;
  }

  return props.type === "video" ? (
    <>
      <div id="file-outer-container">
        <video playsInline autoPlay muted loop className="bgVideo">
          <source src={require("../assets/misc/bg10.mp4")} type="video/mp4" />
        </video>
        {data.length === 0 ? (
          <div className="empty-state">No videos yet</div>
        ) : (
          <ul id="file-inner-container">
            {data.map((video) => (
              <li key={video._id} className="file">
                <div
                  className="file-icon-container"
                  role="button"
                  tabIndex={0}
                  aria-label={`Play video ${video.fileName}`}
                  onClick={() => {
                    handleVideoClick(
                      video.title,
                      video.youtubeLink,
                      video.videoUrl,
                    );
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleVideoClick(
                        video.title,
                        video.youtubeLink,
                        video.videoUrl,
                      );
                    }
                  }}
                >
                  <div id="video-icon-holder">
                    <img
                      className="video-logo"
                      src={videoLogo}
                      alt="Video file icon"
                    ></img>
                    <img
                      className="video-logo-flash"
                      src={videoLogoFlash}
                      alt="Video file icon flash"
                    ></img>
                  </div>

                  <div
                    className={
                      "file-name" +
                      (activeFile === video.title ? " active" : "")
                    }
                  >
                    {video.fileName}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  ) : props.type === "photo" ? (
    <div id="file-outer-container">
      <video playsInline autoPlay muted loop className="bgVideo">
        <source src={require("../assets/misc/bg2.mp4")} type="video/mp4" />
      </video>
      {data.length === 0 ? (
        <div className="empty-state">No photos yet</div>
      ) : (
        <ul id="file-inner-container">
          {data.map((photo) => (
            <li key={photo._id} className="file">
              <div
                className="file-icon-container"
                role="button"
                tabIndex={0}
                aria-label={
                  photo.caption ? `View photo: ${photo.caption}` : "View photo"
                }
                onClick={() => {
                  handlePhotoClick(photo.imageUrl, photo.caption);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePhotoClick(photo.imageUrl, photo.caption);
                  }
                }}
              >
                <div className="image-outer-container">
                  <div className="image-inner-container">
                    <img
                      className="photo-logo"
                      loading="lazy"
                      src={photo.imageUrl}
                      alt={photo.caption || "Photo"}
                    ></img>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <></>
  );
}

export default FileComponent;
