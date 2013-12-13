$(function(){

var svgObj = {
    svg: null,
    data: {},
    init: function(){
        var me = this;
        me.initVars();
        me.initTest();
    },
    initVars: function(){
        var me = this;
        me.svg = d3.select('body').append('svg');
        me.svg.attr({
            width: 300,
            height: 600
        });
        me.data = {
            'fight': 815,
            'member': [{
                'name': 'Hugo',
                'sex': 'male',
                'age': 27,
                'height': 183
            },{
                'name': 'Kate',
                'sex': 'female',
                'age': 28,
                'height':170
            },{
                'name': 'Jack',
                'sex': 'male',
                'age': 30,
                'height': 185
            },{
                'name': 'Sawyer',
                'sex': 'male',
                'age': 35,
                'height': 182
            },{
                'name': 'John',
                'sex': 'male',
                'age': 40,
                'height': 186
            }]
        };
    },
    initTest: function(){
        var me = this;
        // me.testText();
        // me.testPathText();
        // me.testBaseD3();
        me.d3Start();
        // me.d3Start2();
    },
    testText: function(){
        var me = this;
        me.svg.append('text')
            .attr('x',10)
            .attr('y',20)
            .style('fill', 'steelblue')
            .style('font-size','24px')
            .text('d3测试来着');
    },
    testPathText: function(){
        var me = this;
        //path
        me.svg.append('path').attr({
            id: 'mypath',
            d: 'M50 100Q350 50 350 250Q250 50 50 250'
        }).style({
            fill: 'none',
            stroke: 'green',
            'stroke-width': 10
        });
        //text
        me.svg.append('text').attr({
            x: 10,
            y: 20
        }).style({
            fill: 'red',
            'font-size': '42px'
        }).append('textPath').attr({
            'xlink:href': '#mypath'
        }).text('我是测试路径文字，请看过来');
    },
    testBaseD3: function(){
        var me = this;
        var data = me.data;
            d3.select('body')
              .append('div')
              .attr('class', 'age_bar')
              .selectAll('.age_bar')
              .data(data.member)
              .enter()
              .append('div')
                .attr('class','age_bar')
                .style({
                    width: '50px',
                    float: 'left',
                    margin: '5px',
                    padding: '5px'
                })
              .style('height', function(d){
                return d.age*5+'px';
              })
              .text(function(d){
                return d.name;
                // return d.name+'\'s age is '+d.age;
              });
    },
    d3Start: function(){
        var me = this;
        var data = me.data;
        me.svg.selectAll('circle')
              .data(me.data.member)
              .enter()
              .append('circle');
        var x_scale = d3.scale.linear()
                        .range([60,280])
                        .domain([20,50]);
        var y_scale = d3.scale.linear()
                        .range([280,20])
                        .domain([160,190]);
        d3.selectAll('circle')
          .attr('cx', function(d){return x_scale(d.age)})
          .attr('cy', function(d){return y_scale(d.height)})
          .attr('r',5);
        //axis-x
        var x_axis = d3.svg.axis().scale(x_scale);
        me.svg.append('g')
              .attr('class', 'x__axis')
              .attr('transform','translate(0,280)')
              .call(x_axis);
        //axis-y
        var y_axis = d3.svg.axis().scale(y_scale).orient('left');
        d3.select('svg').append('g')
              .attr('class','y__axis')
              .attr('transform', 'translate(60,0)')
              .call(y_axis);
        //title
        d3.select('.x__axis')
          .append('text')
          .text('age')
          .attr({
            class: 'text',
            x: 150,
            y: 40
          });
          d3.select('.y__axis')
            .append('text')
            .text('height')
            .attr({
                class: 'text',
                x: -20,
                y: 150,
                transform: 'rotate(-90,-20,150)translate(-40,-20)'
            });
        //line
        var line = d3.svg.line()
                .x(function(d){return x_scale(d.age)})
                .y(function(d){return y_scale(d.height)});
        d3.select('svg')
          .append('path')
          .attr('class','line')
          .attr('d',line(data.member));
    },
    d3Start2: function(){
        var me = this;
        var data = me.data;
        var a = 1;
    }
}


//test
var test = {
    init: function(){
        var aa = [{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596688},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596676},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596668},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596534},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596458},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596451},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596346},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596340},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596334},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596279},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596273},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"2","time":1386596129},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595923},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595845},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595839},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595833},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595826},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595195},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595187},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595181},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595174},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595164},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595099},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595091},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595082},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595076},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595070},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595058},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595049},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386595043}];
        var awardlist = ["谢谢你","50Q币","AK47","1Q币","防弹头盔","1Q币","高爆手雷","100Q币"];
        var addAwardList = [{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596688},
        {"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596676},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596668},{"uid":"108214169","nick":"14**09","lottery_code":"1","success_code":"1","time":1386596534},];
        var listNum = 5;

        _getAwardList(aa);
        function _getAwardList(info){
          //filter-data
          var arr = [];
          var item, _single;
          for(var j=0, len=info.length; j<len; j++){
            if(arr.length==listNum){
              break;
            }
            item = info[j];
            if(item["success_code"]>1){
              arr.push(item);
            }
          }
          var _listinfo = "";
          for(var i=0; i<listNum; i++){
            if(i<arr.length){
              _single = arr[i];
            }else{
              _single = addAwardList[i-arr.length];
            }
            var _time = new Date(_single["time"]*1000),
              _month = _time.getMonth()-0+1>9 ? _time.getMonth()-0+1 : "0"+(_time.getMonth()-0+1),
              _day = _time.getDate()-0+1>9 ? _time.getDate()-0 : "0"+(_time.getDate()-0),
              _minutes = _time.getMinutes()>9 ? _time.getMinutes() : "0"+_time.getMinutes(),
              _hours = _time.getHours()>9 ? _time.getHours() : "0"+_time.getHours();
            //
            _listinfo += "<li>恭喜<em>"+ _single["nick"] + "</em>获得 " + awardlist[_single["success_code"]-1]+'<span class="time">'+_month +"-" + _day + "<em>"+_hours +":"+ _minutes +"</em></span><li>";
          }
          $("#J_awardList ul").html(_listinfo);
        }
    }
}

//init
svgObj.init();
test.init();
});