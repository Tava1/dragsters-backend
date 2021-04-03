declare namespace Express {
  export interface Request {
    user: {
      id: string;
      fullname: string;
      role: string;
      email: string;
      isAdmin: boolean;
    };
  }
}
