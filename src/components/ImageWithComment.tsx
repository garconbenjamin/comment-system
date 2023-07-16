import { Dispatch, SetStateAction } from "react";
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
    imageDialogs: Dialog[];
    setDialogs: SetDialogs;
    setImages: Dispatch<SetStateAction<Image[]>>;
    setCurrentDialogId: Dispatch<SetStateAction<string | null>>;
    enableMoveImage: boolean;
  }
) => {
  const {
    id,
    src,
    x,
    y,
    setImages,
    setDialogs,
    setCurrentDialogId,
    imageDialogs,
    enableMoveImage,
  } = props;
  const { handlers } = useSpriteDrag({ setImages });

  const handleAddMarkPoint = (event: InteractionEvent) => {
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
    setCurrentDialogId(dialogId);
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
        if (enableMoveImage) handlers.onDragStart(e, id);
      }}
      pointerup={enableMoveImage ? handlers.onDragEnd : undefined}
      pointerupoutside={enableMoveImage ? handlers.onDragEnd : undefined}
      pointermove={enableMoveImage ? handlers.onDragMove : undefined}
    >
      <Sprite
        image={src}
        interactive={!enableMoveImage}
        cursor="pointer"
        pointerdown={!enableMoveImage ? handleAddMarkPoint : undefined}
      />
      {imageDialogs.map(({ x, y, color, id }) => (
        <MarkPoint
          x={x}
          y={y}
          color={color}
          key={id}
          onClick={() => {
            setCurrentDialogId(id);
          }}
        />
      ))}
    </Container>
  );
};

export default ImageWithComment;
