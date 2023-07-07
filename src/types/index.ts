type Comment = {
  x: number;
  y: number;
  id: string;
  username: string;
  content: string;
  timestamp: string;
  color: string;
};

type CommentDialog = {
  comments: Comment[];
  onClose: () => void;
  onComment: (content: string) => void;
};
export type { Comment, CommentDialog };
