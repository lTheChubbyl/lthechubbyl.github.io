$(document).ready(function() {
    var distance = $("#services").offset().top;

    $(window).scroll(function() {
        if ( $(window).scrollTop() >= distance ) {
            $("#navigation").fadeIn(400);
        }
        else {
            $("#navigation").fadeOut(400);
        }
    });
    
});