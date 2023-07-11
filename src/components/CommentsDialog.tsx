import { Dispatch, SetStateAction, useState } from "react";
import { MdClose, MdSend } from "react-icons/md";
import { COLORS } from "constants";
import moment from "moment";
import type { Dialog } from "types";
import { v4 as uuid } from "uuid";

const CommentsDialog = (props: {
  currentDialog: Dialog;
  setDialogs: Dispatch<SetStateAction<Dialog[]>>;
  setCurrentDialog: Dispatch<SetStateAction<Dialog | null>>;
  zoom: number;
  position: { x: number; y: number };
  username: string;
}) => {
  const [text, setText] = useState("");
  const {
    setDialogs,
    username,
    setCurrentDialog,
    currentDialog,
    position,
    zoom,
  } = props;
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
  const handleClose = () => {
    setCurrentDialog(null);
  };
  return (
    <div
      className="absolute bg-white rounded-lg overflow-hidden p-2 shadow-lg transform translate-x-12 -translate-y-1/2"
      style={{ top: (y + position.y) * zoom, left: (x + position.x) * zoom }}
    >
      <div className="flex justify-between">
        <div className="flex gap-x-1">
          <div className="flex">
            {Object.entries(COLORS).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  setCurrentDialog({
                    ...currentDialog,
                    color: key,
                  })
                }
              >
                {value}
              </button>
            ))}
            <button className="btn bg-green-400 text-white px-2 py-1">
              Resolve
            </button>
          </div>
        </div>
        <button onClick={handleClose}>
          <MdClose color="black" />
        </button>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="">
          <span>{comment.username}:</span>
          <span>{comment.content}</span>
          <span>{moment(comment.timestamp).format("YYYY/MM/DD")}</span>
          <span>{moment(comment.timestamp).format("HH:mm:ss")}</span>
        </div>
      ))}
      <div className="flex">
        <span className="font-bold pr-2">{username} :</span>
        <input
          type="text"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={!text} onClick={sendComment}>
          <MdSend color="black" />
        </button>
      </div>
    </div>
  );
};
export default CommentsDialog;
