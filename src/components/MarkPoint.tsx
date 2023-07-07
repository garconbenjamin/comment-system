import { Graphics } from "@pixi/react";
import "@pixi/events";

const MarkPoint = (props: {
  x: number;
  y: number;
  color?: string;
  zIndex: number;
  onClick?: () => void;
}) => {
  const { x, y, color = "0xffff0b", zIndex } = props;

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
      pointerdown={(e) => {
        e.stopPropagation();
        console.log("mark", e);
      }}
    />
  );
};

export default MarkPoint;
