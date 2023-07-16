import { Text } from "@pixi/react";
import { FederatedEvent, TextStyle } from "pixi.js";
import "@pixi/events";
import { COLORS, MARKPOINT_SIZE } from "constant";

const style = new TextStyle({ fontSize: MARKPOINT_SIZE });
const MarkPoint = (props: {
  x: number;
  y: number;
  color?: string;
  isPressingWhiteSpace?: boolean;
  onClick?: (e: FederatedEvent) => void;
}) => {
  const {
    x,
    y,
    color = "yellow",
    onClick = () => null,
    isPressingWhiteSpace,
  } = props;

  return (
    <Text
      style={style}
      text={COLORS[color]}
      x={x}
      y={y}
      anchor={0.5}
      interactive={!isPressingWhiteSpace}
      buttonMode={true}
      mousedown={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      cursor="pointer"
    />
  );
};

export default MarkPoint;
