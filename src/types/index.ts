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
export type { Comment, Dialog };
