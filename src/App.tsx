import { useEffect, useRef, useState } from "react";
import { Container, Sprite, Stage } from "@pixi/react";
import { FederatedPointerEvent, Texture } from "pixi.js";
import type { Dialog } from "types";
import { v4 as uuid } from "uuid";
import "@pixi/events";
import CommentsDialog from "components/CommentsDialog";
import MarkPoint from "components/MarkPoint";
import Panel from "components/Panel";
import "index.css";

// Constants
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
const INITIAL_ZOOM = 1;
const ZOOM_SPEED = 0.0001;
const IMG_PATH =
  "https://i.epochtimes.com/assets/uploads/2023/03/id13947271-2303030726001487.jpg";

// Comment dialog component

const App = () => {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [username, setUsername] = useState("Bob");
  const [userNameInput, setUserNameInput] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [dialogs, setDialogs] = useState<Dialog[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPressingWhiteSpace, setIsPressingWhiteSpace] = useState(false);

  const [currentDialog, setCurrentDialog] = useState<Dialog | null>(null);
  const mouseDownPositionRef = useRef(position);
  const prevPositionRef = useRef(position);

  const handleZoom = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (
      zoom + e.deltaY * ZOOM_SPEED >= 0.5 ||
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

  const handleAddMarkPoint = (event: FederatedPointerEvent) => {
    if (!isPressingWhiteSpace) {
      event.stopPropagation();
      const { clientX, clientY } = event;
      const id = uuid();
      const dialog = {
        id,
        x: clientX / zoom - position.x,
        y: clientY / zoom - position.y,
        comments: [],
        color: "yellow",
      };
      setCurrentDialog(dialog);
    }
  };
  const enableDrag = isMouseDown && isPressingWhiteSpace;

  const handleDialogOpen = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dialog: Dialog
  ) => {
    e.stopPropagation();
    setCurrentDialog(dialog);
  };

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
    <div>
      <div className={`w-[${CANVAS_WIDTH}px] h-[${CANVAS_HEIGHT}px] relative`}>
        <Stage
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onWheel={handleZoom}
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
              onclick={handleAddMarkPoint}
              zIndex={0}
            />
            <Sprite
              image={IMG_PATH}
              x={100}
              y={100}
              interactive={true}
              pointerdown={handleAddMarkPoint}
            />
            {dialogs.map((dialog, index) =>
              dialog.id === currentDialog?.id ? (
                <></>
              ) : (
                <MarkPoint
                  key={dialog.id}
                  x={dialog.x}
                  y={dialog.y}
                  zIndex={index + 3}
                  color={dialog.color}
                  onClick={(e) => handleDialogOpen(e, dialog)}
                />
              )
            )}
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
          setCurrentDialog={setCurrentDialog}
          username={username}
        />
      )}
      <Panel setPosition={setPosition} position={position} zoom={zoom} />

      <div>
        <input
          placeholder="username"
          value={userNameInput}
          onChange={(e) => setUserNameInput(e.target.value)}
        />
        <button
          onClick={() => {
            setUsername(userNameInput);
            setUserNameInput("");
          }}
          disabled={!userNameInput}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default App;
