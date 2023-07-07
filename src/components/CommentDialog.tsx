import { useState } from "react";
import type { CommentDialogProps } from "types";

const CommentDialog = ({
  comments,
  onClose,
  onComment,
}: CommentDialogProps) => {
  const [newComment, setNewComment] = useState("");

  const handleComment = () => {
    if (newComment.trim() !== "") {
      onComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
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
export default CommentDialog;
