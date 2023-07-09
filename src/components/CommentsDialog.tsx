import { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import type { Dialog } from "types";
import { v4 as uuid } from "uuid";
const CommentsDialog = (props: {
  currentDialog: Dialog;
  setDialogs: Dispatch<SetStateAction<Dialog[]>>;
  setCurrentDialog: Dispatch<SetStateAction<Dialog | null>>;
  username: string;
}) => {
  const [text, setText] = useState("");
  const { setDialogs, username, setCurrentDialog, currentDialog } = props;
  const { comments, x, y } = props.currentDialog;

  const sendComment = () => {
    const id = uuid();
    const newComment = {
      content: text,
      username,
      timestamp: moment().toString(),
      id,
    };
    setDialogs((dialogs) => {
      const targetDialog = dialogs.find(
        (dialog) => dialog.id === currentDialog.id
      );
      if (targetDialog) {
        targetDialog.comments = [...targetDialog.comments, newComment];
        return dialogs;
      } else {
        return [...dialogs, { ...currentDialog, comments: [newComment] }];
      }
    });

    setCurrentDialog((currentDialog) =>
      currentDialog
        ? {
            ...currentDialog,
            comments: [...currentDialog.comments, newComment],
          }
        : null
    );
    setText("");
  };

  return (
    <div
      className="absolute bg-white transform translate-x-12 -translate-y-1/2"
      style={{ top: y, left: x }}
    >
      {comments.map((comment) => (
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
        <button onClick={sendComment}>send</button>
      </div>
    </div>
  );
};
export default CommentsDialog;

// Path: src/components/Dialog.tsx
