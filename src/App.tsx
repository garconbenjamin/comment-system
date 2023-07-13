import { useEffect, useRef, useState } from "react";
import { Container, Sprite, Stage } from "@pixi/react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  INITIAL_IMAGE,
  INITIAL_UUID,
  INITIAL_ZOOM,
  MARKPOINT_SIZE,
  ZOOM_SPEED,
} from "constants";
import { throttle } from "lodash";
import { FederatedPointerEvent, Texture } from "pixi.js";
import type { Dialog, Image } from "types";
import { v4 as uuid } from "uuid";
import "@pixi/events";
import CommentsDialog from "components/CommentsDialog";
import MarkPoint from "components/MarkPoint";
import Panels from "components/Panels";

const App = () => {
  const [images, setImages] = useState<Image[]>([
    { src: INITIAL_IMAGE, x: 100, y: 100, id: INITIAL_UUID },
  ]);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [username, setUsername] = useState("Bob");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dialogs, setDialogs] = useState<Dialog[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPressingWhiteSpace, setIsPressingWhiteSpace] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [currentDialogId, setCurrentDialogId] = useState<string | null>(null);
  const [enableDragImage, setEnableDragImage] = useState(false);

  const mouseDownPositionRef = useRef(position);
  const prevPositionRef = useRef(position);
  const imagePositionRef = useRef<{ x: number; y: number }>();
  const dialogsRef = useRef(dialogs);

  const enableDrag = isMouseDown && isPressingWhiteSpace;
  const currentDialog = dialogs.find((dialog) => dialog.id === currentDialogId);

  const handleZoom = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (
      zoom + e.deltaY * ZOOM_SPEED >= 0.5 &&
      zoom + e.deltaY * ZOOM_SPEED <= 1.5
    )
      setZoom(zoom + e.deltaY * ZOOM_SPEED);
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    mouseDownPositionRef.current = {
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    };
    setIsMouseDown(true);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (enableDrag) {
      const { clientX, clientY } = e;

      setPosition({
        x:
          prevPositionRef.current.x +
          (clientX - mouseDownPositionRef.current.x),
        y:
          prevPositionRef.current.y +
          (clientY - mouseDownPositionRef.current.y),
      });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    mouseDownPositionRef.current = position;
    prevPositionRef.current = position;
  };

  const handleAddMarkPoint = (
    event: FederatedPointerEvent,
    imageId?: string
  ) => {
    if (!isPressingWhiteSpace) {
      event.stopPropagation();
      const { clientX, clientY } = event;
      const id = uuid();
      const dialog = {
        id,
        x: (clientX - position.x - MARKPOINT_SIZE / 2) / zoom,
        y: (clientY - position.y - MARKPOINT_SIZE / 2) / zoom,
        comments: [],
        color: "yellow",
        imageId,
      };
      setCurrentDialogId(id);
      setDialogs((prev) => {
        if (prev.length > 0 && prev[prev.length - 1]?.comments.length === 0) {
          prev.pop();
        }
        return [...prev, dialog];
      });
    }
  };

  const handleDialogOpen = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dialogId: string
  ) => {
    e.stopPropagation();
    setCurrentDialogId(dialogId);
  };

  const handleImagePointerDown = (
    e: FederatedPointerEvent,
    { id, x, y }: Pick<Image, "x" | "y" | "id">
  ) => {
    if (enableDragImage) {
      imagePositionRef.current = { x, y };
      dialogsRef.current = JSON.parse(JSON.stringify(dialogs));
    } else {
      handleAddMarkPoint(e, id);
    }
  };

  useEffect(() => {
    const handleResize = throttle(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 300);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!currentDialog) {
      setDialogs((prev) => {
        if (prev.length > 0 && prev[prev.length - 1]?.comments.length === 0) {
          prev.pop();
        }
        return [...prev];
      });
    }
  }, [currentDialog, setDialogs]);

  useEffect(() => {
    const handlePressWhiteSpace = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsPressingWhiteSpace(true);
      }
    };
    const handleLeaveWhiteSpace = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsPressingWhiteSpace(false);
      }
    };
    window.addEventListener("keydown", handlePressWhiteSpace);
    window.addEventListener("keyup", handleLeaveWhiteSpace);

    return () => {
      window.removeEventListener("keydown", handlePressWhiteSpace);
      window.removeEventListener("keyup", handleLeaveWhiteSpace);
    };
  }, []);

  return (
    <div className="overflow-hidden relative" style={{ width, height }}>
      <div>
        <Stage
          width={width}
          height={height}
          onWheel={throttle(handleZoom, 500)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <Container position={position} scale={{ x: zoom, y: zoom }}>
            <Sprite
              x={0}
              y={0}
              texture={Texture.WHITE}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              interactive
              onclick={(e) => !enableDragImage && handleAddMarkPoint(e)}
              zIndex={0}
            />
            {images.map(({ x, y, id, src }) => (
              <Sprite
                key={id}
                image={src}
                x={x}
                y={y}
                interactive={true}
                pointerdown={(e) => handleImagePointerDown(e, { x, y, id })}
                pointermove={(e) => {
                  if (enableDragImage && isMouseDown) {
                    const { clientX, clientY } = e;

                    const deltaX =
                      (clientX - mouseDownPositionRef.current.x) * zoom;
                    const deltaY =
                      (clientY - mouseDownPositionRef.current.y) * zoom;
                    setImages(
                      images.map((image) => {
                        if (image.id === id) {
                          image.x =
                            (imagePositionRef?.current?.x ?? image.x) + deltaX;
                          image.y =
                            (imagePositionRef?.current?.y ?? image.x) + deltaY;
                        }
                        return image;
                      })
                    );
                    setDialogs(
                      dialogs.map((dialog, i) => {
                        if (dialog.imageId === id) {
                          dialog.x =
                            dialogsRef?.current[i].x * zoom +
                            (clientX - mouseDownPositionRef.current.x);

                          dialog.y =
                            dialogsRef?.current[i].y * zoom +
                            (clientY - mouseDownPositionRef.current.y);
                        }

                        return dialog;
                      })
                    );
                  }
                }}
              />
            ))}
            {dialogs.map((dialog, index) => (
              <MarkPoint
                key={dialog.id}
                x={dialog.x}
                y={dialog.y}
                zIndex={index + 3}
                color={dialog.color}
                onClick={(e) => handleDialogOpen(e, dialog.id)}
              />
            ))}
            {currentDialog && (
              <MarkPoint
                key={currentDialog.id}
                {...currentDialog}
                zIndex={dialogs.length + 1}
              />
            )}
          </Container>
        </Stage>
      </div>
      {currentDialog && (
        <CommentsDialog
          currentDialog={currentDialog}
          setDialogs={setDialogs}
          setCurrentDialogId={setCurrentDialogId}
          username={username}
          zoom={zoom}
          position={position}
        />
      )}
      <Panels
        enableDragImage={enableDragImage}
        setEnableDragImage={setEnableDragImage}
        setPosition={setPosition}
        zoom={zoom}
        setUsername={setUsername}
      />
    </div>
  );
};

export default App;
