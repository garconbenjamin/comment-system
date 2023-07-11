import { Text } from "@pixi/react";
import { COLORS } from "constants";
import "@pixi/events";
const MarkPoint = (props: {
  x: number;
  y: number;
  color?: string;
  zIndex: number;
  onClick?: (e: any) => void;
}) => {
  const { x, y, zIndex, color = "yellow", onClick } = props;

  return (
    <Text
      text={COLORS[color]}
      x={x}
      y={y}
      zIndex={zIndex}
      interactive={true}
      mousedown={(e) => {
        e.stopPropagation();
        onClick && onClick(e);
      }}
    />
  );
};

export default MarkPoint;
