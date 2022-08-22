import mongoose from 'mongoose';

export default function () {
  if (!process.env.DATABASE) {
    console.log('No database connection string is provided!');
    process.exit(1);
  }
  mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log('Connected to the MongoDB...'))
    .catch((err) => console.log('Could not connect to the MongoDB...', err));
}
