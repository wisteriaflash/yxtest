$(function(){
    var svg = d3.select('body').append('svg');
    svg.attr({
        width: '100%',
        height: 500
    });
    //text
    // svg.append('text')
    //     .attr('x',10)
    //     .attr('y',20)
    //     .style('fill', 'steelblue')
    //     .style('font-size','24px')
    //     .text('d3测试来着');

    //path-text
    svg.append('path').attr({
        id: 'mypath',
        d: 'M50 100Q350 50 350 250Q250 50 50 250'
    }).style({
        fill: 'none',
        stroke: 'green',
        'stroke-width': 10
    });
    svg.append('text').attr({
        x: 10,
        y: 20
    }).style({
        fill: 'red',
        'font-size': '42px'
    }).append('textPath').attr({
        'xlink:href': '#mypath'
    }).text('我是测试路径文字，请看过来');
});