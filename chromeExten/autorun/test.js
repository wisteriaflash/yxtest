$(function(){
    var config = $('#J_slider').attr('bx-config');
    var range = ["16","24","32","40","48","50","64"];
    var rangeStr = range.join(',');
    //
    config = '{current: "32", range: ['+rangeStr+']}';
    $('#J_slider').attr('bx-config',config);
});