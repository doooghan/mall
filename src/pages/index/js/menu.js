(function () {
  var banner_nav_ul = document.getElementById("banner-nav-ul");
  var menus = document.querySelectorAll(".menus-box .menu");
  banner_nav_ul.onmouseover = function (e) {
    if (e.target.tagName.toLowerCase() == "li") {
      var t = e.target.getAttribute("data-t");
      console.log(t);

      for (var i = 0; i < menus.length; i++) {
        menus[i].className = "menu";
      }
      var themenu = document.querySelector(`.menus-box .menu[data-t=${t}]`);
      themenu.className = "menu current";
    }
  };
  banner_nav_ul.onmouseleave = function () {
    for (var i = 0; i < menus.length; i++) {
      menus[i].className = "menu";
    }
  };
})();
