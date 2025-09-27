import dotenv from "dotenv";

// Load environment variables before any other imports
dotenv.config();

import { createServer } from "./server";

const port = 3000;
const server = createServer();

server.listen(port, () =>
  console.log(`Started server on port ${port}`),
);
