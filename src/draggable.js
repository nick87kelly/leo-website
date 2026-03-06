export default function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const header = document.getElementById(elmnt.id + "header");

  if (header) {
    // If present, only drag from header
    header.addEventListener("mousedown", dragMouseDown);
    header.addEventListener("pointerdown", dragMouseDown);
  } else {
    // Otherwise, drag from anywhere inside the element
    elmnt.addEventListener("mousedown", dragMouseDown);
    elmnt.addEventListener("pointerdown", dragMouseDown);
  }

  function dragMouseDown(e) {
    e = e || window.event;

    // ✅ IMPORTANT: don't start dragging when interacting with video controls
    // This keeps range inputs/buttons fully functional.
    if (elmnt.id === "video-container") {
      const target = e.target;
      if (target && target.closest && target.closest("#video-controls")) {
        return;
      }
    }

    // Prevent text selection / scrolling while dragging
    e.preventDefault();

    // Get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("pointerup", closeDragElement);

    // Call a function whenever the cursor moves
    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("pointermove", elementDrag);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // Calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Set the element's new position
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("pointerup", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
    document.removeEventListener("pointermove", elementDrag);
  }

  // Optional: return cleanup if you ever want to detach listeners
  return () => {
    closeDragElement();
    if (header) {
      header.removeEventListener("mousedown", dragMouseDown);
      header.removeEventListener("pointerdown", dragMouseDown);
    } else {
      elmnt.removeEventListener("mousedown", dragMouseDown);
      elmnt.removeEventListener("pointerdown", dragMouseDown);
    }
  };
}
