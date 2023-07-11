import { COLORS } from "constants";

type Comment = {
  id?: string;
  username: string;
  content: string;
  timestamp: string;
};

type Dialog = {
  x: number;
  y: number;
  id: string;
  comments: Comment[];
  color: string;
};

type Image = {
  src: string;
  id: string;
  x: number;
  y: number;
};

type ColorValue = typeof COLORS[keyof typeof COLORS];
export type { Comment, Dialog, Image, ColorValue };
