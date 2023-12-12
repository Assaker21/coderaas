const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.listen(3000, () => {
  console.log(`Server is listening at http://localhost:${3000}`);
});

app.get("/portfolio", async (req, res) => {
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
