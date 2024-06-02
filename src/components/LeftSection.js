import React, { useState, useEffect, useRef } from "react";

const LeftSection = () => {
  const [comments, setComments] = useState([
    "Keep em comin' 🔥🔥",
    "Who else is here from TikTok?",
    "Omm we back at it like we never left, stop playing wit bro",
    "this too hard 😂😂",
    "🆙 NOW",
    "Ouwee😂😂",
    "Let's make it viral 🎉🔥",
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
    "tapped_in43",
    "ItsYeBoi02",
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
              alt="uh oh"
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
