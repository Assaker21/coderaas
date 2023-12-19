require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const db = require("./models");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

db.sequelize.sync().then((req) => {
  app.listen(3000, () => {
    console.log(`Server is listening at http://localhost:3000`);
  });
});

const portfolioRoute = require("./routes/portfolio.route");
app.use("/", portfolioRoute);

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const user = { username: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .sendStatus(200);
  } catch (err) {
    res.send(err);
  }
});
