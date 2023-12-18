require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const db = require("./models");
const { users, social_medias, experiences, projects } = require("./models");

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

app.get("/portfoliostatic", async (req, res) => {
  res.send(
    JSON.stringify({
      name: "Charbel aasdasd",
      about:
        "In 2014, I embarked on a coding journey by creating websites, igniting a passion for web development. By 2015, I mastered HTML, CSS, and JavaScript, expanding my skills to React.js in 2017 and integrating Node.js and MongoDB by 2018.<br /> <br />Today, I lead projects for customers, crafting digital solutions. I've also shared my expertise through an online code teaching service.<br /><br />Beyond the screen, I've ventured into C# and Unity, exploring game development since 2016. From React.js, Node.js and MongoDB to C#, and Unity, my journey continues with a passion for evolving technologies and new adventures in development.",
      experience: [
        {
          date: "2018 — PRESENT",
          title: "Some Cool Title",
          desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          dignissimos et reiciendis officia ipsa consectetur ad sunt
          deleniti, in tempore nihil mollitia perspiciatis doloremque
          distinctio fuga consequatur voluptate rem dolorum?`,
          tags: ["ReactJs", "SCSS", "WordPress", "JavaScript", "TypeScript"],
        },
        {
          date: "2018 — PRESENT",
          title: "Some Cool Title",
          desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            dignissimos et reiciendis officia ipsa consectetur ad sunt
            deleniti, in tempore nihil mollitia perspiciatis doloremque
            distinctio fuga consequatur voluptate rem dolorum?`,
          tags: ["ReactJs", "SCSS", "WordPress", "JavaScript", "TypeScript"],
        },
        {
          date: "2018 — PRESENT",
          title: "Some Cool Title",
          desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            dignissimos et reiciendis officia ipsa consectetur ad sunt
            deleniti, in tempore nihil mollitia perspiciatis doloremque
            distinctio fuga consequatur voluptate rem dolorum?`,
          tags: ["ReactJs", "SCSS", "WordPress", "JavaScript", "TypeScript"],
        },
        {
          date: "2018 — PRESENT",
          title: "Some Cool Title",
          desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            dignissimos et reiciendis officia ipsa consectetur ad sunt
            deleniti, in tempore nihil mollitia perspiciatis doloremque
            distinctio fuga consequatur voluptate rem dolorum?`,
          tags: ["ReactJs", "SCSS", "WordPress", "JavaScript", "TypeScript"],
        },
      ],
      projects: [
        {
          img: "https://charbelassaker.onrender.com/media/images/flappy-stick/0.jpg",
          title: "Some Cool Title",
          desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          dignissimos et reiciendis officia ipsa consectetur ad sunt
          deleniti, in tempore nihil mollitia perspiciatis doloremque
          distinctio fuga consequatur voluptate rem dolorum?`,
          tags: [
            "ReactJs",
            "SCSS",
            "WordPress",
            "JavaScript",
            "TypeScript",
            "Something else",
          ],
        },
        {
          img: "https://charbelassaker.onrender.com/media/images/flappy-stick/0.jpg",
          title: "Some Cool Title",
          desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            dignissimos et reiciendis officia ipsa consectetur ad sunt
            deleniti, in tempore nihil mollitia perspiciatis doloremque
            distinctio fuga consequatur voluptate rem dolorum?`,
          tags: [
            "ReactJs",
            "SCSS",
            "WordPress",
            "JavaScript",
            "TypeScript",
            "Something else",
          ],
        },
        {
          img: "https://charbelassaker.onrender.com/media/images/flappy-stick/0.jpg",
          title: "Some Cool Title",
          desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            dignissimos et reiciendis officia ipsa consectetur ad sunt
            deleniti, in tempore nihil mollitia perspiciatis doloremque
            distinctio fuga consequatur voluptate rem dolorum?`,
          tags: [
            "ReactJs",
            "SCSS",
            "WordPress",
            "JavaScript",
            "TypeScript",
            "Something else",
          ],
        },
        {
          img: "https://charbelassaker.onrender.com/media/images/flappy-stick/0.jpg",
          title: "Some Cool Title",
          desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            dignissimos et reiciendis officia ipsa consectetur ad sunt
            deleniti, in tempore nihil mollitia perspiciatis doloremque
            distinctio fuga consequatur voluptate rem dolorum?`,
          tags: [
            "ReactJs",
            "SCSS",
            "WordPress",
            "JavaScript",
            "TypeScript",
            "Something else",
          ],
        },
      ],
      contact: [
        {
          id: "github",
          link: "https://github.com/assaker21",
        },
        {
          id: "instagram",
          link: "https://instagram.com",
        },
        {
          id: "twitter",
          link: "https://twitter.com",
        },
        {
          id: "linkedin",
          link: "https://linkedin.com",
        },
      ],
    })
  );
});

app.get("/portfolio", async (req, res) => {
  try {
    if (!req.query.id) {
      if (req.query.name) {
        req.query.id = (
          await users.findOne({ where: { name: req.query.name } })
        ).id;
      } else {
        req.query.id = 5;
      }
    }

    const pros = (
      await users.findByPk(req.query.id, {
        include: [
          {
            model: projects,
            attributes: ["id", "img", "title", "desc", "tags"],
          },
        ],
      })
    ).projects;

    for (let i = 0; i < pros.length; i++) {
      if (pros[i].tags) pros[i].tags = pros[i].tags.split("___");
    }

    const exps = (
      await users.findByPk(req.query.id, {
        include: [
          {
            model: experiences,
            attributes: ["id", "date", "title", "desc", "tags"],
          },
        ],
      })
    ).experiences;

    for (let i = 0; i < exps.length; i++) {
      if (exps[i].tags) exps[i].tags = exps[i].tags.split("___");
    }

    const socs = await users.findByPk(req.query.id, {
      include: [
        {
          model: social_medias,
          attributes: ["id", "social_app", "link"],
        },
      ],
    });

    for (let i = 0; i < socs.length; i++) {
      if (socs[i].tags) socs[i].tags = socs[i].tags.split("___");
    }

    const user = await users.findByPk(req.query.id);

    res.send({
      user: user,
      social_medias: socs.social_medias,
      projects: pros,
      experiences: exps,
    });
  } catch (error) {
    res.send("Error: " + error);
  }
});

app.get("/insert", (req, res) => {
  users
    .create({
      name: req.query.name,
      about: "In 2014, I embarked on a coding journey by creating websites, ",
      role: "Full-Stack Developer",
    })
    .catch((error) => {
      if (error) {
        console.log("ERROR: " + error);
      }
    });

  for (var i = 0; i < 5; i++) {
    experiences
      .create({
        date: "2018 — PRESENT",
        title: "Some Cool Title for exp",
        desc: `Lorem ipsum dolor sit amet`,
        tags: "ReactJs___SCSS___WordPress___JavaScript___TypeScript",
        userId: 5,
      })
      .catch((error) => {
        if (error) {
          console.log("ERROR: " + error);
        }
      });
  }

  for (var j = 0; j < 5; j++) {
    projects
      .create({
        img: "https://charbelassaker.onrender.com/media/images/flappy-stick/0.jpg",
        title: "Some Cool Title for pro",
        desc: `Lorem ipsum dolor sit`,
        tags: "ReactJs___SCSS___WordPress___JavaScript___TypeScript",
        userId: 5,
      })
      .catch((error) => {
        if (error) {
          console.log("ERROR: " + error);
        }
      });
  }

  social_medias
    .create({
      social_app: "github",
      link: "https://github.com/assaker21",
      userId: 5,
    })
    .catch((error) => {
      if (error) {
        console.log("ERROR: " + error);
      }
    });

  res.send("created successfully");
});

app.get("/delete", (req, res) => {
  user.destroy({ where: { id: 10 } });
  res.send("destroyed successfully");
});

app.get("/test", async (req, res) => {
  try {
    const us = await users.findAll();
    res.send(JSON.stringify(us));
  } catch (err) {
    console.log(err);
  }
});

app.get("/hey", authenticateToken, async (req, res) => {
  res.send("USERNAME: " + req.user.username);
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;

    const user = { username: username };

    console.log(username);
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

function authenticateToken(req, res, next) {
  console.log("token");
  const token = req.cookies.access_token;

  console.log(token);

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("access_token").sendStatus(653);
  }
}
