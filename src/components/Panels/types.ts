import { Dispatch, SetStateAction } from "react";

type PanelsProps = {
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setZoom: Dispatch<SetStateAction<number>>;
  zoom: number;
  enableMoveImage: boolean;
  setEnableMoveImage: Dispatch<SetStateAction<boolean>>;
  username: string;
};
export type { PanelsProps };
