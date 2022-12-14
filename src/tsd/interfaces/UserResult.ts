interface UserResult {
  _id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  token?: string;
}

export default UserResult;
