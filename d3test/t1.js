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
        //坐标-x
        var x_axis = d3.svg.axis().scale(x_scale);
        me.svg.append('g')
              .attr('class', 'x__axis')
              .attr('transform','translate(0,280)')
              .call(x_axis);
        //-y
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
        
    }
}

//init
svgObj.init();

});