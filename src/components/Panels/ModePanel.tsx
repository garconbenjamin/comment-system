import { MdOutlineImage, MdOutlineMessage } from "react-icons/md";
import { PanelsProps } from "./types";

const ModePanel = (
  props: Pick<PanelsProps, "enableDragImage" | "setEnableDragImage">
) => {
  const { enableDragImage, setEnableDragImage } = props;
  const activeClass = "bg-slate-400 text-black";
  return (
    <div>
      <h2 className=" mb-1">Mode</h2>
      <div className="flex bg-white rounded-lg overflow-hidden text-gray-400">
        <button
          className={
            "flex-grow py-4 btn rounded-none felx flex-col justify-center " +
            (enableDragImage ? "" : activeClass)
          }
          onClick={() => setEnableDragImage(false)}
        >
          <MdOutlineMessage size={20} />
          <span className="text-xs">Add comment</span>
        </button>
        <button
          className={
            "flex-grow py-4 btn rounded-none flex flex-col justify-center " +
            (enableDragImage ? activeClass : "")
          }
          onClick={() => setEnableDragImage(true)}
        >
          <MdOutlineImage size={20} />
          <span className="text-xs">Move image</span>
        </button>
      </div>
    </div>
  );
};

export default ModePanel;
