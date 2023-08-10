$(document).ready(function() {
    AOS.init();

    var distance = $("#services").offset().top;

    $(window).scroll(function() {
        if ( $(window).scrollTop() >= distance ) {
            $("#navigation").fadeIn(400);
        }
        else {
            $("#navigation").fadeOut(400);
        }
    });

    $("#copyright p span").html(new Date().getFullYear());


    $("#btn").on("click", function() {
        let fname = $("#fname");
        let lname = $("#lname");
        let email = $("#email");
        let number = $("#phone-number");
        let message = $("#message");

        errors = 0;

        let regExName = /^[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/;
        if (regExValidation(fname, regExName)) {
            errors++;
        }
        if (regExValidation(lname, regExName)) {
            errors++;
        }
        let regExEmail = /^[\w\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (regExValidation(email, regExEmail)) {
            errors++;
        }
        let regExNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/;
        if (regExValidation(number, regExNumber)) {
            errors++;
        }
        let regExMessage = /^[\s\S]{1,500}$/;
        if (regExValidation(message, regExMessage)) {
            errors++;
        }

        if (errors == 0) {
            let data = {
                "fname": fname.val(),
                "lname": lname.val(),
                "email": email.val(),
                "number": number.val(),
                "message": message.val()
            }

            ajaxCallback("models/form.php", "post", data, 
                function(result) {
                    console.log(result);
                }, 
                function (xhr) {
                    console.log(xhr);
                }
            )
        }
    });
});

function regExValidation(input, regEx) {
	if(!input.val().match(regEx)) {
		input.addClass("is-invalid");
        return true;
	}
	else{
		input.removeClass("is-invalid");
        return false;
	}
}

function ajaxCallback(url, method, data, result, xhr) {
    $.ajax({
        "url": url,
        "method": method,
        "data": data,
        "dataType": "json",
        "success": result,
        "error": xhr
    });
}