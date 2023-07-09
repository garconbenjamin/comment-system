import { useEffect, useRef, useState } from "react";
import { Container, Sprite, Stage } from "@pixi/react";
import moment from "moment";
import { v4 as uuid } from "uuid";
import "@pixi/events";
import MarkPoint from "components/MarkPoint";
import "index.css";

// Constants
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
const INITIAL_ZOOM = 1;
const ZOOM_SPEED = 0.0001;
const IMG_PATH =
  "https://i.epochtimes.com/assets/uploads/2023/03/id13947271-2303030726001487.jpg";

type comment = {
  id?: string;
  username: string;
  content: string;
  timestamp: string;
};

type Dialog = {
  x: number;
  y: number;
  id: string;
  comments: comment[];
  color: string;
};

// Comment dialog component

const App = () => {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [username, setUsername] = useState("Bob");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [dialogs, setDialogs] = useState<Dialog[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPressingWhiteSpace, setIsPressingWhiteSpace] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [text, setText] = useState("");

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

  const handleCanvasClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isPressingWhiteSpace) {
      event.stopPropagation();
      const { offsetX, offsetY } = event.nativeEvent;
      const id = uuid();
      const dialog = {
        id,
        x: offsetX / zoom - position.x,
        y: offsetY / zoom - position.y,
        comments: [],
        color: "yellow",
      };
      setCurrentDialog(dialog);
      setShowDialog(true);
    }
  };
  const enableDrag = isMouseDown && isPressingWhiteSpace;

  const handleDialogClose = () => {
    setShowDialog(false);
    setCurrentDialog(null);
  };

  const sendComment = (currentDialog: Dialog) => {
    const id = uuid();
    const newComment = {
      content: text,
      username,
      timestamp: moment().toString(),
      id,
    };

    const targetDialog = dialogs.find(
      (dialog) => dialog.id === currentDialog.id
    );
    if (targetDialog) {
      targetDialog.comments = [...targetDialog.comments, newComment];
      setDialogs(dialogs);
    } else {
      setDialogs([...dialogs, { ...currentDialog, comments: [newComment] }]);
    }

    setCurrentDialog({
      ...currentDialog,
      comments: [...currentDialog.comments, newComment],
    });
    setText("");
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
          options={{ backgroundColor: "#d5d5d5" }}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onWheel={handleZoom}
          onClick={handleCanvasClick}
          // onMouseDown={handleMouseDown}
          // onMouseUp={handleMouseUp}
          // onMouseMove={handleMouseMove}
        >
          <Container position={position} scale={{ x: zoom, y: zoom }}>
            <Sprite
              image={IMG_PATH}
              x={100}
              y={100}
              interactive={true}
              // pointerdown={handleCanvasClick}
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
                  onClick={() => null}
                />
              )
            )}
            {currentDialog && (
              <MarkPoint {...currentDialog} zIndex={dialogs.length + 1} />
            )}
          </Container>
        </Stage>
      </div>
      {currentDialog && (
        <div
          className="absolute bg-white transform translate-x-12 -translate-y-1/2"
          style={{ top: currentDialog.y, left: currentDialog.x }}
        >
          {currentDialog.comments.map((comment) => (
            <div key={comment.id} className="">
              <span>{comment.username}:</span>
              <span>{comment.content}</span>
              <span>{moment(comment.timestamp).format("YYYY/MM/DD")}</span>
              <span>{moment(comment.timestamp).format("HH:mm:ss")}</span>
            </div>
          ))}
          <div className="flex">
            <input
              type="text"
              placeholder="Add a comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={() => sendComment(currentDialog)}>send</button>
          </div>
        </div>
      )}
      <Panel {...{ setPosition, position, zoom }} />
    </div>
  );
};
const Panel = ({
  setPosition,
  position,
  zoom,
}: {
  setPosition: React.Dispatch<{ x: number; y: number }>;
  position: { x: number; y: number };
  zoom: number;
}) => (
  <div>
    <button
      onClick={() => setPosition({ ...position, y: position.y + 1 * zoom })}
    >
      up
    </button>
    <button
      onClick={() => setPosition({ ...position, x: position.x - 1 * zoom })}
    >
      left
    </button>
  </div>
);
export default App;
