import React, { useRef, useState, useEffect } from "react";
import dragElement from "../draggable";

function Photo(props) {
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
    <div id="photo-container" ref={photoContainerRef}>
      <div id="photo-header">
        <div id="username">
          <a
            href="https://www.instagram.com/leodayung0g_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            leodayung0g_
          </a>
        </div>
        <button
          id="photo-exit"
          onClick={() => {
            props.showPhoto(false);
          }}
        >
          <i className="material-icons">close</i>
        </button>
      </div>
      <img id="selected-photo" src={props.url} alt="uh oh" />
      <div id="photo-data-container">
        <div id="photo-interact">
          <button id="like-button" onClick={handleLike}>
            <i
              style={{ color: likeIcon === "favorite" ? "#a10202" : "white" }}
              className="material-icons"
            >
              {likeIcon}
            </i>
          </button>
          <button id="comment-button" onClick={handleComment}>
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
      </div>
    </div>
  );
}

export default Photo;
