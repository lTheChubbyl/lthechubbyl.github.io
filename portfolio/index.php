<?php
    include "models/functions.php";

    insertLog();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- _*-*_ META TAGS _*-*_ -->
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="milos, miloš, cubrak, čubrak, portfolio, full, stack, web, developer, projects, services, contact, design, designs, html, check, website" />
        <meta name="description" content="Hi, my name is Miloš Čubrak and I'm a full-stack developer" />
        <title>Miloš Čubrak | Portfolio</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <!-- _*-*_ FONTS _*-*_ -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jura:wght@400;700&family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        <!-- _*-*_ STYLESHEETS _*-*_ -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

        <link rel="stylesheet" type="text/css" href="assets/css/style.css" />

        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    </head>
    <body>
        <a id="top"></a>
        <header id="navigation">
            <nav>
                <div class="vr"></div>
                <ul> 
                    <li class="focus"><a href="index.html#top">Home</a></li>
                    <li><a href="index.html#services">Services</a></li>
                    <li><a href="index.html#skills">Skills</a></li>
                    <li><a href="index.html#projects">Projects</a></li>
                    <li><a href="index.html#about-me">About</a></li>
                    <li><a href="index.html#contact">Contact</a></li>
                </ul>
                <div class="vr"></div>
            </nav>
        </header>

        <main>
            <div id="loader">
                <div id="fake-logo">
                    <a href="index.html"><img src="assets/img/logo-m.png" alt="logo m&ch"></a>
                </div>
            </div>
            <section id="intro">
                <div id="logo">
                    <a href="index.html"><img src="assets/img/logo-m.png" alt="logo m&ch"></a>
                </div>
                <video autoplay loop muted >
                    <source src="assets/video/hero_flare.mp4"/>
                    The video is unavailable.
                </video>
                <div id="intro-desc">
                    <div class="intro-desc-item"> 
                        <p>Hi, my name is</p>
                        <h1>Miloš Čubrak</h1>
                    </div> 
                    <div class="intro-desc-item">
                        <p class="intro-desc-title">And I'm a full-stack web developer</p>
                    </div>
                </div>
                <div id="incentive">
                    <a href="#services">
                        <div class="arrow"></div>
                    </a>
                </div>
            </section>
            <section id="services">
                <h2>My <span>Services</span></h2>
                <div class="wrapper row gy-3">
                    <div class="col-md-4">
                        <div class="services-part" data-aos="fade-up" data-aos-delay="200">
                            <i class="fa-solid fa-code"></i>
                            <h3>Web Development</h3>
                            <hr />
                            <p>I'm not confined by front-end or back-end boundaries, allowing me to craft comprehensive solutions that effortlessly combine form and function. I'm well-versed in the latest technologies and frameworks, enabling me to create applications that deliver exceptional performance. I thrive on turning ideas into functional reality and bring digital dreams to life.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="services-part" data-aos="fade-up" data-aos-delay="400">
                            <i class="fa-solid fa-pen-ruler"></i>
                            <h3>UI/UX Design</h3>
                            <hr />
                            <p>I thrive on perfection when it comes to design. Everything has to flawlessly fit in with the theme and complement the rest of the content. My designs are fully responsive and work on all platforms. From minimalist modern designs to playful colorful designs, I possess the versatility to bring any vision to life.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="services-part" data-aos="fade-up" data-aos-delay="800">
                            <i class="fa-solid fa-photo-film"></i>
                            <h3>Photo & Video Editing</h3>
                            <hr />
                            <p>Whether it's a website banner, an engaging video background, or logo design, my editing techniques are tailored to your needs. I specialize in crafting compelling visual content that seamlessly integrates with your online presence. I excel in enhancing visual elements of your images and videos to ensure they align seamlessly with your web design.</p>
                        </div>
                    </div> 
                </div>
            </section>
            <section id="skills">
                <h2>My <span>Skills</span></h2>
                <div class="wrapper">
                    <article class="skills-part" data-aos="flip-down" data-aos-delay="100">
                        <div class="skill-desc">
                            <i class="fa-brands fa-html5"></i>
                            <h3>HTML</h3>
                        </div>
                        <div class="skill-bar-out">
                            <div class="skill-bar-in">
                                <p>100%</p>
                            </div>
                        </div>  
                    </article>
                    <article class="skills-part" data-aos="flip-down" data-aos-delay="200">
                        <div class="skill-desc">
                            <i class="fa-brands fa-css3-alt"></i>
                            <h3>CSS</h3>
                        </div>
                        <div class="skill-bar-out" >
                            <div class="skill-bar-in">
                                <p>100%</p>
                            </div>
                        </div>
                    </article>
                    <article class="skills-part" data-aos="flip-down" data-aos-delay="300">
                        <div class="skill-desc">
                            <i class="fa-brands fa-js"></i>
                            <h3>JS</h3>
                        </div>
                        <div class="skill-bar-out">
                            <div class="skill-bar-in">
                                <p>85%</p>
                            </div>
                        </div>
                    </article>
                    <article class="skills-part" data-aos="flip-down" data-aos-delay="400">
                        <div class="skill-desc">
                            <i class="fa-brands fa-php"></i>
                            <h3>PHP</h3>
                        </div>
                        <div class="skill-bar-out">
                            <div class="skill-bar-in">
                                <p>75%</p>
                            </div>
                        </div>
                    </article>
                    <article class="skills-part" data-aos="flip-down" data-aos-delay="500">
                        <div class="skill-desc">
                            <i class="fa-brands fa-bootstrap"></i>
                            <h3>Bootstrap</h3>
                        </div>
                        <div class="skill-bar-out">
                            <div class="skill-bar-in">
                                <p>90%</p>
                            </div>
                        </div>
                    </article>
                    <article class="skills-part" data-aos="flip-down" data-aos-delay="600">
                        <div class="skill-desc">
                            <i class="fa-brands fa-wordpress"></i>
                            <h3>Wordpress</h3>
                        </div>
                        <div class="skill-bar-out">
                            <div class="skill-bar-in">
                                <p>80%</p>
                            </div>
                        </div>
                    </article>
                </div>
                <p class="text-center mt-4"><span>Others:</span> C#, Vue.js, JQuery, SQL, Adobe Photoshop, Illustrator & Premiere, SASS/LESS</p>
            </section>
            <section id="projects">
                <h2>My <span>Projects</span></h2>
                <div class="wrapper">
                    <article class="projects-part" data-aos="fade-up" data-aos-delay="200">
                        <img src="assets/img/geometar-pancevo.png" alt="coming soon"/>
                        <div class="project-desc">
                            <h3>Geometar Pancevo</h3>
                            <p>wordpress<span> | </span>elementor</p>
                        </div>
                        <div class="project-btn">
                            <a href="https://geometarpancevo.rs/" target="_blank">Check it out</a>
                        </div>
                    </article>
                    <article class="projects-part" data-aos="fade-up" data-aos-delay="400">
                        <img src="assets/img/icecold.png" alt="ice cold jewelry website"/>
                        <div class="project-desc">
                            <h3>IceCold Jewelry</h3>
                            <p>php<span> | </span>javascript<span> | </span>mysql<span> | </span>html<span> | </span>css<span> | </span>bootstrap</p>
                        </div>
                        <div class="project-btn">
                            <a href="https://icecoldss.000webhostapp.com/index.php" target="_blank">Check it out</a>
                        </div>
                    </article>
                    <article class="projects-part" data-aos="fade-up" data-aos-delay="600">
                        <img src="assets/img/tehnotron.png" alt="tehnotron store website"/>
                        <div class="project-desc">
                            <h3>TehnoTRON</h3>
                            <p>javascript<span> | </span>html<span> | </span>css<span> | </span>bootstrap</p>
                        </div>
                        <div class="project-btn">
                            <a href="https://lthechubbyl.github.io/tehnotron/index.html" target="_blank">Check it out</a>
                        </div>
                    </article>
                    <article class="projects-part" data-aos="fade-up" data-aos-delay="200">
                        <img src="assets/img/knockout.png" alt="knockout gym website"/>
                        <div class="project-desc">
                            <h3>knocKOut Gym</h3>
                            <p>javascript<span> | </span>html<span> | </span>css<span> | </span>bootstrap</p>
                        </div>
                        <div class="project-btn">
                            <a href="https://lthechubbyl.github.io/knockout/index.html" target="_blank">Check it out</a>
                        </div>
                    </article>
                    <!-- <article class="projects-part" data-aos="fade-up" data-aos-delay="200">
                        <img src="assets/img/shotoff8.png" alt="knockout gym website"/>
                        <div class="project-desc">
                            <h3>ShotOfF8</h3>
                            <p>html<span> | </span>css<span> | </span>(my first website, non-responsive)</p>
                        </div>
                        <div class="project-btn">
                            <a href="https://lthechubbyl.github.io/shotoff8/index.html" target="_blank">Check it out</a>
                        </div>
                    </article> -->
                    <article class="projects-part" data-aos="fade-up" data-aos-delay="400">
                        <img src="assets/img/portfolio.png" alt="portfolio website"/>
                        <div class="project-desc">
                            <h3>This Portfolio</h3>
                            <p>html<span> | </span>css<span> | </span>javascript<span> | </span>php<span> | </span>bootstrap</p>
                        </div>
                        <div class="project-btn">
                            <a href="https://lthechubbyl.github.io/shotoff8/index.html" target="_blank">Check it out</a>
                        </div>
                    </article>
                    <article class="projects-part" data-aos="fade-up" data-aos-delay="600">
                        <img src="assets/img/placeholder-img-invert.jpg" alt="coming soon"/>
                        <div class="project-desc">
                            <h3>Coming Soon...</h3>
                            <p>unknown</p>
                        </div>
                        <div class="project-btn">
                            <a href="">Coming Soon</a>
                        </div>
                    </article>
                </div>
            </section>
            <section id="about-me">
                <h2>About <span>Me</span></h2>
                <div class="wrapper">
                    <article id="about-me-l-part" data-aos="fade-right" data-aos-delay="200">
                        <div id="about-me-img">
                            <img src="assets/img/me.jpg" alt="milos cubrak"/>
                            <div id="socials">
                                <a href="https://www.facebook.com/milos.cubrak" target="_blank"><i class="fa-brands fa-facebook-square"></i></a>
                                <a href="https://www.instagram.com/milos_cubrak/" target="_blank"><i class="fa-brands fa-instagram-square"></i></a>
                                <a href="https://www.linkedin.com/in/milo%C5%A1-%C4%8Dubrak-81a73b253" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                    </article>
                    <article id="about-me-r-part" data-aos="fade-left" data-aos-delay="200">
                        <h3>Basic Information</h3>
                        <hr />
                        <div class="info-desc">
                            <div class="info-desc-l">
                                <p>Name:</p>
                                <p>Age:</p>
                                <p>Number:</p>
                                <p>E-mail:</p>
                            </div>
                            <div class="info-desc-r">
                                <p>Miloš Čubrak</p>
                                <p>21</p>
                                <p>+381 63 8966 XXX</p>
                                <p>miloscubrak&#64;gmail&#46;com</p>
                            </div>
                        </div>
                        <h3>Education</h3>
                        <hr />
                        <div class="info-desc">
                            <div class="info-desc-l">
                                <p>2021-Present</p>
                                <p>2017-2021</p>
                            </div>
                            <div class="info-desc-r">
                                <p>Information and Communication Technologies College</p>
                                <p>Secondary School of Electrical Engineering</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section id="contact">
                <h2>Contact <span>Me</span></h2>
                <div class="wrapper">
                    <article id="contact-form" data-aos="fade-down" data-aos-delay="200">
                        <form>
                            <div class="form-part">
                                <label for="fname">First Name: <span class="text-danger">*</span></label><br/>
                                <hr />
                                <input type="text" name="fname" id="fname" maxlength="35" placeholder="John" aria-describedby="fnameErr" />
                                <div id="fnameErr" class="invalid-feedback fst-italic">
                                    Please enter a valid first name.
                                </div>
                            </div>
                            <div class="form-part">
                                <label for="lname">Last Name: <span class="text-danger">*</span></label><br/>
                                <hr />
                                <input type="text" name="lname" id="lname" maxlength="35" placeholder="Doe" aria-describedby="lnameErr" />
                                <div id="lnameErr" class="invalid-feedback fst-italic">
                                    Please enter a valid last name.
                                </div>
                            </div>
                            <div class="form-part">
                                <label for="email">E-mail: <span class="text-danger">*</span></label><br/>
                                <hr />
                                <input type="emailErr" name="email" id="email" maxlength="35" placeholder="example@mail.com" aria-describedby="emailErr" />
                                <div id="emailErr" class="invalid-feedback fst-italic">
                                    Please enter a valid email address.
                                </div>
                            </div>
                            <div class="form-part">
                                <label for="phone-number">Phone Number:</label><br/>
                                <hr />
                                <input type="tel" name="phone-number" id="phone-number" maxlength="18"
                                placeholder="+123-456-789" aria-describedby="phone-numberErr" />
                                <div id="phone-numberErr" class="invalid-feedback fst-italic">
                                    Please enter a valid phone number.
                                </div>
                            </div>
                            <div class="form-part">
                                <label for="phone-number">Message: <span class="text-danger">*</span></label><br/>
                                <hr />
                                <textarea name="message" id="message" cols="10" rows="8" placeholder="Send me a message.." aria-describedby="messageErr"></textarea>
                                <div id="messageErr" class="invalid-feedback fst-italic">
                                    Please enter a valid message.
                                </div>
                            </div>
                            <input type="button" name="btn" id="btn" value="Submit">
                        </form>
                        <div class="alert alert-success d-flex align-items-center d-none" role="alert">
                            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                            <div>You have successfully submitted your message!</div>
                        </div>
                    </article>
                </div>
            </section>
        </main>

        <footer>
            <div class="wrapper">
                <div id="necessary">
                    <a href="#">
                        <div class="arrow"></div>
                    </a>
                </div>
                <div id="copyright">
                    <p>Copyright &copy; <span></span> Miloš Čubrak, All rights reserved.</p>
                </div>
            </div>
        </footer>
        <!-- _*-*_ SCRIPTS _*-*_ -->
        <script src="https://kit.fontawesome.com/270460494f.js" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script src="assets/js/main.js"></script>
    </body>
</html>