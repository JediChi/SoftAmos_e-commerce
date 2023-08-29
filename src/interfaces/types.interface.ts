export type SecurityConfig = {
    jwt_secret: string;
  };
  
  export interface ValidationError {
    [x: string]: any;
  }

  export interface IAuthUser {
    sub: string;
    email: string;
    iat: number;
    exp: number;
  }