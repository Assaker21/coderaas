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

for(var i = 0; i < navs.length; i++) {
    navs[i].onclick = (e) => {
        let k = i;
        changeOnNav(e.target);
    }
}

window.addEventListener('scroll', function(event) {
    var scrollPosition = window.scrollY;
    console.log(event.target.scrollingElement.scrollTop);

    if(scrollPosition > projects_scroll) {
        changeOnNav(navs[2]);
    }
    else if(scrollPosition > exp_scroll) {
        changeOnNav(navs[1]);
    }
    else {
        changeOnNav(navs[0]);
    }
  });