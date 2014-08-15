var clickme = false;
var clickId = -1;
    $("#special_taste").click(function(){
      clickme = true;
      //点击的计时器
      clearTimeout(clickId);
      clickId = setTimeout(function(){
        clickme = false;
        actHide();
      }, 10000);
    });

function actHide() {
    
    if (clickme) {
      $("#special_taste").animate({"top":-winH},1000);
      $(".container").css({"height":"auto","overflow":"auto"});
      clearInterval(dY);
    }
  }
  setTimeout(actHide,10000);