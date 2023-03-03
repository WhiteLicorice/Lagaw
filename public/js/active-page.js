const active = window.location.pathname;
const links = document.querySelectorAll('nav li a').
forEach(link => {
    if(link.href.includes('${active}')){
        link.classList.add('active');
    }
});