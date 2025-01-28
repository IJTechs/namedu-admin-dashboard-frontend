export interface INewsData {
  _id: string;
  title: string;
  content: string;
  images: string[];
  readTime: number;
  views: number;
  socialLinks: Record<string, string>;
  author: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  telegramChatId: number;
  telegramMessageId: number[];
}

export interface INews {
  count: number;
  news: INewsData[];
}
