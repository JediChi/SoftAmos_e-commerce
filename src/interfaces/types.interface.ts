export type SecurityConfig = {
    jwt_secret: string;
  };
  
  export interface ValidationError {
    [x: string]: any;
  }