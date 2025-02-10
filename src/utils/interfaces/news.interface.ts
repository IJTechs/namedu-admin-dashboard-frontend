export interface INewsData {
  _id: string;
  title: string;
  content: string;
  images: string[] | File[];
  readTime?: number;
  views?: number;
  socialLinks?: Record<string, string>;
  author: string;
  createdAt: string;
  updatedAt: string;
  telegramChatId: number;
  telegramMessageId: number[];
  authorName: string;
}

export interface INews {
  count: number;
  news: INewsData[];
}

export interface INewsRquestData {
  title: string;
  content: string;
  images: (string | File)[];
  readTime?: number;
  author?: string;
  createdAt?: string;
}
