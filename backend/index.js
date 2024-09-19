import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js'; 

dotenv.config({ path: './config.env' }); 

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION!  Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// }); 


mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connection successfully!"));

const port = process.env.PORT || 8000;
console.log(port);
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
