/* _*-*_ BEGIN|CONTACT FORM VALIDATION _*-*_ */
var formSubmit = document.querySelector('#form-btn');
formSubmit.addEventListener('click', formValidation);
var errors = 0;

function regExValidation(formPart, regEx, errorMessage) {
    if(!regEx.test(formPart.value)) {
        formPart.classList.add('border-2', 'border-danger', 'rounded');
        formPart.parentElement.nextElementSibling.innerHTML = errorMessage;
        formPart.parentElement.nextElementSibling.classList.remove('hide');
        errors++;
    }
    else{
        formPart.classList.remove('border-2', 'border-danger', 'rounded');
        formPart.parentElement.nextElementSibling.innerHTML = '';
        formPart.parentElement.nextElementSibling.classList.add('hide');
    }
}

function formValidation() {
    errors = 0;
    let formFullName, formEmail, formSubject, formMessage, formTerms, formSuccess;
    let regExFullName, regExEmail, regExSubject, regExMessage;

    formFullName = document.querySelector('#form-name');
    formEmail = document.querySelector('#form-email');
    formSubject = document.querySelector('#form-subject');
    formMessage = document.querySelector('#form-message');
    formTerms = document.querySelector('#form-terms-conditions');
    formSuccess = document.querySelector('#no-error-message');

    regExFullName = /^[A-ZČĆŠĐŽ][a-zčćđšž]{2,14}([\s][A-ZČĆŠĐŽ][a-zčćđšž]{2,14})+$/;
    regExEmail = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    regExSubject = /^[A-ZČĆŠĐŽa-zčćđšž0-9\s\.,!?""-]{3,}$/;
    regExMessage = /^.{10,}$/;

    regExValidation(formFullName, regExFullName, 'Field "Full name" accepts only letters. </br><em><small> - example: John Doe</small></em>');
    regExValidation(formEmail, regExEmail, 'Field "E-mail" is invalid. </br><em><small> - example: john.doe@gmail.com</small></em>');
    regExValidation(formSubject, regExSubject, 'Field "Subject" accepts letter, numbers and (!?.,-")');
    regExValidation(formMessage, regExMessage, 'Field "Message" must have at least 10 characters.');

    if(!formTerms.checked) {
        formTerms.classList.add('border-2', 'border-danger', 'rounded');
        formTerms.nextElementSibling.classList.add('text-danger');
    }
    else {
        formTerms.classList.remove('border-2', 'border-danger', 'rounded');
        formTerms.nextElementSibling.classList.remove('text-danger');
    }

    if(errors==0) {
        formSuccess.classList.remove('hide');
        formSuccess.innerHTML = 'Thank you for contacting us. We will reply to your message ASAP!';
        document.getElementById("form-contact").reset();
        // document.getElementById("form-btn").removeAttribute('disabled');
    }
}
/* _*-*_ END|CONTACT FORM VALIDATION _*-*_ */