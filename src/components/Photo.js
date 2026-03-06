import React, { useRef, useState, useEffect } from "react";
import { useSanityData } from "../hooks/useSanityData";
import dragElement from "../draggable";

const PERSONAL_INFO_QUERY =
  '*[_id == "personalInfo"][0] { instagramName, instagramUrl }';

function Photo(props) {
  const { data: personalInfo } = useSanityData(PERSONAL_INFO_QUERY);
  const instagramName = personalInfo?.instagramName || "leodayung0g";
  const instagramUrl =
    personalInfo?.instagramUrl || "https://www.instagram.com/leodayung0g/";
  const photoContainerRef = useRef();
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000));
  const [likeIcon, setLikeIcon] = useState("favorite_border");
  useEffect(() => {
    const interval = setInterval(() => {
      setLikes((prev) => prev + Math.floor(Math.random() * 10));
    }, 1000);

    dragElement(photoContainerRef.current);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLikes(Math.floor(Math.random() * 1000000));
    setLikeIcon("favorite_border");
  }, [props.url]);

  const handleLike = () => {
    if (likeIcon === "favorite") {
      setLikeIcon("favorite_border");
    } else {
      setLikeIcon("favorite");
    }
  };
  const handleComment = () => {
    document.getElementById("comment-txt").focus();
    props.showPhoto(false);
  };

  return (
    <div
      id="photo-container"
      ref={photoContainerRef}
      style={{ zIndex: props.zIndex }}
      onPointerDown={props.bringToFront}
    >
      <div id="photo-header">
        <div id="username">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            {instagramName}
          </a>
        </div>
        <button
          id="photo-exit"
          onClick={() => {
            props.showPhoto(false);
          }}
          aria-label="Close photo viewer"
        >
          <i className="material-icons">close</i>
        </button>
      </div>
      <img id="selected-photo" src={props.url} alt="Selected photo" />
      <div id="photo-data-container">
        <div id="photo-interact">
          <button id="like-button" onClick={handleLike} aria-label="Like photo">
            <i
              style={{ color: likeIcon === "favorite" ? "#a10202" : "white" }}
              className="material-icons"
            >
              {likeIcon}
            </i>
          </button>
          <button
            id="comment-button"
            onClick={handleComment}
            aria-label="Comment on photo"
          >
            <i className="material-icons">message</i>
          </button>
        </div>
        <div id="photo-analytics">
          Liked by{" "}
          <a
            href="https://www.instagram.com/kimkardashian/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            kimkardashian
          </a>{" "}
          and {likes} others
        </div>
        {props.caption && (
          <div id="photo-caption">
            <span style={{ fontWeight: "bold" }}>{instagramName}:</span>{" "}
            {props.caption}
          </div>
        )}
      </div>
    </div>
  );
}

export default Photo;
