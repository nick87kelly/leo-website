import React, { useState, useEffect, useRef } from "react";

const LeftSection = () => {
  const [comments, setComments] = useState([
    "This video is on repeat! Can't get enough!",
    "2024 and still a bop!",
    "Who else is here from TikTok?",
    "This deserves way more views!",
    "Instantly added to my playlist!",
    "Anyone else addicted to this?",
    "Hard! How do I download this?",
  ]);

  const profilePics = [
    "boy.jpg",
    "man.jpg",
    "man2.jpg",
    "woman.jpg",
    "man3.jpg",
    "man4.jpg",
    "girl.jpg",
  ];
  const profileNames = [
    "notacop123",
    "tapped_in777",
    "ItsYeBoi68",
    "vibin_n_thrivin",
    ".oopsie.doopsie",
    "broken_dream_club",
    "guap.guru",
  ];

  const [inputValue, setInputValue] = useState("");
  const [rendered, setRendered] = useState(false);
  const lastComment = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const commentHandle = (c) => {
    setComments([...comments, c]);
    setInputValue("");
  };
  const scrollToBottom = () => {
    lastComment.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (rendered) {
      scrollToBottom();
    }
  }, [comments]);

  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <div id="left-section">
      <div className="body" id="left-body">
        {comments.map((e, i) => (
          <div
            ref={i == comments.length - 1 ? lastComment : null}
            key={i}
            className="post"
          >
            <img
              className="profile-pic"
              src={
                i < profilePics.length
                  ? require(`../assets/profilePics/${profilePics[i]}`)
                  : require("../assets/profilePics/default.png")
              }
            />
            <div className="post-details">
              <p className="username">
                {i < profileNames.length ? profileNames[i] : "user_unknown"}
              </p>
              <p className="postText">{comments[i]}</p>
            </div>
          </div>
        ))}
      </div>
      <div id="comment-section">
        <input
          id="comment-txt"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={(e) =>
            e.key === "Enter" || e.keyCode === 13
              ? commentHandle(inputValue)
              : null
          }
          placeholder="What's on your mind?"
        ></input>
        <button
          id="comment-btn"
          onClick={() => (inputValue != "" ? commentHandle(inputValue) : null)}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
