import { useRef, useState } from "react";
import { Container, Sprite, Stage } from "@pixi/react";
import { v4 as uuid } from "uuid";
import "@pixi/events";
import MarkPoint from "components/MarkPoint";

// Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const INITIAL_ZOOM = 1;
const ZOOM_SPEED = 0.0001;
const IMG_PATH =
  "https://i.epochtimes.com/assets/uploads/2023/03/id13947271-2303030726001487.jpg";
type Comment = {
  x: number;
  y: number;
  id: string;
  username: string;
  content: string;
  timestamp: string;
  color: string;
};

// Comment dialog component

const App = () => {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [comments, setComments] = useState<Comment[]>([]);
  const [panFlag, setPanFlag] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Comment | null>(null);
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
    setPanFlag(true);
  };
  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (panFlag) {
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
    setPanFlag(false);
    mouseDownPositionRef.current = position;
    prevPositionRef.current = position;
  };

  const handleImageClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const { offsetX, offsetY } = event.nativeEvent;
    const id = uuid();
    const comment = {
      id,
      x: offsetX / zoom - position.x,
      y: offsetY / zoom - position.y,
      content: "",
      timestamp: new Date().toLocaleString(),
      username: "User",
      color: ["red", "orange", "yellow", "green", "blue", "purple", "pink"][
        Math.floor(Math.random() * 7)
      ],
    };
    setComments((prevComments) => [...prevComments, comment]);
    setSelectedImage(comment);
    setShowDialog(true);
  };

  const handleComment = (index: number, content: string) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[index].content = content;
      return updatedComments;
    });
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setSelectedImage(null);
  };

  const handleResolveThread = (index: number) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments.splice(index, 1);
      return updatedComments;
    });
    setSelectedImage(null);
  };

  return (
    <div>
      <Stage
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onWheel={handleZoom}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        renderOnComponentChange={true}
      >
        <Container
          position={position}
          scale={{ x: zoom, y: zoom }}
          interactive={true}
        >
          <Sprite
            image={IMG_PATH}
            x={100}
            y={100}
            interactive={true}
            pointerdown={handleImageClick}
          />
          {comments.map((comment, index) => (
            <MarkPoint
              key={comment.id}
              x={comment.x}
              y={comment.y}
              zIndex={index + 3}
              color={comment.color}
              onClick={() => null}
            />
          ))}
        </Container>
      </Stage>

      {/* {showDialog && (
        <CommentDialog
          comments={comments}
          onClose={handleDialogClose}
          onComment={(content) => handleComment(comments.length - 1, content)}
        />
      )} */}

      {/* {comments.map((comment, index) => (
        <Text
          key={index}
          text="💬"
          x={comment.x * zoom + position.x}
          y={comment.y * zoom + position.y}
          click={() => {
            setSelectedImage(comment);
            setShowDialog(true);
          }}
        />
      ))} */}

      {selectedImage && (
        <div>
          <strong>{selectedImage.username}</strong>: {selectedImage.content} (
          {selectedImage.timestamp})
          <button
            onClick={() => handleResolveThread(comments.indexOf(selectedImage))}
          >
            Resolve Thread
          </button>
        </div>
      )}
      <button
        onClick={() =>
          setPosition((prev) => ({ ...prev, y: prev.y + 1 * zoom }))
        }
      >
        up
      </button>
      <button
        onClick={() =>
          setPosition((prev) => ({ ...prev, y: prev.y - 1 * zoom }))
        }
      >
        down
      </button>
      <button
        onClick={() =>
          setPosition((prev) => ({ ...prev, x: prev.x + 1 * zoom }))
        }
      >
        left
      </button>
      <button
        onClick={() =>
          setPosition((prev) => ({ ...prev, x: prev.x - 1 * zoom }))
        }
      >
        right
      </button>
    </div>
  );
};

export default App;
