$(document).ready(function() {

    //Search Bar

    var $search = $("input[name='q']");

    $("span[name='yt']").click(function() {
        var curr = $search.val();
        $search.val("!yt " + curr);
        $search.focus();
    });

    $("span[name='sr']").click(function() {
        var curr = $search.val();
        $search.val("!sr " + curr);
        $search.focus();
    });

    $("span[name='a']").click(function() {
        var curr = $search.val();
        $search.val("!a " + curr);
        $search.focus();
    });

    $("span[name='w']").click(function() {
        var curr = $search.val();
        $search.val("!w " + curr);
        $search.focus();
    });

    //Tabs

    $(this).find(".content").stop().attr({
        opacity: 0
    });
    $(".stripe").mouseenter(function(e,f) {
        $(this).stop().animate({
            width: '100vw'
        });
        $(this).find(".content").stop().animate({
            opacity: 1
        });
    });

    $(".stripe").mouseleave(function() {
        $(this).stop().animate({
            width: '40px'
        });
        $(this).find(".content").stop().animate({
            opacity: 0
        });
    });

});
