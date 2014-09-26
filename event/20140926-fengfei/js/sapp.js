/*
*单屏框架 - sapp
*开发部门：ued
*作者：蕉皮、泽飞
*版本：v1.2
*更新时间：2014-08-12
*/
//sapp框架
var sapp = (function(){
  var _e = {}, _p = {};
  _p.move = function(e){
    event.preventDefault();
  },
  _p.start = function(e){
    _p.ox = e.clientX || e.changedTouches[0].clientX;
    _p.oy = e.clientY || e.changedTouches[0].clientY;
  },
  _p.end = function(e){
    _p.nx = e.clientX || e.changedTouches[0].clientX;
    _p.ny = e.clientY || e.changedTouches[0].clientY;
    //
    var dx = _p.nx - _p.ox,
      dy = _p.ny - _p.oy;
    if(dx*dx+dy*dy < 25) return;
    
    if(Math.abs(dx) > Math.abs(dy)){
      sapp.event.call("swipe", {dir:(dx>0 ? "swipeRight" : "swipeLeft")});
    }else{
      sapp.event.call("swipe", {dir:(dy>0 ? "swipeDown" : "swipeUp")});
    }
  };

  document.addEventListener("touchstart", _p.start);
  document.addEventListener( "touchmove", _p.move);
  document.addEventListener(  "touchend", _p.end);
  document.addEventListener( "mousedown", _p.start);
  document.addEventListener(   "mouseup", _p.end);
  document.onmousewheel = function(e){
    sapp.event.call("swipe", {dir:(e.wheelDelta>0 ? "swipeDown" : "swipeUp")});
  };
  //
  return _e;
})();


//初始化
sapp.init = function(para){
  var p = $(para.page),
    _pages = {},
    _lock = false;

  sapp.page = {
    now : -1,
    out : -1,
    length : p.length,
    next : function(){
      if(_lock) return;
      var _notEdge = this.now+1 <= this.length;
      if(_notEdge) this.go(this.now+1);
      sapp.event.call("pageNext",{page:this.now, notEdge:_notEdge});
    },
    prev : function(){
      if(_lock) return;
      var _notEdge = this.now-1 >= 1;
      if(_notEdge) this.go(this.now-1);
      sapp.event.call("pagePrev",{page:this.now, notEdge:_notEdge});
    },
    go : function(index){
      if(_lock) return;
      index = parseInt(index) || 1;
      if(index==this.now || index<1 || this.length<index) return;
      
      var outPage = _pages[this.out],
        nowPage = _pages[this.now];
      this.out = this.now;
      this.now = index;
      if(outPage) outPage.sec.removeClass("out");
      if(nowPage) nowPage.sec.removeClass("in").addClass("out");
      _pages[index].sec.addClass("in");
      //
      //
      for(var i=0;i<para.preload;i++){
        var nextLoad = index + i;
        if(nextLoad > this.length) break;
        _pages[nextLoad].load();
      }
      //
      sapp.event.call("pageGo",{page:this.now});
      //
      sapp.page.lock();
      setTimeout(sapp.page.unlock, 1000);
    },
    lock:function(){_lock=true;},
    unlock:function(){_lock=false;}
  };
  for(var i=0; i<sapp.page.length; i++){
    var newPage = {
       index : i+1,
         sec : p.eq(i),
        main : p.eq(i).children(".main"),
      loaded : false
    };
    newPage.name = newPage.sec.attr("id");
    newPage.load = function(){
      if(!this.loaded) {
        this.loaded=true;
        this.sec.addClass("onload");
      }
      return newPage;
    }
    //
    sapp.page[newPage.name] = newPage;
    _pages[newPage.index] = newPage;
    //
    if(newPage.index<=para.preload) newPage.load();
  }
  _pages[sapp.page.length].load();
};

//事件模块
sapp.event = (function(){
  var _e = {}, _p = {};
  _p.pool = {};

  //调度事件
  _e.call = function(name, e){
    var lis = _p.getPool(name).listeners;
    for(var i in lis) lis[i](e || {});
  }
  //绑定事件
  _e.on = function(name, func){
    var lis = _p.getPool(name).listeners,
      pos = _p.getFuncPos(lis, func);
    if(typeof func=="function" && pos==-1) lis.push(func);
    return _e;
  }
  //松绑事件
  _e.off = function(name, func){
    var lis = _p.getPool(name).listeners,
      pos = _p.getFuncPos(lis, func);
    if(pos!=-1) lis.splice(pos, 1);
    return _e;
  }

  //_侦听器位置查询
  _p.getFuncPos = function(array, func){
    for(var i in array){
      if(array[i]===func) return i;
    }
    return -1;
  }
  //_获取事件
  _p.getPool = function(name){
    _p.pool[name] = _p.pool[name] || {listeners:[]};
    return _p.pool[name];
  };
  return _e;
})();

//ua模块
sapp.ua = (function(){
  var _e;
  var _str = navigator.userAgent.toLowerCase();
  var has = function(value){
    return  _str.indexOf(value)!=-1;
  };
  _e = {
    toString : function(){return _str},
      weixin : has("micromessenger"),
        uc : has("ucbrowser"),
       ucweb : has("ucweb"),
     android : has("android"),
        ipad : has("ipad"),
      iphone : has("iphone"),
       ios : has("ipad") || has("iphone") || has("ipod")
  };
  return _e;
})();


//声音模块
sapp.sound = (function(){
  var _e={}, _p={};
  _p.pool = {};
  _e.add = function(src, para){
    var sp = src.split(/\/|\./);
    var name = sp[sp.length-2];
    _p.pool[name] = $.extend(new Audio(src), {
      preload : true
    }, para);
    $(_p.pool[name]).on("ended", function(e){
      e.target.currentTime=0;
      if(e.target.currentTime) e.target.src = e.target.src;
      if(e.target.loop) {
        e.target.play();
      }else {
        e.target.pause();
        if(_p.bgmusic && _p.bgmusicPlaying) _p.bgmusic.play();
      }
    });
  };
  _e.play = function(name, posTime){
    if(!name || name=="bgmusic"){
      if(_p.bgmusic) {
        _p.bgmusicPlaying = true;
        _p.bgmusic.play();
      }
      return;
    }
    var tar = _p.pool[name];
    if(!tar) return;
    try{
      tar.currentTime = posTime || 0;
    }catch(e){}
    if(_p.bgmusic) _p.bgmusic.pause();
    tar.play();
  };
  _e.pause = function(name){
    if(!name || name=="bgmusic"){
      if(_p.bgmusic) {
        _p.bgmusicPlaying = false;
        _p.bgmusic.pause();
      }
      for(var i in _p.pool) _p.pool[i].pause();
      return;
    }

    var tar = _p.pool[name];
    if(tar) tar.pause();
    if(_p.bgmusic && _p.bgmusicPlaying) _p.bgmusic.play();
  };
  //背景音乐
  _e.bgmusic = function(src, para){
    _p.bgmusic = $.extend(new Audio(src), {
       preload : true,
          loop : true,
      autoplay : true,
    }, para);
    _p.bgmusicPlaying = _p.bgmusic.autoplay;
  }
  return _e;
})();


//自适应模块
sapp.fill = function(para){
  var MODE = {
      width : "100% 0%",
     height : "0% 100%",
      cover : "0% 0%",
    contain : "100% 100%"
  };

  para = $.extend({
     width : 640,
    height : 960,
      mode : "100% 100%"
  },para);

  var tar = $(para.target),
    con = $(window);

  para.mode = (MODE[para.mode] || para.mode).split(" ");
  para.mode[1] = para.mode[1] || para.mode[0];
  
  $(window).resize(function(){
    var ratioW = con.width()/para.width,
      ratioH = con.height()/para.height,
      ratioMax = Math.max(ratioW,ratioH),
      ratioMin = Math.min(ratioW,ratioH),
      ratioMainW = ratioW/parseInt(para.mode[0])*100,
      ratioMainH = ratioH/parseInt(para.mode[1])*100,
      ratio = Math.min(ratioMainW, ratioMainH, ratioMax);

    tar.css({width:parseInt(ratio*para.width), height:parseInt(ratio*para.height)});
  }).resize();
}

