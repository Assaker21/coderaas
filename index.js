require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const db = require("./models");

app.use(
  cors({
    origin: [
      "https://coderass-portfolio.onrender.com",
      "https://coderaas-server1.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

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

const { pdf_items } = require("./models");

app.get("/pdf-generator", async (req, res) => {
  try {
    /*await pdf_items.destroy({
      where: {},
    });

    await pdf_items.bulkCreate([
      { type: "title", data: "Store evaluation dashboard" },
      {
        type: "table",
        data: JSON.stringify({
          subtitle: null,
          table: {
            theads: [
              "Ref.",
              "Category",
              "Weight",
              "Standard Points",
              "Deviations Points",
              "N/A Points",
              "Score %",
            ],
            rows: [
              ["A", "Hospitality", "20", "11", "5", "4", "68.75%"],
              [
                "B",
                "Maintenance and General Safety",
                "25",
                "12",
                "9",
                "0",
                "57.14%",
              ],
              [
                "C",
                "Cleanliness - Exterior and Interior",
                "17",
                "11",
                "5",
                "4",
                "47.06%",
              ],
              ["D", "Personal Hygiene", "20", "11", "5", "4", "30.00%"],
              ["E", "Receiving and Storage", "30", "11", "5", "4", "14.81%"],
              ["F", "Food handling", "55", "11", "5", "4", "23.26%"],
              ["G", "Conformity to recipe book", "3", "11", "5", "4", "0.00%"],
              [
                "H",
                "Conformity to Legal requirements",
                "10",
                "11",
                "5",
                "4",
                "0.00%",
              ],
              ["", "Total", "180", "51", "99", "30", "34.00%"],
              ["", "Total %", "100%", "28.33%", "55.00%", "16.67%", "34.00%"],
            ],
          },
        }),
      },
      {
        type: "risk-analysis-table",
        data: JSON.stringify({
          subtitle: "Risk analysis",
          table: {
            theads: ["Risk Range", "Weight"],
            rows: [
              ["Low", 1],
              ["Moderate", 2],
              ["Critical", 3],
            ],
          },
        }),
      },
      {
        type: "perf",
        data: JSON.stringify({
          subtitle: "Performance ratings",
          items: [
            { title: "Unsatisfactory", value: 40, color: "red" },
            {
              title: "Needs improvement",
              value: 60,
              color: "orange",
            },
            {
              title: "Meets requirements",
              value: 80,
              color: "yellow",
            },
            {
              title: "Exceeds requirements",
              value: 90,
              color: "yellowgreen",
            },
            { title: "Outstanding", value: 100, color: "green" },
          ],
        }),
      },
    ]);*/

    const items = await pdf_items.findAll();
    res.send(items);
  } catch (error) {
    /*res.send(
      JSON.stringify([
        { type: "title", data: "Store evaluation dashboard" },
        {
          type: "table",
          data: JSON.stringify({
            subtitle: null,
            table: {
              theads: [
                "Ref.",
                "Category",
                "Weight",
                "Standard Points",
                "Deviations Points",
                "N/A Points",
                "Score %",
              ],
              rows: [
                ["A", "Hospitality", "20", "11", "5", "4", "68.75%"],
                [
                  "B",
                  "Maintenance and General Safety",
                  "25",
                  "12",
                  "9",
                  "0",
                  "57.14%",
                ],
                [
                  "C",
                  "Cleanliness - Exterior and Interior",
                  "17",
                  "11",
                  "5",
                  "4",
                  "47.06%",
                ],
                ["D", "Personal Hygiene", "20", "11", "5", "4", "30.00%"],
                ["E", "Receiving and Storage", "30", "11", "5", "4", "14.81%"],
                ["F", "Food handling", "55", "11", "5", "4", "23.26%"],
                [
                  "G",
                  "Conformity to recipe book",
                  "3",
                  "11",
                  "5",
                  "4",
                  "0.00%",
                ],
                [
                  "H",
                  "Conformity to Legal requirements",
                  "10",
                  "11",
                  "5",
                  "4",
                  "0.00%",
                ],
                ["", "Total", "180", "51", "99", "30", "34.00%"],
                ["", "Total %", "100%", "28.33%", "55.00%", "16.67%", "34.00%"],
              ],
            },
          }),
        },
        {
          type: "risk-analysis-table",
          data: JSON.stringify({
            subtitle: "Risk analysis",
            table: {
              theads: ["Risk Range", "Weight"],
              rows: [
                ["Low", 1],
                ["Moderate", 2],
                ["Critical", 3],
              ],
            },
          }),
        },
        {
          type: "perf",
          data: JSON.stringify({
            subtitle: "Performance ratings",
            items: [
              { title: "Unsatisfactory", value: 40, color: "red" },
              {
                title: "Needs improvement",
                value: 60,
                color: "orange",
              },
              {
                title: "Meets requirements",
                value: 80,
                color: "yellow",
              },
              {
                title: "Exceeds requirements",
                value: 90,
                color: "yellowgreen",
              },
              { title: "Outstanding", value: 100, color: "green" },
            ],
          }),
        },
      ])
    );*/
    res.send({ error: error });
    console.log("ERROR: " + error);
  }
});
