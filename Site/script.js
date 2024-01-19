const navRight = document.querySelector('.nav__right ul');
const showNavBtn = document.querySelector('#show__navbar-btn');
const hideNavBtn = document.querySelector('#hide__navbar-btn');

const showNav  = () => {
    navRight.style.display = "inline-block";
    showNavBtn.style.display = "none";
    hideNavBtn.style.display = "inline-block";
}
const hideNav  = () => {
    navRight.style.display = "none";
    showNavBtn.style.display = "inline-block";
    hideNavBtn.style.display = "none";
}

showNavBtn.addEventListener('click', showNav);
hideNavBtn.addEventListener('click', hideNav);