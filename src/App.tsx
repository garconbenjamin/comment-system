import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import { Container, Sprite, Stage, Text, withFilters } from "@pixi/react";
import useSpriteDrag from "hooks/useSpriteDrag";
import { create, throttle } from "lodash";
import { DisplayObject, FederatedPointerEvent, Texture } from "pixi.js";
import type { Dialog, Image, SetDialogs } from "types";
import { v4 as uuid } from "uuid";
import "@pixi/events";
import CommentsDialog from "components/CommentsDialog";
import ImageWithComment from "components/ImageWithComment";
import Instructions from "components/Instructions";
import MarkPoint from "components/MarkPoint";
import Panels from "components/Panels";
import {
  ARTBOARD_HEIGHT,
  ARTBOARD_WIDTH,
  INITIAL_IMAGES,
  INITIAL_POSITION,
  INITIAL_USER,
  INITIAL_ZOOM,
  MARKPOINT_SIZE,
  ZOOM_SPEED,
} from "constant";
import cover from "images/cover.jpg";
const ShadowFilter = withFilters(Container, { shadow: DropShadowFilter });

const App = () => {
  // Content
  const [images, setImages] = useState<Image[]>(INITIAL_IMAGES);
  const [username, setUsername] = useState(INITIAL_USER);
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  // Canvas
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  // User action flags
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPressingWhiteSpace, setIsPressingWhiteSpace] = useState(false);

  const [enableDragImage, setEnableDragImage] = useState(false);

  const [currentDialogId, setCurrentDialogId] = useState<string | null>(null);

  const currentDialogRef = useRef<Dialog | null>(null);
  const mouseDownPositionRef = useRef(position);
  const prevPositionRef = useRef(position);
  const dialogsActionRef = useRef<SetDialogs | null>(null);

  const enableMoveArtboard = isMouseDown && isPressingWhiteSpace;

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

  const handleDialogOpen = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dialog: Dialog
  ) => {
    e.stopPropagation();
    currentDialogRef.current = dialog;
  };

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

  /////////////////////////////////////////////////////////////////

  const handleStageZoom = (deltaY: number, x: number, y: number) => {
    const s = deltaY > 0 ? 1.5 : 0.5;

    const worldPosition = {
      x: (x - position.x) / zoom.x,
      y: (y - position.y) / zoom.y,
    };

    const newScale = { x: zoom.x * s, y: zoom.y * s };
    if (newScale.x < 0.25 || newScale.x > 1.75) return;
    const newPosition = {
      x: worldPosition.x * newScale.x + position.x,
      y: worldPosition.y * newScale.y + position.y,
    };

    setPosition((prev) => ({
      x: prev.x - (newPosition.x - x),
      y: prev.y - (newPosition.y - y),
    }));

    setZoom(newScale);
  };

  const currentDialog = dialogs.find((dialog) => dialog.id === currentDialogId);
  return (
    <div
      id="main"
      className="overflow-hidden relative"
      style={{ width, height }}
    >
      <div>
        <Stage
          width={width}
          height={height}
          options={{ backgroundColor: 0xd5d5d5 }}
          onWheel={(e) => handleStageZoom(e.deltaY, e.clientX, e.clientY)}
          onMouseDown={isPressingWhiteSpace ? handleStageMouseDown : undefined}
          onMouseUp={isPressingWhiteSpace ? handleStageMouseUp : undefined}
          onMouseMove={handleStageMouseMove}
        >
          <Container position={position} scale={zoom}>
            {INITIAL_IMAGES.map(({ x, y, id, src }) => (
              <ImageWithComment
                key={id}
                id={id}
                x={x}
                y={y}
                src={src}
                setImages={setImages}
                setCurrentDialogId={setCurrentDialogId}
                imageDialogs={dialogs.filter((dialog) => dialog.imageId === id)}
                setDialogs={setDialogs}
              />
            ))}
            {/* {dialogs.map((dialog, index) => (
              <MarkPoint
                key={dialog.id}
                x={dialog.x}
                y={dialog.y}
                color={dialog.color}
                onClick={(e) => handleDialogOpen(e, dialog.id)}
              />
            ))} */}
            {/* {currentDialog && (
              <MarkPoint
                key={currentDialog.id}
                {...currentDialog}
                zIndex={dialogs.length + 1}
              />
            )} */}
          </Container>
        </Stage>
      </div>
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
      <Panels
        enableDragImage={enableDragImage}
        setEnableDragImage={setEnableDragImage}
        setPosition={setPosition}
        zoom={zoom}
        username={username}
        setUsername={setUsername}
      />
      <Instructions />
    </div>
  );
};

export default App;
