export interface ICommentsList {
  totalCount: number;
  nextCursor: number;
  list: IComment[];
}

export interface IComment {
  epigramId: number;
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  content: string;
  id: number;
}
