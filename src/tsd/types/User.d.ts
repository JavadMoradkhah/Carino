type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp?: number;
  __v?: number;
};

export default User;
