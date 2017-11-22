var same = 0; //用于避免触碰到相同标签式是发生切换
var interval = 3000; //图片切换时间
var timer; //计时器
/*********显示和隐藏图片************/
$("#player img").hide();
$("#player img").eq(0).show();
console.log($("#player img").eq(0));
$("#tags img").mouseover(function() {
    var tags = $("#tags img").index(this);
    if (same != tags) {
        $("#player img").fadeOut();
        $("#player img").eq(tags).fadeIn(500);
    }
    same = tags;
});
/*********自动播放图片***********/
function autoplay() {
    same++;
    if (same >= $("#tags img").length) {
        same = 0;
    }
    $("#player img").fadeOut();
    $("#player img").eq(same).fadeIn(500);
}
/**********播放图片切换**************/
function play() {
    timer = setInterval(autoplay, interval);
}
/**********停止图片切换**************/
function stop() {
    clearInterval(timer);
}
/*****鼠标悬浮或移出时播放或停止切换图片***/
$("#content").hover(function() {
        stop();
    },
    function() {
        play();
    });
play();