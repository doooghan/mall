(function () {
  var carousel_list = document.getElementById("carousel-list");
  var left_btn = document.getElementById("leftbtn");
  var right_btn = document.getElementById("rightbtn");
  var circle_ol = document.getElementById("circle-ol");
  var circle_list = circle_ol.getElementsByTagName("li");

  var banner = document.getElementById("banner");

  var clone_li = carousel_list.firstElementChild.cloneNode(true);
  carousel_list.appendChild(clone_li);

  var lock = true;
  var index = 0;
  function right_btn_handler() {
    if (!lock) return;
    lock = false;
    carousel_list.style.transition = "transform 0.5s ease 0s";
    index++;
    carousel_list.style.transform = `translateX(${-16.66 * index}%)`;
    if (index > 4) {
      setTimeout(function () {
        index = 0;
        carousel_list.style.transition = "none";
        carousel_list.style.transform = "none";
      }, 500);
    }
    setCircles();
    setTimeout(function () {
      lock = true;
    }, 500);
  }

  right_btn.onclick = right_btn_handler;

  left_btn.onclick = function () {
    if (!lock) return;
    lock = false;
    // debugger
    if (index == 0) {
      index = 5;
      carousel_list.style.transition = "none";
      carousel_list.style.transform = `translateX(${-16.66 * index}%)`;
      index--;
      setTimeout(function () {
        carousel_list.style.transition = "transform 0.5s ease 0s";
        carousel_list.style.transform = `translateX(${-16.66 * index}%)`;
      }, 0);
    } else {
      index--;
      carousel_list.style.transform = `translateX(${-16.66 * index}%)`;
    }
    setCircles();
    setTimeout(function () {
      lock = true;
    }, 500);
  };

  function setCircles() {
    for (var i = 0; i < circle_list.length; i++) {
      if (i == index % circle_list.length) {
        circle_list[i].className = "current";
      } else {
        circle_list[i].className = "";
      }
    }
  }

  circle_ol.onclick = function (e) {
    if (e.target.tagName.toLowerCase() == "li") {
      var n = e.target.getAttribute("data-n");
      // alert(n)
      index = n;
      carousel_list.style.transform = `translateX(${-16.66 * index}%)`;
      setCircles();
    }
  };

  var timer = setInterval(right_btn_handler, 2000);
  banner.onmouseenter = function () {
    clearInterval(timer);
  };
  banner.onmouseleave = function () {
    clearInterval(timer);
    timer = setInterval(right_btn_handler, 2000);
  };
})();
