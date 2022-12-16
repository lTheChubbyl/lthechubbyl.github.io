$(document).ready(function(){
    $('#read-more').hide();
    $('#read-more-btn').click(() => {
        $('#read-more').slideToggle('slow');
    });

    $('#search-btn').click(() => {
        if ($('#property-section-content').height() == 0) {
            $('#no-property').removeClass('hide');
            $('#no-property').html('<i class="fa-solid fa-house-circle-xmark"></i></br></br>There are no properties that match your search criteria!');
            $('#property-filters').parent().addClass('hide');
        }
        else {
            $('#no-property').addClass('hide');
            $('#property-filters').parent().removeClass('hide');
        }
    });

    $("#form-message").keyup(function(){
        $("#char-count").text("500/" + (500 - $(this).val().length));
    });
});
