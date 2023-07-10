import { Dispatch, SetStateAction, useMemo } from "react";
import { FcDown, FcLeft, FcRefresh, FcRight, FcUp } from "react-icons/fc";

const PanButton = (props: {
  row: number;
  col: number;
  onClick: () => void;
  Icon: typeof FcDown;
}) => {
  const { onClick, Icon, col, row } = props;
  return (
    <div className={`row-start-${row} col-start-${col} aspect-square`}>
      <button className="btn" onClick={onClick}>
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
        Icon: FcUp,
        onClick: () =>
          setPosition((prev) => ({ ...prev, y: prev.y + 10 * zoom })),
      },
      {
        row: 2,
        col: 1,
        Icon: FcLeft,
        onClick: () => {
          setPosition((prev) => ({ ...prev, x: prev.x - 10 * zoom }));
        },
      },
      {
        row: 2,
        col: 2,
        Icon: FcRefresh,
        onClick: () => {
          setPosition({ x: 0, y: 0 });
        },
      },
      {
        row: 2,
        col: 3,
        Icon: FcRight,
        onClick: () => {
          setPosition((prev) => ({ ...prev, x: prev.x + 10 * zoom }));
        },
      },
      {
        row: 3,
        col: 2,
        Icon: FcDown,
        onClick: () => {
          setPosition((prev) => ({ ...prev, y: prev.y - 10 * zoom }));
        },
      },
    ],
    [setPosition, zoom]
  );

  return (
    <div className="grid grid-cols-3 gap-2">
      {directions.map((direction) => (
        <PanButton key={direction.row + "" + direction.col} {...direction} />
      ))}
    </div>
  );
};
export default Panel;
