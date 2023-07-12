import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { MdClose, MdSend } from "react-icons/md";
import { COLORS } from "constants";
import { groupBy } from "lodash";
import moment from "moment";
import type { Dialog } from "types";
import { v4 as uuid } from "uuid";
const Tip = () => (
  <div className="w-4 h-4 bg-white absolute top-1/2 -left-2 transform rotate-45 shadow-lg" />
);
const CommentsDialog = (props: {
  currentDialog: Dialog;
  setDialogs: Dispatch<SetStateAction<Dialog[]>>;
  setCurrentDialogId: Dispatch<SetStateAction<string | null>>;
  zoom: number;
  position: { x: number; y: number };
  username: string;
}) => {
  const [text, setText] = useState("");
  const {
    setDialogs,
    username,
    setCurrentDialogId,
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

    setText("");
  };
  const removeCurrentDialog = useCallback(() => {
    setDialogs((dialogs) =>
      dialogs.filter((dialog) => dialog.id !== currentDialog.id)
    );
  }, [currentDialog.id, setDialogs]);
  const handleClose = () => {
    setCurrentDialogId(null);
    if (comments.length) {
      removeCurrentDialog();
    }
  };
  const handeResolve = () => {
    setCurrentDialogId(null);
    removeCurrentDialog();
  };

  const commentsGroupByDate = useMemo(
    () =>
      groupBy(comments, (comment) =>
        moment(comment.timestamp).format("YYYY-MM-DD")
      ),
    [comments]
  );

  return (
    <div
      className="absolute transform translate-x-14 -translate-y-1/2"
      style={{
        top: position.y + y * zoom,
        left: position.x + x * zoom,
        width: 350,
      }}
    >
      <Tip />
      <div className="relative overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex items-center border-b border-gray-300 py-2 px-4 gap-x-2">
          {Object.entries(COLORS).map(([key, value]) => (
            <div className="flex justify-center items-center" key={key}>
              {currentDialog.color === key && (
                <div className="mb-px absolute rounded-full w-7 h-7 border-2 border-gray-200" />
              )}
              <button
                className="text-lg "
                onClick={() =>
                  setDialogs((prev) =>
                    prev.map((dialog) => {
                      if (dialog.id === currentDialog.id) {
                        dialog.color = key;
                      }
                      return dialog;
                    })
                  )
                }
              >
                {value}
              </button>
            </div>
          ))}

          <button
            className="btn bg-green-400 text-white px-2 "
            onClick={handeResolve}
            disabled={!comments.length}
          >
            Resolve
          </button>

          <button onClick={handleClose} className="ml-auto">
            <MdClose color="black" size={20} />
          </button>
        </div>
        {Boolean(comments.length) && (
          <div className="px-4 py-2 border-b border-gray-300">
            {Object.entries(commentsGroupByDate).map(([date, comments]) => (
              <div key={currentDialog.id + date}>
                <div
                  className="bg-gray-300 text-white rounded-md px-2 text-lg"
                  style={{ width: "104%", marginLeft: "-2%" }}
                >
                  {moment(date).diff(moment(new Date()), "days") > 0
                    ? moment(date).format("YYYY/MM/DD")
                    : "Today"}
                </div>
                <div className=" ">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-center">
                      <span className="font-bold pr-2">
                        {comment.username} :
                      </span>
                      <span>{comment.content}</span>
                      <div className="ml-auto text-right text-xs text-gray-400">
                        <div>{moment(comment.timestamp).format("HH:mm")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex px-4 py-2">
          <span className="font-bold pr-2">{username} :</span>
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-md px-2"
            placeholder="Add a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            disabled={!text}
            className="pl-2 text-blue-500"
            onClick={sendComment}
          >
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommentsDialog;
