import { Dispatch, SetStateAction, useState } from "react";
import { InteractionEvent } from "@pixi/interaction";
import { Container, Sprite } from "@pixi/react";
import useSpriteDrag from "hooks/useSpriteDrag";
import { DisplayObject } from "pixi.js";
import type { Dialog, Image, SetDialogs } from "types";
import { v4 as uuid } from "uuid";
import "@pixi/events";
import MarkPoint from "components/MarkPoint";

const ImageWithComment = (
  props: Image & {
    zoom: { x: number; y: number };
    position: { x: number; y: number };
    setImages: Dispatch<SetStateAction<Image[]>>;
    currentDialogRef: React.MutableRefObject<Dialog | null>;
    dialogsActionRef: React.MutableRefObject<SetDialogs | null>;
  }
) => {
  const { id, src, x, y, setImages, zoom, position } = props;
  const { handlers } = useSpriteDrag({ setImages });
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const handleAddMarkPoint = (event: InteractionEvent) => {
    event.stopPropagation();
    const container = event.currentTarget as DisplayObject;
    const localPos = event.data.getLocalPosition(container);

    const dialogId = uuid();
    const dialog = {
      id: dialogId,
      x: localPos.x,
      y: localPos.y,
      comments: [],
      color: "yellow",
      imageId: id,
    };

    setDialogs((prev) => {
      if (prev.length > 0 && prev[prev.length - 1]?.comments.length === 0) {
        prev.pop();
      }
      return [...prev, dialog];
    });
  };

  return (
    <Container
      key={id}
      interactive
      x={x}
      y={y}
      pointerdown={(e) => {
        handleAddMarkPoint(e);
        handlers.onDragStart(e, id);
      }}
      pointerup={handlers.onDragEnd}
      pointerupoutside={handlers.onDragEnd}
      pointermove={handlers.onDragMove}
    >
      <Sprite image={src} interactive cursor="pointer" />
      {dialogs.map(({ x, y, color, id }) => (
        <MarkPoint x={x} y={y} color={color} key={id} />
      ))}
    </Container>
  );
};

export default ImageWithComment;
