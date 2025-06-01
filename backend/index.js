const express = require("express");
const session = require("express-session");
const cors = require("cors");

const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");

const app = express();
dbConnect();

// SESSION SETUP — required!
app.use(session({
  secret: "your_secret_key_here", // Replace with a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: "lax"
  }
}));

// CORS SETUP
app.use(cors({
  origin: "http://localhost:3000", // your frontend origin
  credentials: true,               // allow credentials (cookies)
}));

app.use(express.json());

app.use("/users", UserRouter);
app.use("/photos", PhotoRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
