import "reflect-metadata";

import express from "express";
import { useExpressServer } from "routing-controllers";
import { AuthController } from "./controllers";
import { logRequest } from "./middleware/logger";
import cors from "cors";

// Your existing Express app setup...

const port = 4001;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(logRequest);

const corsOptions = {
  origin: "*", // Adjust this to match your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

useExpressServer(app, {
  cors: true,
  routePrefix: "/api",
  controllers: [AuthController],
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
