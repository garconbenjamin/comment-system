import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import "@pixi/events";
import { COLORS, MARKPOINT_SIZE } from "constant";

const style = new TextStyle({ fontSize: MARKPOINT_SIZE });
const MarkPoint = (props: {
  x: number;
  y: number;
  color?: string;
  onClick?: (e: any) => void;
}) => {
  const { x, y, color = "yellow", onClick = () => null } = props;

  return (
    <Text
      style={style}
      text={COLORS[color]}
      x={x}
      y={y}
      anchor={0.5}
      interactive={true}
      buttonMode={true}
      mousedown={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    />
  );
};

export default MarkPoint;
