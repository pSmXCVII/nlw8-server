import express from "express";
import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(routes);
const localPort = 3333;

app.listen(localPort, () => {
  console.log(`Server Running at: http://localhost:${localPort}`);
});