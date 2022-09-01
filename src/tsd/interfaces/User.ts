import UserResult from './UserResult';

interface User {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  generateAuthToken: (user: UserResult) => string;
  parseUserResult: () => UserResult;
}

export default User;
