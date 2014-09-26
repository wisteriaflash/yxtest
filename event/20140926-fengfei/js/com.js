$(window).on("load", function(){
  //页面入口
  sapp.page.go(location.hash.substr(1));

  //loading
  $("#loading").removeClass("in");
});

$(function(){
  //初始化
  sapp.init({
    page:".page",
    preload:3
  });

  //页面滑动逻辑
  sapp.event.on("swipe", function(e){
    switch(e.dir){
      case "swipeUp" : sapp.page.next(); break;
      case "swipeDown" : sapp.page.prev(); break;
    }
  });


  //分享
  var share = sapp.share({
      text : $("meta[name='shareText']").attr("content"),
       img : $("meta[name='shareImg']").attr("content")
  });
  sapp.event.on("share", function(e){
    Mar.Seed.request("sapp","click","share"); //分享统计
  });

  //分享弹层
  var popShare = $("#popShare");
  var showPopShare = function(e){
    if(e.notEdge) return;
    popShare.addClass("on");
    sapp.page.lock();
  }
  var hidePopShare = function(e){
    popShare.removeClass("on");
    sapp.page.unlock();
  }
  sapp.event.on("pageNext", showPopShare);
  popShare.on("click", hidePopShare);
  sapp.event.on("swipe", function(e){
    if(e.dir=="swipeDown" && popShare.hasClass("on")){
      hidePopShare();
    }
  });
  


  //页面到达统计
  // (function(){
  //   var reach = 1;
  //   sapp.event.on("pageNext",function(e){
  //     if(e.page <= reach) return;
  //     reach = e.page;
  //     Mar.Seed.request("sapp","swipe",("page"+reach));
  //   });
  // })();

  //背景音乐
  sapp.sound.bgmusic("img/bgmusic.mp3");
  $(window).one("touchstart",function(){
    sapp.sound.play();
  });
  $("#music").click(function(){
    if($(this).hasClass("on")){
      sapp.sound.pause();
    }else{
      sapp.sound.play();
    }
    $(this).toggleClass("on");
  });


});
