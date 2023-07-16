import { useState } from "react";
import { MdClose } from "react-icons/md";
const Instructions = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  return (
    <div
      className={
        "fixed right-0 bottom-0 bg-white shadow-lg transition ease-in-out duration-500 transform " +
        (showInstructions ? "translate-y-0" : "translate-y-full")
      }
      style={{ width: 400 }}
    >
      <div className="relative">
        <button
          className="w-full flex items-center justify-center absolute top-0 transform -translate-y-full text-white bg-slate-500"
          onClick={() => setShowInstructions((prev) => !prev)}
        >
          <span>How to use?</span>
          {showInstructions && (
            <span className="absolute right-2">
              <MdClose />
            </span>
          )}
        </button>
        <div className="p-3">
          <div>Instruction</div>
          <div>
            <ul className="text-sm">
              <li className="ml-2">
                ・ Scroll up/down to zoom in/out the work area.
              </li>
              <li className="ml-2">
                ・ Press whitesapce and drag on the screen to pan the work area.
              </li>
              <li className="ml-2">・ Switching mode:</li>
              <li className="ml-4">- Add comment: </li>
              <li className="ml-6">click on the artboard to add a comment.</li>
              <li className="ml-6">
                click on the image to attach a comment to the image.
              </li>
              <li className="ml-4">- Move image:</li>
              <li className="ml-6"> click on the image to move it.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Instructions;
