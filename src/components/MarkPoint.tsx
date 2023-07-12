import { Text } from "@pixi/react";
import { COLORS } from "constants";
import { MARKPOINT_SIZE } from "constants";
import { TextStyle } from "pixi.js";
import "@pixi/events";

const style = new TextStyle({ fontSize: MARKPOINT_SIZE });
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
      style={style}
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
