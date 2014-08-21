//test data
  var _testdata = [
    {"name":"home","size":33879959,"x":508,"y":110,"cnid":"易迅APP首页"},
    {"name":"activity","size":13666224,"x":180,"y":170,"cnid":"H5活动页"},
    {"name":"channel","size":10912762,"x":320,"y":350,"cnid":"易抢频道"},
    {"name":"profile","size":9171299,"x":834,"y":200,"cnid":"我的易迅"},
    {"name":"search","size":5868865,"x":543,"y":310,"cnid":"搜索"},
    {"name":"category","size":4821986,"x":714,"y":360,"cnid":"分类"},
    {"name":"list","size":14118918,"x":518,"y":520,"cnid":"列表页"},
    {"name":"detail","size":21789430,"x":320,"y":680,"cnid":"商品详情页"},
    {"name":"cart","size":4256955,"x":644,"y":720,"cnid":"购物车"},
    {"name":"order","size":3165552,"x":519,"y":910,"cnid":"确认订单页"}
  ];

(function(){
  var subBtn = document.getElementById("submit");
  
})()

function pipe(){
  //global
  window.$ = function(eleId){
    return document.getElementById(eleId);
  }
  var wrapper = $("svg_wrapper")
  var w = 1024,
    h = 980; 

//画线的各个点
  var points = [
    [ [374,165],[314,103],[260,52],[190,67] ], //home-activity
    [ [442,231],[421,244],[335,250] ],  //home-channel
    [ [486,225],[510,235],[544,241] ],  //home-search
    [ [526,236],[616,212],[678,257],[714,290] ],//home-category
    [ [580,222],[748,103],[834,116] ], //home-profile
    [ [78,185],[52,290],[185,448],[317,549] ], //activity-detail
    [ [245,452],[306,512],[323,562], ], //channel-detail
    [ [718,252]], //profile-category
    [ [756,280],[800,356],[802,432],[752,490],[632,611]], //profile-cart
    [ [810,325],[820,579],[737,838],[572,826],[521,843]], //profile-order
    [ [486,380],[516,416] ], //search-list
    [ [648,420],[595,406],[532,415] ], //category-list
    [ [428,602],[383,558],[320,574] ], //list-detail
    [ [542,612],[623,648],[751,559],[895,344],[776,270],[745,262],[715,285] ], //list-category
    [ [632,558],[623,354],[636,285],[578,228],[552,235] ], //list-search
    [ [202,746],[154,568],[450,386],[508,420] ],//detail-list
    [ [300,830],[166,810],[108,473],[160,320],[280,230] ],//detail-channel
    [ [385,836],[279,892],[44,790],[36,320],[70,49],[172,78] ], //detail-activity
    [ [450,759],[509,649],[606,631],[645,657] ],//detail-cart
    [ [546,754],[501,672],[398,581],[323,575] ], //cart-detail
    [ [592,804],[553,814],[520,842] ],//cart-order
    [ [650,862],[850,858],[962,338],[940,112],[876,78],[835,112] ], //cart-profile
    [ [668,810],[720,780],[781,583],[781,583],[793,305],[723,286] ], //cart-category
    [ [440,942],[402,806],[456,668],[410,586],[323,576] ], //order-detail
    [ [582,968],[757,868],[766,658],[674,632] ], //order-cart
  ];

  //init pipe
  var pipe = d3.select(wrapper)
        .append("svg") 
        .attr({
          width : w,
          height: h
        })
  var feeds   = pipe.append("g").attr({"class":"feeds"})
  var circles = pipe.append("g").attr({"class":"circles"})
  

  //load csv
  d3.text("pipe.csv",function(text){
    var csv = d3.csv.parseRows(text);
    //console.log(csv);
    var json = buildTree(csv);//csv是占比数据，代表了圆环的占比、线条的粗细
                              //占比越多，线条越粗
    drawCircle(_testdata,json);
  })

  function buildTree(csv){
    var root = {"name":"root","children":[]};
    
    for(var i = 0; i < csv.length; i++){
      var sequence = csv[i][0];
      var size = csv[i][1];
      var totalOtherSize = 0;

      var parts = sequence.split("-");
        var currentNode = root; 
        //console.log(parts.length);
        for (var j = 0; j < parts.length; j++) {
            var children = currentNode["children"];
            var nodeName = parts[j];
            var childNode;
            if (j + 1 < parts.length) {
            var foundChild = false;
            for (var k = 0; k < children.length; k++) {
              if (children[k]["name"] == nodeName) {
                  childNode = children[k];
                  foundChild = true;
                  break;
              }
            }
            if (!foundChild) {
              childNode = {"name": nodeName, "children": []};
              children.push(childNode);
            }
            currentNode = childNode;
            } else {
              if(parseFloat(size) > 1){
            childNode = {"name": nodeName, "size": size};
              children.push(childNode);
              }else{
                totalOtherSize += size;
              }
            }
        }
      }
      //console.log(root);
    return root;
  }
  
  //filter 1% data

  function filterData(value,json){

  }

  var count = -1;

  //visualization

  function drawCircle(testdata,json){
    //var coe = 100/320000;
    var minSize = d3.min(testdata,function(d){
      return d.size;
    })
    var maxSize = d3.max(testdata,function(d){
      return d.size;
    })

    var outerScale = d3.scale.log()
              .domain([minSize,maxSize])
              .range([50,100]);
    var innerScale = d3.scale.log()
              .domain([minSize,maxSize])
              .range([10,20]);
    var lineScale = d3.scale.linear()
                .domain([minSize,maxSize])
                .range([22,44]);
    for(var i in testdata){

      var outerRadius = outerScale(testdata[i].size);
      var innerRadius = outerRadius - innerScale(testdata[i].size);

      var circle = circles.append("g").attr({
        "class" : testdata[i].name
      });
      var upArcLayer = circle.append("g");
      var hrLayer = circle.append("g");
      var downArcLayer = circle.append("g").attr({"class" : "downarclayer"});
      var textLayer = circle.append("g").attr({"class":"textlayer"});
      var dataLayer = circle.append("g").attr({"class":"datalayer"});

      var upArc = d3.svg.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius)
              .startAngle(-0.5 * Math.PI)
              .endAngle(0.5 * Math.PI);
      var lineSet = [
        {"x":testdata[i].x - innerRadius - lineScale(testdata[i].size), "y":testdata[i].y+4},
        {"x":testdata[i].x - innerRadius,"y":testdata[i].y+4},
        {"x":testdata[i].x + innerRadius,"y":testdata[i].y+4},
        {"x":testdata[i].x + innerRadius + lineScale(testdata[i].size),"y":testdata[i].y+4}
      ];

      upArcLayer.append("path")
          .attr({
            "d" : upArc,
            "class" : "uparclayer",
            "transform" : "translate(" + testdata[i].x +"," + testdata[i].y + ")"
          });
      
      //console.log(lineSet[1].y);
      
      hrLayer.append("path")
          .attr({
            "d" : "M" + lineSet[0].x + "," + lineSet[0].y + "L"+ lineSet[1].x + "," + lineSet[1].y + 
                "M" + lineSet[2].x + "," + lineSet[2].y + "L"+ lineSet[3].x + "," + lineSet[3].y,
            "stroke" : "#fff",
                  "stroke-width": "2",
                  "fill":"none"
          });

      textLayer.append("text")
          .text(testdata[i].cnid)
          .attr({
            "x" : testdata[i].x,
            "y" : testdata[i].y,
            "class": "text",
            "text-anchor" : "middle"
          })

      dataLayer.append("text")
          .text(testdata[i].size)
          .attr({
            "x" : testdata[i].x,
            "y" : testdata[i].y + 22,
            "class" : "data",
            "text-anchor" : "middle"
          })

      var currentNode = json.children[i];
      var startArc = -0.5 * Math.PI;

      for(var j in currentNode.children){
        var perPie = parseFloat(currentNode.children[j].size)/100 * Math.PI;
        var endArc =  startArc - perPie;
        var startX = testdata[i].x + Math.sin((endArc + startArc)/2) * (outerRadius);
        var startY = testdata[i].y - Math.cos((endArc + startArc)/2) * (outerRadius+8);
        //console.log(startX);
        //console.log(startArc);
        var perArc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(startArc)
                .endAngle(endArc);

        downArcLayer.append("path")
              .attr({
                "d" : perArc,
                "transform" : "translate(" + testdata[i].x +"," + (testdata[i].y+8) + ")",
                "class" : "arc" + currentNode.children[j].name
              });


        for( var k in testdata){
          if( testdata[k].name == currentNode.children[j].name&& currentNode.children[j].name != "home"){

          /*downArcLayer.append("circle")
              .attr({
                "cx" : startX,
                "cy" : startY,
                "r"  : 2,
                "fill" : "red"
              });
          */
          //console.log(testdata[k].name);
          var endX = testdata[k].x;
          var endY = testdata[k].y - outerScale(testdata[k].size);

          /*upArcLayer.append("circle")
              .attr({
                "cx" : endX,
                "cy" : endY,
                "r"  : 2,
                "fill" : "red"
              })
          */
          count++;
          drawLine(startX,startY,endX,endY,currentNode.children[j].size,count,testdata[i].size)

          }


        }

        


        startArc = endArc;
      }
    } 
  }

  function drawLine(startx,starty,endx,endy,size,j,testdata){
    var pipeScale = d3.scale.linear()
                .domain([223244,10163987])
                .range([1,20]);
    var pipeSize = Math.round(pipeScale( testdata * (parseFloat(size)/100)) );
    //console.log(pipeSize);
    var data = points[j];
    //console.log(j);
    data.unshift([startx,starty]);
    data.push([endx,endy]);

    // console.log(j,"===",data);
    var line = d3.svg.line()
            .x(function(d){return d[0];})
            .y(function(d){return d[1];})
            .interpolate("basis");
    feeds.append("path")
      .attr({
        "d" : line(data), 
        "stroke-width" : pipeSize +"px",
        "class" : "lines"
      })
    data.shift([startx,starty]);
    data.pop([endx,endy]);
  }
//var mousePoints = d3.mouse(pipe.node());



};