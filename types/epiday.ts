export interface IEpidayData {
  likeCount: number;
  tags: ITag[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
}
export interface ITag {
  id: number;
  name: string;
}

export interface IEpidayList {
  totalCount: number;
  nextCursor: number;
  list: IEpidayData[];
}
