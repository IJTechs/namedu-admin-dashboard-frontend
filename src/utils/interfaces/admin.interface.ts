export interface IAdmin {
  _id: string;
  full_name: string;
  username: string;
  password: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordChangedAt?: string;
  telegram?: string;
}
export interface IAdminResponse {
  status: string;
  admin: IAdmin;
}

export interface IAdminsResponse {
  status: string;
  count: number;
  admins: IAdmin[];
}

export interface ICreateAdminRequest {
  full_name: string;
  username: string;
  password?: string;
  confirm_password?: string;
  role?: 'SUPER_ADMIN' | 'ADMIN';
  isActive?: boolean;
}

export interface ICreateAdminResponse {
  status: string;
  message: string;
  admin: IAdmin;
}

export interface IUpdateAdminRequest {
  full_name: string;
  username: string;
  password?: string | undefined;
  role?: 'SUPER_ADMIN' | 'ADMIN';
  isActive?: boolean;
  confirm_password?: string | undefined;
}

export interface IUpdateAdminResponse {
  status: string;
  message?: string;
  admin: IAdmin;
}

export interface IDeleteAdminResponse {
  status?: string;
  message?: string;
}

export interface IChangePasswordRequest {
  old_password: string;
  new_password: string;
  confim_password: string;
}

export interface IChangePasswordResponse {
  status: string;
  message: string;
}

export interface IAdminStatusControlResponse {
  status: string;
  message: string;
  admin: IAdmin;
}

export interface IAdminRoleControlRequest {
  role: 'SUPER_ADMIN' | 'ADMIN';
}

export interface IAdminRoleControlResponse {
  status: string;
  message: string;
  admin: IAdmin;
}
