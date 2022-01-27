(function () {
  var backtop = document.getElementById("backtop");

  var timer;
  backtop.onclick = function () {
    clearInterval(timer);
    timer = setInterval(function () {
      document.documentElement.scrollTop -= 200;
      if (document.documentElement.scrollTop <= 0) {
        clearInterval(timer);
      }
    }, 20);
  };

  window.onscroll = function(){
    var scrollTop = document.documentElement.scrollTop || window.scrollY;

    if(scrollTop  == 0 ){
      backtop.style.display = "none"
    }else{
      backtop.style.display = "block"
    }
  }
})();
