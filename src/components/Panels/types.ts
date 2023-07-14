import { Dispatch, SetStateAction } from "react";

type PanelsProps = {
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setUsername: Dispatch<SetStateAction<string>>;
  zoom: { x: number; y: number };
  enableDragImage: boolean;
  setEnableDragImage: Dispatch<SetStateAction<boolean>>;
  username: string;
};
export type { PanelsProps };
