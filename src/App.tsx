import { useEffect, useRef, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Container, Stage } from "@pixi/react";
import { throttle } from "lodash";
import type { Dialog, Image } from "types";
import { v4 as uuid } from "uuid";
import "@pixi/events";
import CommentsDialog from "components/CommentsDialog";
import ImageWithComment from "components/ImageWithComment";
import Instructions from "components/Instructions";
import MarkPoint from "components/MarkPoint";
import Panels from "components/Panels";
import {
  INITIAL_DIALOGS,
  INITIAL_IMAGES,
  INITIAL_POSITION,
  INITIAL_USER,
  INITIAL_ZOOM,
  MARKPOINT_SIZE,
  ZOOM_SPEED,
} from "constant";

const App = () => {
  // Content
  const [images, setImages] = useState<Image[]>(INITIAL_IMAGES);

  const [username, setUsername] = useState(INITIAL_USER);
  const [dialogs, setDialogs] = useState<Dialog[]>(INITIAL_DIALOGS);

  // Canvas
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  // User action flags
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPressingWhiteSpace, setIsPressingWhiteSpace] = useState(false);

  const [enableMoveImage, setEnableMoveImage] = useState(false);
  const [pointerInImage, setPointerInImage] = useState(false);
  const [currentDialogId, setCurrentDialogId] = useState<string | null>(null);

  const mouseDownPositionRef = useRef(position);
  const prevPositionRef = useRef(position);

  const enableMoveArtboard = isMouseDown && isPressingWhiteSpace;
  const ref = useDetectClickOutside({
    onTriggered: () => setCurrentDialogId(null),
  });
  const handleStageMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    mouseDownPositionRef.current = {
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    };
    setIsMouseDown(true);
  };

  const handleStageMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (enableMoveArtboard) {
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

  const handleStageMouseUp = () => {
    setIsMouseDown(false);
    mouseDownPositionRef.current = position;
    prevPositionRef.current = position;
  };
  const handleStageZoom = (deltaY: number, x: number, y: number) => {
    const newScale = zoom + deltaY * ZOOM_SPEED;
    if (newScale >= 0.5 && newScale <= 1.5) {
      const worldPosition = {
        x: (x - position.x) / zoom,
        y: (y - position.y) / zoom,
      };
      const newPosition = {
        x: worldPosition.x * newScale + position.x,
        y: worldPosition.y * newScale + position.y,
      };

      setPosition((prev) => ({
        x: prev.x - (newPosition.x - x),
        y: prev.y - (newPosition.y - y),
      }));

      setZoom(newScale);
    } else {
      return;
    }
  };
  useEffect(() => {
    if (isPressingWhiteSpace) {
      document.body.style.cursor = "grab";
      if (isMouseDown) {
        document.body.style.cursor = "grabbing";
      }
    } else {
      document.body.style.cursor = "auto";
    }
  }, [isPressingWhiteSpace, isMouseDown]);
  useEffect(() => {
    const handleResize = throttle(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 300);
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
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handlePressWhiteSpace);
    window.addEventListener("keyup", handleLeaveWhiteSpace);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handlePressWhiteSpace);
      window.removeEventListener("keyup", handleLeaveWhiteSpace);
    };
  }, []);

  const currentDialog = dialogs.find((dialog) => dialog.id === currentDialogId);
  return (
    <div
      id="main"
      className="overflow-hidden relative"
      style={{ width, height }}
    >
      <div className="relative" ref={ref}>
        <Stage
          width={width}
          height={height}
          options={{ backgroundColor: 0xd5d5d5 }}
          onWheel={(e) => handleStageZoom(e.deltaY, e.clientX, e.clientY)}
          onMouseDown={
            isPressingWhiteSpace
              ? handleStageMouseDown
              : pointerInImage || enableMoveImage
              ? undefined
              : (e) => {
                  const id = uuid();
                  setDialogs((prev) => [
                    ...prev,
                    {
                      id,
                      x: (e.clientX - position.x - MARKPOINT_SIZE / 2) / zoom,
                      y: (e.clientY - position.y - MARKPOINT_SIZE / 2) / zoom,
                      color: "yellow",
                      comments: [],
                    },
                  ]);
                  setCurrentDialogId(id);
                }
          }
          onMouseUp={isPressingWhiteSpace ? handleStageMouseUp : undefined}
          onMouseMove={handleStageMouseMove}
        >
          <Container
            position={position}
            interactive
            scale={zoom}
            pointerover={() => {
              setPointerInImage(true);
            }}
            pointerout={() => {
              setPointerInImage(false);
            }}
          >
            {INITIAL_IMAGES.map(({ x, y, id, src }) => (
              <ImageWithComment
                key={id}
                id={id}
                x={x}
                y={y}
                src={src}
                enableMoveImage={enableMoveImage}
                setImages={setImages}
                setCurrentDialogId={setCurrentDialogId}
                imageDialogs={dialogs.filter((dialog) => dialog.imageId === id)}
                setDialogs={setDialogs}
                isPressingWhiteSpace={isPressingWhiteSpace}
              />
            ))}

            {dialogs
              .filter((dialog) => !dialog.imageId)
              .map((dialog) => (
                <MarkPoint
                  key={dialog.id}
                  x={dialog.x}
                  y={dialog.y}
                  color={dialog.color}
                  isPressingWhiteSpace={isPressingWhiteSpace}
                  onClick={() => setCurrentDialogId(dialog.id)}
                />
              ))}
          </Container>
        </Stage>
        {currentDialog && (
          <CommentsDialog
            setDialogs={setDialogs}
            username={username}
            zoom={zoom}
            position={position}
            currentDialog={currentDialog}
            currentImage={images.find(
              (image) => image.id === currentDialog.imageId
            )}
            setCurrentDialogId={setCurrentDialogId}
          />
        )}
      </div>

      <Panels
        enableMoveImage={enableMoveImage}
        setEnableMoveImage={setEnableMoveImage}
        setPosition={setPosition}
        zoom={zoom}
        setZoom={setZoom}
        username={username}
        setUsername={setUsername}
      />
      <Instructions />
    </div>
  );
};

export default App;
