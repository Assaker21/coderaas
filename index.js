const navs = document.querySelectorAll(".nav");
let on_nav = navs[0];

about_scroll = 0;
exp_scroll = 450;
projects_scroll = 2130;

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

fetchData();

function fetchData() {
  fetch("https://coderaas-server1.onrender.com/portfolio")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.querySelector(".loading").classList.add("hidden");
      let wrapper = document.querySelector(".wrapper");
      wrapper.classList.remove("hidden");
      wrapper.querySelector("h1").innerHTML = data.name;
      wrapper.querySelector("#about-text").innerHTML = data.about;

      let experiences_HTML = "<h3>Experience</h3>\n";
      for (let i = 0; i < data.experience.length; i++) {
        exp = data.experience[i];
        techs = "";
        console.log(exp.tags);
        for (let j = 0; j < exp.tags.length; j++) {
          techs += `<div class="tech">${exp.tags[j]}</div>\n`;
        }
        experiences_HTML += `<div class="card">
      <div class="dates">${exp.date}</div>
      <div class="info">
        <div class="position-title">${exp.title}</div>
        <span class="desc"
          >${exp.desc}</span
        >
        <div class="technologies">
            ${techs}
        </div>
      </div>
    </div>
    `;
      }

      wrapper.querySelector("#experience").innerHTML = experiences_HTML;

      let projects_HTML = "<h3>Experience</h3>\n";
      for (let i = 0; i < data.projects.length; i++) {
        pro = data.projects[i];
        techs = "";
        for (let j = 0; j < pro.tags.length; j++) {
          techs += `<div class="tech">${pro.tags[j]}</div>\n`;
        }
        projects_HTML += `<div class="card">
        <img
        src=${pro.img}
        alt=""
      />
      <div class="info">
        <div class="position-title">${pro.title}</div>
        <span class="desc"
          >${pro.desc}</span
        >
        <div class="technologies">
            ${techs}
        </div>
      </div>
    </div>
    `;
      }

      wrapper.querySelector("#experience").innerHTML = experiences_HTML;
      wrapper.querySelector("#projects").innerHTML = projects_HTML;

      for (let i = 0; i < data.contact.length; i++) {
        wrapper.querySelector(`#${data.contact[i].id}`).href =
          data.contact[i].link;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      fetchData();
    });
}
