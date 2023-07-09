import { Graphics } from "@pixi/react";
import "@pixi/events";

const MarkPoint = (props: {
  x: number;
  y: number;
  color?: string;
  zIndex: number;
  onClick?: (e: any) => void;
}) => {
  const { x, y, color = "0xffff0b", zIndex, onClick } = props;

  return (
    <Graphics
      zIndex={zIndex}
      draw={(g) => {
        g.clear();
        g.beginFill(color);
        g.drawCircle(x, y, 10);
        g.endFill();
      }}
      interactive={true}
      mousedown={(e) => {
        e.stopPropagation();
        onClick && onClick(e);
      }}
    />
  );
};

export default MarkPoint;
