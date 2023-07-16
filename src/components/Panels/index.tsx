import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import ModePanel from "./ModePanel";
import MovingPanel from "./MovingPanel";
import { PanelsProps } from "./types";
import UserPanel from "./UserPanel";
import ZoomPanel from "./ZoomPanel";
const Panels = (props: PanelsProps) => {
  const {
    setPosition,
    setZoom,
    zoom,
    setUsername,
    setEnableMoveImage,
    enableMoveImage,
    username,
  } = props;

  const [showPanel, setShowPanel] = useState(true);

  return (
    <div
      className={
        "select-none transform transition fixed right-0 top-0 bg-slate-100 shadow-md ease-in-out duration-500 " +
        (showPanel ? "translate-x-0" : "translate-x-full")
      }
    >
      <div className="relative px-4 py-4 flex flex-col gap-y-4">
        <button
          className="absolute top-4 left-0 transform -translate-x-full text-white p-3 bg-slate-500 hover:bg-slate-400 transition"
          onClick={() => setShowPanel(!showPanel)}
        >
          {showPanel ? (
            <MdChevronRight size={30} />
          ) : (
            <MdChevronLeft size={30} />
          )}
        </button>

        <MovingPanel setPosition={setPosition} zoom={zoom} />
        <ZoomPanel setZoom={setZoom} zoom={zoom} />
        <ModePanel
          enableMoveImage={enableMoveImage}
          setEnableMoveImage={setEnableMoveImage}
        />
        <UserPanel username={username} setUsername={setUsername} />
      </div>
    </div>
  );
};

export default Panels;
