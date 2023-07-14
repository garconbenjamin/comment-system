import { useRef } from "react";
import { InteractionData, InteractionEvent } from "@pixi/interaction";
import { DisplayObject } from "pixi.js";
import "@pixi/events";

interface Draggable extends DisplayObject {
  data: InteractionData | null;
  dragging: boolean;
}

const useSpriteDrag = () => {
  const pointerLocalX = useRef(0);
  const pointerLocalY = useRef(0);

  const onDragStart = (event: InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    const localPos = event.data.getLocalPosition(sprite);

    pointerLocalX.current = localPos.x;
    pointerLocalY.current = localPos.y;

    sprite.alpha = 0.5;
    sprite.data = event.data;
    sprite.dragging = true;
  };

  const onDragEnd = (event: InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.data = null;
    pointerLocalX.current = 0;
    pointerLocalY.current = 0;
  };

  const onDragMove = (event: InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    if (sprite.dragging) {
      const newPosition = sprite.data!.getLocalPosition(sprite.parent);

      sprite.x = newPosition.x - pointerLocalX.current;
      sprite.y = newPosition.y - pointerLocalY.current;
    }
  };

  return { handlers: { onDragStart, onDragEnd, onDragMove } };
};
export default useSpriteDrag;
