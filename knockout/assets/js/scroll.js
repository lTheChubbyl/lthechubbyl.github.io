const navbar = document.querySelector('.navbar');
window.onscroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        document.getElementById("logo").src="assets/img/logoKO-white.png";
    } else {
        navbar.classList.remove('scrolled');
        document.getElementById("logo").src="assets/img/logoKO.png";
    }
};