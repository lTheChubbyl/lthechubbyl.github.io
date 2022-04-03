const navbar = document.querySelector('.navbar');
var width = window.innerWidth
if (width < 1025) {
    document.getElementById("logo").src="assets/img/logoKO-white.png";
}
else if (width > 1025) {
    window.onscroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            document.getElementById("logo").src="assets/img/logoKO-white.png";
        } else {
            navbar.classList.remove('scrolled');
            document.getElementById("logo").src="assets/img/logoKO.png";
        }
}
};