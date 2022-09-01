interface Verification {
  _id: string;
  email: string;
  code: string;
  timestamp: Date;
}

export default Verification;
