import { Dispatch, SetStateAction, useRef } from "react";
import { InteractionData, InteractionEvent } from "@pixi/interaction";
import { DisplayObject } from "pixi.js";
import type { Image } from "types";
import "@pixi/events";

interface Draggable extends DisplayObject {
  data:
    | (InteractionData & {
        imageId?: string;
      })
    | null;
  dragging: boolean;
}

const useSpriteDrag = ({
  setImages,
}: {
  setImages: Dispatch<SetStateAction<Image[]>>;
}) => {
  const pointerLocalX = useRef(0);
  const pointerLocalY = useRef(0);

  const onDragStart = (event: InteractionEvent, id: string) => {
    const container = event.currentTarget as Draggable;

    const localPos = event.data.getLocalPosition(container);

    pointerLocalX.current = localPos.x;
    pointerLocalY.current = localPos.y;

    container.alpha = 0.5;
    container.data = event.data;
    container.data.imageId = id;

    container.dragging = true;
  };
  const onDragMove = (event: InteractionEvent) => {
    const container = event.currentTarget as Draggable;

    if (container.dragging) {
      const newPosition = container.data?.getLocalPosition(container.parent);

      container.x = newPosition.x - pointerLocalX.current;

      container.y = newPosition.y - pointerLocalY.current;
    }
  };
  const onDragEnd = (event: InteractionEvent) => {
    const container = event.currentTarget as Draggable;
    container.alpha = 1;
    container.dragging = false;
    const { imageId } = container.data || {};

    if (imageId) {
      setImages((prev) =>
        prev.map((image) => {
          if (image.id === imageId) {
            image.x = container.x;

            image.y = container.y;
          }
          return image;
        })
      );
    }
    container.data = null;
    pointerLocalX.current = 0;
    pointerLocalY.current = 0;
  };

  return { handlers: { onDragStart, onDragEnd, onDragMove } };
};
export default useSpriteDrag;
