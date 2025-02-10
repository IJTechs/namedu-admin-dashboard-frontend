export interface IAdminLoginData {
  username: string;
  password: string;
}

export interface IAdminResponse {
  status: string;
  admin: {
    _id: string;
    full_name: string;
    username: string;
    role: 'ADMIN' | 'SUPER_ADMIN';
    isActive: boolean;
    linkedWebsites?: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    passwordChangedAt: string;
    telegram: string;
    password?: string;
  };
}

export interface IAdmin {
  _id: string;
  full_name: string;
  username: string;
  password?: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  linkedWebsites?: string[];
  createdAt: string;
  updatedAt: string;
  passwordChangedAt?: string;
  telegram: string;
  __v: number;
}
