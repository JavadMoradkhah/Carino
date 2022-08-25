import UserResult from './UserResult';

interface User {
  name: string;
  email: string;
  password: string;
  generateAuthToken: (user: UserResult) => string;
  parseUserResult: () => UserResult;
}

export default User;
