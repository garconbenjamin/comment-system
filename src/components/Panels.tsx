import { Dispatch, SetStateAction, useMemo } from "react";
import { useState } from "react";
import {
  MdArrowBack,
  MdArrowDownward,
  MdArrowForward,
  MdArrowUpward,
  MdZoomInMap,
} from "react-icons/md";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type PanelsProps = {
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setUsername: Dispatch<SetStateAction<string>>;
  zoom: number;
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
      <button className="btn w-full h-full" onClick={onClick}>
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
    <div className="grid grid-cols-3">
      {directions.map((direction) => (
        <PanButton key={direction.row + "" + direction.col} {...direction} />
      ))}
    </div>
  );
};

const Panels = (props: PanelsProps) => {
  const { setPosition, zoom, setUsername } = props;
  const [userNameInput, setUserNameInput] = useState("");

  const [showPanel, setShowPanel] = useState(false);

  return (
    <div
      className={
        "transform transition fixed right-0 top-0 bottom-0 bg-slate-300 shadow-md ease-in-out duration-500 " +
        (showPanel ? "translate-x-0" : "translate-x-full")
      }
    >
      <div className="relative px-4">
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
