import React from "react";

const TabSection = (props) => {
  function tabClick(e) {
    props.setCurr(e.target.id);
  }

  return (
    <div id="tab-container">
      {props.tabs.map(function (tab, i) {
        return (
          <div
            key={i}
            onClick={tabClick}
            className={"tab" + (props.curr === tab ? " active" : "")}
            id={tab}
            style={{
              marginBottom: "10px",
              height:
                props.curr === tab
                  ? "70%"
                  : `calc(30%/${props.tabs.length - 1} - ${
                      10 * (props.tabs.length - 1)
                    }px/${props.tabs.length - 1})`,
            }}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};

export default TabSection;
