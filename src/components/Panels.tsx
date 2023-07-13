import { Dispatch, SetStateAction, useMemo } from "react";
import { useState } from "react";
import {
  MdArrowBack,
  MdArrowDownward,
  MdArrowForward,
  MdArrowUpward,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineImage,
  MdOutlineMessage,
  MdZoomInMap,
} from "react-icons/md";

type PanelsProps = {
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setUsername: Dispatch<SetStateAction<string>>;
  zoom: number;
  enableDragImage: boolean;
  setEnableDragImage: Dispatch<SetStateAction<boolean>>;
};
type PanButtonProps = {
  row: number;
  col: number;
  onClick: () => void;
  Icon: typeof MdArrowBack;
};

const PanButton = (props: PanButtonProps) => {
  const { onClick, Icon, col, row } = props;
  return (
    <div
      className="aspect-square"
      style={{
        gridRowStart: row,
        gridColumnStart: col,
      }}
    >
      <button className="btn w-full h-full bg-white" onClick={onClick}>
        <Icon size={36} />
      </button>
    </div>
  );
};

const MovingPanel = ({
  setPosition,
  zoom,
}: Pick<PanelsProps, "setPosition" | "zoom">) => {
  const directions = useMemo(
    () => [
      {
        row: 1,
        col: 2,
        Icon: MdArrowUpward,
        onClick: () =>
          setPosition((prev) => ({ ...prev, y: prev.y + 10 * zoom })),
      },
      {
        row: 2,
        col: 1,
        Icon: MdArrowBack,
        onClick: () => {
          setPosition((prev) => ({ ...prev, x: prev.x - 10 * zoom }));
        },
      },
      {
        row: 2,
        col: 2,
        Icon: MdZoomInMap,
        onClick: () => {
          setPosition({ x: 0, y: 0 });
        },
      },
      {
        row: 2,
        col: 3,
        Icon: MdArrowForward,
        onClick: () => {
          setPosition((prev) => ({ ...prev, x: prev.x + 10 * zoom }));
        },
      },
      {
        row: 3,
        col: 2,
        Icon: MdArrowDownward,
        onClick: () => {
          setPosition((prev) => ({ ...prev, y: prev.y - 10 * zoom }));
        },
      },
    ],
    [setPosition, zoom]
  );

  return (
    <div className="grid grid-cols-3 gap-1">
      {directions.map((direction) => (
        <PanButton key={direction.row + "" + direction.col} {...direction} />
      ))}
    </div>
  );
};

const Panels = (props: PanelsProps) => {
  const {
    setPosition,
    zoom,
    setUsername,
    setEnableDragImage,
    enableDragImage,
  } = props;
  const [userNameInput, setUserNameInput] = useState("");

  const [showPanel, setShowPanel] = useState(true);

  return (
    <div
      className={
        "transform transition fixed right-0 top-0 bottom-0 bg-slate-300 shadow-md ease-in-out duration-500 " +
        (showPanel ? "translate-x-0" : "translate-x-full")
      }
    >
      <div className="relative px-4 pt-4 flex flex-col gap-y-4">
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

        <div className="flex bg-white rounded-lg overflow-hidden text-gray-400">
          <button
            className={
              "flex-grow py-4 btn rounded-none " +
              (enableDragImage ? "" : "bg-slate-400 text-black")
            }
            onClick={() => setEnableDragImage(false)}
          >
            <MdOutlineMessage size={20} />
          </button>
          <button
            className={
              "flex-grow py-4 btn rounded-none " +
              (enableDragImage ? "bg-slate-400 text-black" : "")
            }
            onClick={() => setEnableDragImage(true)}
          >
            <MdOutlineImage size={20} />
          </button>
        </div>
        <div>
          <input
            placeholder="username"
            value={userNameInput}
            onChange={(e) => setUserNameInput(e.target.value)}
          />
          <button
            onClick={() => {
              setUsername(userNameInput);
              setUserNameInput("");
            }}
            disabled={!userNameInput}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panels;
