const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");
const { users, social_medias, experiences, projects } = require("./models");

app.use(
  cors({
    origin: "*",
  })
);

db.sequelize.sync().then((req) => {
  app.listen(3000, () => {
    console.log(`Server is listening at http://localhost:${3000}`);
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
      req.query.id = (
        await users.findOne({ where: { name: req.query.name } })
      ).id;
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

    const socs = await users.findByPk(req.query.id, {
      include: [
        {
          model: social_medias,
          attributes: ["id", "social_app", "link"],
        },
      ],
    });

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

  experiences
    .create({
      date: "2018 — PRESENT",
      title: "Some Cool Title for exp",
      desc: `Lorem ipsum dolor sit amet`,
      userId: 1,
    })
    .catch((error) => {
      if (error) {
        console.log("ERROR: " + error);
      }
    });

  projects
    .create({
      img: "https://charbelassaker.onrender.com/media/images/flappy-stick/0.jpg",
      title: "Some Cool Title for pro",
      desc: `Lorem ipsum dolor sit`,
      tags: "ReactJs___SCSS___WordPress___JavaScript___TypeScript",
      userId: 1,
    })
    .catch((error) => {
      if (error) {
        console.log("ERROR: " + error);
      }
    });

  social_medias
    .create({
      social_app: "github",
      social_link: "https://github.com/assaker21",
      userId: 1,
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
