export interface IUserLoginData {
  username: string;
  password: string;
}

export interface IUserResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    full_name: string;
    username: string;
    role: string;
    isActive: boolean;
    linkedWebsites?: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    passwordChangedAt: string;
    telegram: string;
  };
}
