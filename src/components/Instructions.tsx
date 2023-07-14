import { useState } from "react";

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
          className="w-full absolute top-0 transform -translate-y-full text-white bg-slate-500"
          onClick={() => setShowInstructions((prev) => !prev)}
        >
          How to use?
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
