if (location.pathname == '/lock_key/index.html' || location.pathname == '/lock_key/') {
// if (location.pathname == '/index.html' || location.pathname == '/') {
    /* _*-*_ BEGIN|DYNAMIC "PROPERTY LISTING" CONTENT _*-*_ */
    var propertySectionContent = document.getElementById('property-section-content');
    const contentPropertyMatrix = [
        ['For Sale', 'Home', '500.000', 'Halpine Manor', '528 Whitemarsh Ave. Brentwood, New York', 'blue_house'],
        ['For Rent', 'Villa', '9.999', 'Brownhill Villa', '5 Lafayette Ave. Bronx, New York', 'villa'],
        ['For Sale', 'Apartment', '250.000', 'Powlett House', '9034 Franklin St. Freeport, New York', 'apartment'],
        ['For Rent', 'Home', '4.999', 'Moore Estate', '9370 Willow St. Massapequa, New York', 'green_house'],
        ['For Sale', 'Home', '100.000', 'McArthy Garden', 'Canal St. Hempstead, New York', 'brown_house'],
        ['For Sale', 'Building', '150.000.000', 'Sabilline Building ', '8465 Sunnyslope Drive Bronx, New York', 'building_construction']
    ];

    const contentPropertyDetails = [[1000, 6, 4], [500, 3, 2], [1000, 6, 4], [500, 3, 2], [1000, 6, 4], [500, 3, 2]];

    const contentPropertyDivClasses = ['property-list-part col-lg-4 col-md-6', 'property-item rounded overflow-hidden', 'position-relative overflow-hidden', 'sale-or-rent bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3', 'bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3', 'p-4 pb-0', 'd-flex border-top'];

    const contentPropertyIconClasses = ['fa fa-ruler-combined text-primary me-2', 'fa fa-bed text-primary me-2', 'fa fa-bath text-primary me-2'];

    for (let index = 0; index < 6; index++) {
        for(let index = 1; index <= 7; index++) {
            window['propertyDiv' + index] = document.createElement('div');
            window['propertyDiv' + index].setAttribute('class', contentPropertyDivClasses[index-1]);
        }
        let propertyAnchor1 = document.createElement('a');
        propertyAnchor1.setAttribute('href', '#property-section');
        propertyAnchor1.setAttribute('disabled', 'disabled');
        let propertyImage = document.createElement('img');
        Object.assign(propertyImage, {
            className: 'img-fluid',
            src: `assets/img/${contentPropertyMatrix[index][5]}.jpg`,
            alt: contentPropertyMatrix[index][5]
        });
        let propertyHeader5 = document.createElement('h5');
        propertyHeader5.setAttribute('class', 'text-primary mb-3');
        let propertyAnchor2 = document.createElement('a');
        propertyAnchor2.setAttribute('class', 'd-block h5 mb-2');
        propertyAnchor2.setAttribute('href', '#property-section');
        let propertyParagraph = document.createElement('p');
        let propertyIcon = document.createElement('i');
        propertyIcon.setAttribute('class', 'fa fa-map-marker-alt text-primary me-2');
        for (let index = 1; index <= 3; index++) {
            window['propertySmall' + index] = document.createElement('small');
            window['propertySmall' + index].setAttribute('class', 'flex-fill text-center border-end py-2');
            window['propertyIcon' + index] = document.createElement('i');
            window['propertyIcon' + index].setAttribute('class', contentPropertyIconClasses[index - 1]);
            window['propertySmall' + index].appendChild(window['propertyIcon' + index]);
            propertyDiv7.appendChild(window['propertySmall' + index]);
        }
        propertyDiv5.classList.add('text-secondary');
        propertySmall2.classList.add('bedroom-num');
        propertySmall3.classList.remove('border-end');

        propertyDiv1.appendChild(propertyDiv2);
            propertyDiv2.appendChild(propertyDiv3);
                propertyDiv3.append(propertyAnchor1, propertyDiv4, propertyDiv5);
                    propertyAnchor1.appendChild(propertyImage);
                    propertyDiv4.textContent += contentPropertyMatrix[index][0];
                    propertyDiv5.textContent += contentPropertyMatrix[index][1];
            propertyDiv2.appendChild(propertyDiv6);
                propertyDiv6.append(propertyHeader5, propertyAnchor2, propertyParagraph);
                    propertyHeader5.innerHTML += contentPropertyMatrix[index][2] + '&#x20AC;';
                        propertyAnchor2.innerHTML += contentPropertyMatrix[index][3];
                        propertyParagraph.appendChild(propertyIcon);
                        propertyParagraph.innerHTML += contentPropertyMatrix[index][4];
            propertyDiv2.appendChild(propertyDiv7);
                    propertySmall1.innerHTML += contentPropertyDetails[index][0] + 'm&#178;';
                    propertySmall2.innerHTML += contentPropertyDetails[index][1] + ' bedroom/s';
                    propertySmall3.innerHTML += contentPropertyDetails[index][2] + ' bathrooom/s';

    propertySectionContent.append(propertyDiv1);
    }
    /* _*-*_ END|DYNAMIC "PROPERTY LISTING" CONTENT _*-*_ */


    /* _*-*_ BEGIN|DYNAMIC "PROPERTY LISTING" FILTER _*-*_ */
    var propertyFilters = document.querySelectorAll('#property-filters li a');
    var propertySaleOrRent = document.querySelectorAll('.sale-or-rent');
    var propertyListPart = document.querySelectorAll('.property-list-part');
    for (const element of propertyFilters) {
        element.addEventListener('click', function() {
            document.querySelector('#property-filters li a.active').classList.remove('active');
            element.classList.add('active');
            for (let index = 0; index < propertyListPart.length; index++) {
                if((element.innerHTML != 'All') && !(element.innerHTML == propertySaleOrRent[index].innerHTML)) {
                    propertyListPart[index].classList.add('hide');
                }
                else {
                    propertyListPart[index].classList.remove('hide');
                }
            }
        })
    }
    /* _*-*_ END|DYNAMIC "PROPERTY LISTING" FILTER _*-*_ */


    /* _*-*_ BEGIN|DYNAMIC "SEARCH" CONTENT _*-*_ */
    var searchFields = document.querySelectorAll(".search-form-item");

    var searchPropertySort = ['3 bedroom/s', '6 bedroom/s'];
    var searchPropertyTypes = ['Apartment', 'Building', 'Home', 'Villa'];
    var typeSelect, typeOption, sortSelect, sortOption;

    function CreateSearchDDL(ddlName, ddlId, defaultValue, valueArray, optionName, position) {
        ddlName = document.createElement('select');
        ddlName.setAttribute('class', 'form-select border-0 py-3 search-form-ddl');
        ddlName.setAttribute('id', ddlId);
        searchFields[position].append(ddlName);
        var typeDefaultOption = document.createElement('option');
        typeDefaultOption.setAttribute('value', 0);
        typeDefaultOption.innerHTML += defaultValue;
        ddlName.append(typeDefaultOption);
        for (let index = 0; index < valueArray.length; index++) {
            optionName = document.createElement('option');
            optionName.setAttribute('value', valueArray[index]);
            optionName.innerHTML += valueArray[index];
            ddlName.append(optionName);
        }
    }

    CreateSearchDDL(typeSelect, 'search-type', 'Property Type...', searchPropertyTypes, typeOption, 0);
    CreateSearchDDL(sortSelect, 'search-sort', 'Number of bedrooms...', searchPropertySort, sortOption, 1);

    var searchFieldType = document.querySelector('#search-type');
    var searchFieldSort = document.querySelector('#search-sort');
    var searchFieldBtn = document.querySelector('#search-btn');
    var propertyBedroom = document.getElementsByClassName('bedroom-num');

    searchFieldBtn.addEventListener('click', function() {
        for (let index = 0; index < propertyListPart.length; index++) {
            propertyListPart[index].classList.remove('hide');
            if (!(searchFieldType.value == '0') && !(searchFieldSort.value == '0')) {
                if ((!(searchFieldType.value == propertySaleOrRent[index].nextElementSibling.innerHTML)) || (!(searchFieldSort.value == propertyBedroom[index].textContent))) {
                    propertyListPart[index].classList.add('hide');
                }
            }
            else if (!(searchFieldType.value == '0') && !(searchFieldType.value == propertySaleOrRent[index].nextElementSibling.innerHTML)) {
                propertyListPart[index].classList.add('hide');
            }
            else if (!(searchFieldSort.value == '0') && !(searchFieldSort.value == propertyBedroom[index].textContent)) {
                propertyListPart[index].classList.add('hide');
            }
            else {
                propertyListPart[index].classList.remove('hide');
            }
        }
    });
    /* _*-*_ END|DYNAMIC "SEARCH" CONTENT _*-*_ */


    /* _*-*_ BEGIN|DYNAMIC "PROPERTY AGENTS" CONTENT _*-*_ */
    var agentSection = document.getElementById('agent-section');
    const contentAgentDetails = [['Mackenzie Perkins', 'Real Estate Brokerage Manager', 'mackenzie'], ['Clark Wilson', 'Senior Real Estate Specialist', 'clark'], ['Lilly Johnson', 'Commercial Investment Member', 'lily'],['Jordan Woods', 'Accredited Land Consultant', 'jordan']];

    const contentAgentDivClasses = ['col-lg-3 col-md-6 wow fadeInUp', 'team-item rounded overflow-hidden', 'position-relative', 'position-absolute start-50 top-100 translate-middle d-flex align-items-center', 'text-center p-4 mt-3'];

    const contentAgentIconClasses = ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-instagram'];

    for (let index = 0; index < 4; index++) {
        for (let index = 1; index <= 5; index++) {
            window['agentDiv' + index] = document.createElement('div');
            window['agentDiv' + index].setAttribute('class', contentAgentDivClasses[index-1]);
        }
        let agentImage = document.createElement('img');
        Object.assign(agentImage, {
            className: 'img-fluid',
            src: `assets/img/${contentAgentDetails[index][2]}.jpg`,
            alt: contentAgentDetails[index][2]
        });
        for (let index = 0; index < 3; index++) {
            window['agentAnchor' + index + 1] = document.createElement('a');
            window['agentAnchor' + index + 1].setAttribute('class', 'btn btn-square mx-1');
            window['agentAnchor' + index + 1].setAttribute('href', '#agent-section');
            window['agentIcon' + index + 1] = document.createElement('i');
            window['agentIcon' + index + 1].setAttribute('class', contentAgentIconClasses[index]);
            window['agentAnchor' + index + 1].appendChild(window['agentIcon' + index + 1]);
            agentDiv4.appendChild(window['agentAnchor' + index + 1]);
        }
        let agentHeader5 = document.createElement('h5');
        agentHeader5.setAttribute('class', 'fw-bold mb-0');
        let agentSmall = document.createElement('small');

        agentDiv1.appendChild(agentDiv2);
            agentDiv2.appendChild(agentDiv3);
                agentDiv3.append(agentImage, agentDiv4);
            agentDiv2.appendChild(agentDiv5);
                agentDiv5.append(agentHeader5, agentSmall);
                    agentHeader5.innerHTML += contentAgentDetails[index][0]
                    agentSmall.innerHTML += contentAgentDetails[index][1]

    agentSection.append(agentDiv1);
    }
    /* _*-*_ END|DYNAMIC "PROPERTY AGENTS" CONTENT _*-*_ */

    /* _*-*_ BEGIN|DYNAMIC "TESTIMONIALS" CONTENT _*-*_ */
    var testimonialsSection = document.querySelectorAll('#testimonials .swiper-slide');
    const contentTestimonialsDetails = [
        ['"When I found Clark I knew I was finally working with a real professional I could rely on."' ,'Naomi Mitchell', '- happy Lock&Key client', 'naomi'], 
        ['"Everyone is on the same page. Lock&Key is the ultimate time saver for people like me."' ,'Charles Wilson', '- grateful Lock&Key client', 'charles'], 
        ['"With Lock&Key, I have finally accomplished things that have been waiting forever to get done."' ,'Zoe Diaz', '- thankful Lock&Key client', 'zoe']
    ];

    const contentTestimonialsDivClasses = ['testimonial-item bg-light rounded p-3', 'bg-white border rounded p-4', 'd-flex align-items-center', 'ps-3'];

    for (let index = 0; index < 3; index++) {
        for (let index = 1; index <= 4; index++) {
            window['testimonialDiv' + index] = document.createElement('div');
            window['testimonialDiv' + index].setAttribute('class', contentTestimonialsDivClasses[index-1]);
        }
        let testimonialParagraph = document.createElement('p');
        let testimonialImage = document.createElement('img');
        Object.assign(testimonialImage, {
            className: 'img-fluid flex-shrink-0 rounded-circle',
            src: `assets/img/${contentTestimonialsDetails[index][3]}.jpg`,
            alt: contentTestimonialsDetails[index][3]
        });
        testimonialImage.style.width = '45px';
        testimonialImage.style.height = '45px';
        let testimonialHeader6 = document.createElement('h5');
        testimonialHeader6.setAttribute('class', 'fw-bold mb-1');
        let testimonialSmall = document.createElement('small');

        testimonialDiv1.appendChild(testimonialDiv2);
            testimonialDiv2.append(testimonialParagraph, testimonialDiv3);
                testimonialParagraph.innerHTML += contentTestimonialsDetails[index][0];
                testimonialDiv3.append(testimonialImage, testimonialDiv4);
                    testimonialDiv4.append(testimonialHeader6, testimonialSmall);
                        testimonialHeader6.innerHTML += contentTestimonialsDetails[index][1];
                    testimonialSmall.innerHTML += contentTestimonialsDetails[index][2];

    testimonialsSection[index].append(testimonialDiv1);
    }
    /* _*-*_ END|DYNAMIC "TESTIMONIALS" CONTENT _*-*_ */
}

else if (location.pathname == '/lock_key/contact.html') {
// else if (location.pathname == '/contact.html') {
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
        let regExFullName, regExEmail, regExSubject;

        formFullName = document.querySelector('#form-name');
        formEmail = document.querySelector('#form-email');
        formSubject = document.querySelector('#form-subject');
        formMessage = document.querySelector('#form-message');
        formTerms = document.querySelector('#form-terms-conditions');
        formSuccess = document.querySelector('#no-error-message');

        regExFullName = /^[A-ZČĆŠĐŽ][a-zčćđšž]{2,14}([\s][A-ZČĆŠĐŽ][a-zčćđšž]{2,14})+$/;
        regExEmail = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        regExSubject = /^[A-ZČĆŠĐŽa-zčćđšž0-9\s\.,!?""-]{3,}$/;

        regExValidation(formFullName, regExFullName, 'Field "Full name" accepts only letters. </br><em><small> - example: John Doe</small></em>');
        regExValidation(formEmail, regExEmail, 'Field "E-mail" is invalid. </br><em><small> - example: john.doe@gmail.com</small></em>');
        regExValidation(formSubject, regExSubject, 'Field "Subject" accepts letter, numbers and (!?.,-")');

        if(!formTerms.checked) {
            formTerms.classList.add('border-2', 'border-danger', 'rounded');
            formTerms.nextElementSibling.classList.add('text-danger');
            errors++;
        }
        else {
            formTerms.classList.remove('border-2', 'border-danger', 'rounded');
            formTerms.nextElementSibling.classList.remove('text-danger');
        }

        if(formMessage.textLength < 10) {
            formMessage.classList.add('border-2', 'border-danger', 'rounded');
            formMessage.parentElement.nextElementSibling.innerHTML = 'Field "Message" must contain at least 10 characters.';
            formMessage.parentElement.nextElementSibling.classList.remove('hide');
            errors++;
        }
        else{
            formMessage.classList.remove('border-2', 'border-danger', 'rounded');
            formMessage.parentElement.nextElementSibling.innerHTML = '';
            formMessage.parentElement.nextElementSibling.classList.add('hide');
        }

        if(errors==0) {
            formSuccess.classList.remove('hide');
            formSuccess.innerHTML = 'Thank you for contacting us. We will reply to your message ASAP!';
            document.getElementById("form-contact").reset();
        }
    }
    /* _*-*_ END|CONTACT FORM VALIDATION _*-*_ */
}

/* _*-*_ BEGIN|DYNAMIC "NAVBAR" LINKS _*-*_ */
var navPart = document.getElementById('navbarCollapse');
const navMatrix = [
    ['index.html', 'nav-item nav-link', 'Home'],
    ['contact.html', 'nav-item nav-link', 'Contact'],
    ['https://lthechubbyl.github.io/portfolio/', 'nav-item nav-link', 'Portfolio'],
    ['documentation.pdf', 'nav-item nav-link', 'Documentation']
];
let navDiv = document.createElement('div');
navDiv.setAttribute('class', 'navbar-nav ms-auto');
for (let index = 1; index <= 4; index++) {
    window['navAnchor' + index] = document.createElement('a');
    window['navAnchor' + index].setAttribute('href', navMatrix[index - 1][0])
    window['navAnchor' + index].setAttribute('class', navMatrix[index - 1][1]);
    window['navAnchor' + index].innerHTML += navMatrix[index - 1][2];
    navDiv.append(window['navAnchor' + index]);
}
navAnchor4.setAttribute('target', '_blank');
navPart.append(navDiv);

/* - BEGIN|"NAVBAR" ACTIVE LINK - */
if (document.title == 'Lock&Key | Home') { 
    navAnchor1.classList.add('active');
}
else if (document.title == 'Lock&Key | Contact') { 
    navAnchor2.classList.add('active');
}
/* - END|"NAVBAR" ACTIVE LINK - */
/* _*-*_ END|DYNAMIC "NAVBAR" LINKS _*-*_ */

/* _*-*_ BEGIN|DYNAMIC "FOOTER" CONTENT _*-*_ */
var footerQuickLink = document.getElementById('footer-quick-link');
const footerQuickLinkMatrix = [['Home', 'index.html'], ['Contact', 'contact.html'], ['Portfolio', 'https://lthechubbyl.github.io/portfolio/'], ['Documentation', 'documentation.pdf']];
var footerInfo = document.getElementById('footer-info');
const footerInfoMatrix = [
    ['fa fa-map-marker-alt me-3', '8483 Buckingham St. New York'],
    ['fa fa-phone-alt me-3', '+0601234567'],
    ['fa fa-envelope me-3', 'lockkey@gmail.com']
];
const footerIconPartArray = ['fab fa-twitter', 'fab fa-facebook-f', 'fab fa-youtube', 'fab fa-linkedin-in'];

for (let index = 0; index < footerQuickLinkMatrix.length; index++) {
    footerQuickLink.innerHTML += `<a class="btn btn-link text-white-50" href="${footerQuickLinkMatrix[index][1]}">${footerQuickLinkMatrix[index][0]}</a>`
}

for (let index = 0; index < footerInfoMatrix.length; index++) {
    footerInfo.innerHTML += `<p class="mb-2"><i class="${footerInfoMatrix[index][0]}"></i>${footerInfoMatrix[index][1]}</p>`
}
let footerInfoTemp = `<div class="d-flex pt-2">`;
for (let index = 0; index < footerIconPartArray.length; index++) {
    footerInfoTemp += `<a class="btn btn-outline-light btn-social" href="#"><i class="${footerIconPartArray[index]}"></i></a>`;
}
footerInfoTemp += `</div>`;
footerInfo.innerHTML += footerInfoTemp;
/* _*-*_ END|DYNAMIC "FOOTER" CONTENT _*-*_ */

var swiperHeader = new Swiper('.swiperHeader', {
    effect: "fade",
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
});

var swiperTestimonials = new Swiper('.swiperTestimonials', {
    loop: true,
    slidesPerView: 2,
    centeredSlides: true,
    effect: "creative",
    creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
});