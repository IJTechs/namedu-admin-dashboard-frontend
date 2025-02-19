import { IAdmin } from './admin.interface';

export interface ITelegram {
  _id: string;
  botToken: string;
  channelId: string;
  adminId: number;
  linkedAdmin?: IAdmin;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITelegramsResponse {
  status: string;
  count: number;
  telegram_bots: ITelegram[];
}

export interface ITelegramResponse {
  status: string;
  telegram_bot: ITelegram;
}

export interface ICreateTelegramRequest {
  botToken: string;
  channelId: string;
  adminId: number;
  linkedAdmin?: string;
}

export interface ICreateTelegramResponse {
  status: string;
  message: string;
  telegram_bot: ITelegram;
}

export interface IUpdateTelegramRequest {
  botToken: string;
  channelId: string;
  adminId: number;
  linkedAdmin?: string;
}

export interface IUpdateTelegramResponse {
  status: string;
  message: string;
  telegram_bot: ITelegram;
}

export interface IDeleteTelegramResponse {
  status: string;
  message: string;
}
