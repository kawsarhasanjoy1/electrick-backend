export interface TUser {
  name: string;
  email: string;
  image: string;
  password: string;
  role: "admin" | "user";
  isDeleted: boolean,
  isBlocked: boolean,
  deletedAt: string,
}
