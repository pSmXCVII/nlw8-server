import express from "express";

const app = express();
const localPort = 3333;

app.listen(localPort, () => {
  console.log(`Server Running at: http://localhost:${localPort}`);
})