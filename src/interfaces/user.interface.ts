export interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  user_name?: string;
  phone_number?: number;
  email: string;
  delivery_address?: string;
  password?: string;
  status?: UserStatus;
  active?: boolean;
  last_login_date?: Date;
  num_login_attempts?: number;
}

export enum UserResponseMsg {
  INVALID_USER = 'invalid_user',
  INCORRECT_PASSWORD = 'incorrect_password',
  NO_ACCESS = 'no_access',
}

export interface ILogin {
  access_token: string;
  user?: IUser;
}

export interface IOptions {
  expiresIn?: string;
}

export interface LoginFlow {
  password?: string;
  active?: boolean;
  status?: UserStatus;
  num_login_attempts?: number;
  last_login_date?: Date;
}

export type UserStatus = 'blocked' | 'disabled' | 'active' | 'inactive';

export interface IUserAccess {
    user?: IUser;
    has_access?: boolean;
    msg?: UserResponseMsg;
  }
