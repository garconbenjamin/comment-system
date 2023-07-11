import { Dispatch, SetStateAction, useMemo } from "react";
import {
  MdArrowBack,
  MdArrowDownward,
  MdArrowForward,
  MdArrowUpward,
  MdZoomInMap,
} from "react-icons/md";

const PanButton = (props: {
  row: number;
  col: number;
  onClick: () => void;
  Icon: typeof MdArrowBack;
}) => {
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

const Panel = ({
  setPosition,

  zoom,
}: {
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  zoom: number;
}) => {
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
export default Panel;
