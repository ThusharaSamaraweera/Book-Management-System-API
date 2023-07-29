export interface IUser {
    name: string;
    email: string;
    password: string;
}

export type LoginUser = Pick<IUser, "email" | "password">;

export interface jwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}