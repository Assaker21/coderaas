import { useEffect, useState } from "react";
import axios from "axios";
import Experience from "./components/experience.component";
import Project from "./components/project.component";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function initNavigation() {
    const navs = document.querySelectorAll(".nav");
    let on_nav = navs[0];

    const about_scroll = 0;
    const exp_scroll = 450;
    const projects_scroll = 2130;

    function changeOnNav(new_nav) {
      on_nav.classList.remove("on");
      on_nav = new_nav;
      on_nav.classList.add("on");
    }

    for (var i = 0; i < navs.length; i++) {
      navs[i].onclick = (e) => {
        changeOnNav(e.target);
      };
    }

    window.addEventListener("scroll", function (event) {
      var scrollPosition = window.scrollY;

      if (scrollPosition > projects_scroll) {
        changeOnNav(navs[2]);
      } else if (scrollPosition > exp_scroll) {
        changeOnNav(navs[1]);
      } else {
        changeOnNav(navs[0]);
      }
    });
  }

  function fetchData() {
    fetch("https://coderaas-server1.onrender.com/portfolio")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        fetchData();
      });
  }

  function downloadTextAsJson(text, fileName) {
    const blob = new Blob([text], { type: "application/json" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function fetchData2() {
    try {
      const response = await axios.get("http://localhost:3000/hey", {
        withCredentials: true,
      });

      console.log("FETCHED DATA SUCCESSFULLY");
    } catch (error) {
      if (error.response.status == 653) {
        console.log("FETCHED DATA UNSUCCESSFULLY");
        setLogin(true);
      } else {
        console.log("FETCHED DATA UNSUCCESSFULLY BAD");
      }
    }
  }

  async function doLogin() {
    setLogin(false);
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
      setLogin(true);
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    console.log(username + " " + password);

    await doLogin();

    console.log("SHOULD FETCH DATA NOW");
    fetchData2();
  }

  useEffect(() => {
    initNavigation();
    //fetchData();
    fetchData2();
  }, []);

  return (
    <>
      {!login && (
        <>
          <div className={"loading" + (data ? " hidden" : "")}>
            <object
              type="image/svg+xml"
              data="loading.svg"
              width="100"
              height="100"
            ></object>
          </div>
          <div className={"wrapper" + (!data ? " hidden" : "")}>
            <header className="header">
              <div className="info">
                <h1>{data?.user.name}</h1>
                <h2>{data?.user.role}</h2>
                <button
                  className="download-button"
                  onClick={() => {
                    downloadTextAsJson(JSON.stringify(data), "data.json");
                  }}
                >
                  Download data
                </button>
                <nav>
                  <ul>
                    <li>
                      <a className="nav on" href="#about">
                        <div className="line"></div>
                        ABOUT
                      </a>
                    </li>
                    <li>
                      <a className="nav" href="#experience">
                        <div className="line"></div>
                        EXPERIENCE
                      </a>
                    </li>
                    <li>
                      <a className="nav" href="#projects">
                        <div className="line"></div>
                        PROJECTS
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="contact">
                <a
                  className="contact-icon"
                  id="github"
                  target="_blank"
                  href="https://github.com/assaker21"
                >
                  <i className="bx bxl-github"></i>
                </a>
                <a
                  className="contact-icon"
                  id="instagram"
                  target="_blank"
                  href="https://instagram.com"
                >
                  <i className="bx bxl-instagram"></i>
                </a>
                <a
                  className="contact-icon"
                  id="twitter"
                  target="_blank"
                  href="https://x.com"
                >
                  <i className="bx bxl-twitter"></i>
                </a>
                <a
                  className="contact-icon"
                  id="linkedin"
                  target="_blank"
                  href="https://linkedin.com"
                >
                  <i className="bx bxl-linkedin-square"></i>
                </a>
              </div>
            </header>

            <section className="main">
              <section id="about" className="about">
                <span id="about-text">
                  {data?.user.about
                    .replaceAll("<br /> <br />", "<br /><br />")
                    .split("<br /><br />")
                    .map((item, index) => {
                      return (
                        <p key={"About: " + index}>
                          {index != 0 ? <br /> : ""}
                          <p key={"About: " + index}>{item}</p>
                        </p>
                      );
                    })}
                </span>
              </section>
              <section id="experience" className="experience">
                <h3>Experience</h3>
                {data?.experiences.map((exp, index) => {
                  return <Experience exp={exp} index={index} />;
                })}
              </section>
              <section id="projects" className="projects">
                <h3>Projects</h3>
                {data?.projects.map((pro, index) => {
                  return <Project pro={pro} index={index} />;
                })}
              </section>
            </section>
          </div>
        </>
      )}

      {login && (
        <form className="login-container" onSubmit={handleOnSubmit}>
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button className="login-button">Submit</button>
        </form>
      )}
    </>
  );
}

export default App;
