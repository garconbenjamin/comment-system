import { useRef, useState } from "react";
import { Container, Sprite, Stage, Text } from "@pixi/react";
import { v4 as uuid } from "uuid";
import MarkPoint from "components/MarkPoint";

// Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const INITIAL_ZOOM = 1;
const ZOOM_SPEED = 0.1;
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

type CommentDialog = {
  comments: Comment[];
  onClose: () => void;
  onComment: (content: string) => void;
};

// Comment dialog component
const CommentDialog = ({ comments, onClose, onComment }: CommentDialog) => {
  const [newComment, setNewComment] = useState("");

  const handleComment = () => {
    if (newComment.trim() !== "") {
      onComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>
          <strong>{comment.username}</strong>: {comment.content} (
          {comment.timestamp})
        </div>
      ))}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleComment}>Add Comment</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

// App component
const App = () => {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [comments, setComments] = useState<Comment[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Comment | null>(null);

  const stageRef = useRef(null);

  const handleZoom = (delta: number) => {
    setZoom((prevZoom) => Math.max(prevZoom + delta / 100, 0.1));
  };

  const handlePan = (deltaX: number, deltaY: number) => {
    setPosition((prevPosition) => ({
      x: prevPosition.x + deltaX,
      y: prevPosition.y + deltaY,
    }));
  };

  const handleCanvasClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
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
        ref={stageRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onWheel={(event) => handleZoom(event.deltaY * ZOOM_SPEED)}
        onClick={(e) => handleCanvasClick(e)}
        renderOnComponentChange={true}
      >
        <Container position={position} scale={{ x: zoom, y: zoom }}>
          <Sprite
            image={IMG_PATH}
            x={100}
            y={100}
            zIndex={0}
            width={200}
            height={200}
            interactive={true}
            pointerdown={
              (e) => {
                e.stopPropagation();
                console.log("clicking on image");
              } /* Prevents panning when clicking on image */
            }
          />
          <Text x={0} y={0} text="💬" />
        </Container>
        {comments.map((comment, index) => (
          <MarkPoint
            key={comment.id}
            x={comment.x}
            y={comment.y}
            zIndex={index + 3}
            color={comment.color}
          />
        ))}
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
    </div>
  );
};

export default App;
