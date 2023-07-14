import { useState } from "react";
import { PanelsProps } from "./types";

const UserPanel = (props: Pick<PanelsProps, "username" | "setUsername">) => {
  const { username, setUsername } = props;
  const [userNameInput, setUserNameInput] = useState(username);
  const [editingUsername, setEditingUsername] = useState(false);
  return (
    <div>
      <h2 className=" mb-1">User</h2>
      <input
        className="border border-gray-300 rounded-md px-2 disabled:border-transparent"
        placeholder="username"
        value={userNameInput}
        onChange={(e) => setUserNameInput(e.target.value)}
        maxLength={10}
        disabled={!editingUsername}
      />
      <button
        className={
          "btn w-full mt-2 " +
          (!editingUsername ? "bg-slate-500" : "bg-blue-400 text-white")
        }
        onClick={() => {
          if (!editingUsername) {
            setEditingUsername(true);
          } else {
            setUsername(userNameInput);
            setEditingUsername(false);
          }
        }}
        disabled={!userNameInput}
      >
        {!editingUsername ? "Log out" : "Log in"}
      </button>
    </div>
  );
};

export default UserPanel;
