import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import expressWs from "express-ws";
import cookieParser from "cookie-parser";

import { init } from "./clients";
import chromadb, { ChromaClient, Collection } from "chromadb";
import { v4 as uuidv4 } from "uuid";

import ChatOllama from "ollama";

import { musicStreamSocket } from "./sockets/music-stream.socket";
import { broadcastSocket } from "./sockets/broadcast.socket";

import { middlewares } from "./middlewares/index";

import querystring from "querystring";
import http from "http";

import handleChat from "./components/ollama/chat.controller";
import authRouter from "./routes/auth.route";
import connectWalletRouter from "./routes/wallet.route";

const app = express();

// const client_id = process.env.SPOTIFY_CLIENT_ID;
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// app.get('/login', (req, res) => {
//   console.log("login hit");

//   var state = generateRandomString(16);
//   var scope = 'user-read-private user-read-email user-top-read';

//   const client_id = process.env.SPOTIFY_CLIENT_ID;
//   const redirect_uri = "https://reasonable-farmer-displaying-watson.trycloudflare.com/callback";

//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });
// Set cookie to store the state
// res.cookie('spotify_token', access_token, {
//       httpOnly: true,
//       maxAge: 3600 * 1000,
//     });

// res.clearCookie('spotify_auth_state'); // cleanup

const envPath = path.resolve(__dirname, "../.env");
console.log(`Loading .env from: ${envPath}`);

dotenv.config({ path: envPath });
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content",
      "Accept",
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use("/auth", authRouter);
app.use("/wallet", connectWalletRouter);

app.post("/send_message", function (req, res) {
  console.log(req.body, req.query);
  handleChat(req, res);
});

expressWs(app);


musicStreamSocket(app);
broadcastSocket(app);

app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 5050;

init()
  .then(async () => {
    app.listen(PORT, async () => {
      console.info(`REST API running on port ${PORT}`);
      console.info(`Main Route: http://localhost:${PORT}/`);
      // startStream();
      console.log("starting");
    });
  })
  .catch((error) => {
    console.error("Error initializing application:", error);
    process.exit(1);
  });

function generateRandomString(length: number): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default app;
