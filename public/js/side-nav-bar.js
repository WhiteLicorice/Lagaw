const side = document.getElementById('side-nav-bar');
const cover = document.getElementById('sidebar-cover');
const slideAmount = -100;
let transformed = false;

function showHide() {
    /* if (side.style.transform == 'translateX(-100px)') {
        side.style.transform = 'translateX(0)';
    }
    else {
        side.style.transform = 'translateX(-100px)';
    } */
    if (transformed) 
    {
        side.style.transform = `translateX(${slideAmount}px)`;
        cover.style.visibility = 'hidden';
    } 
    else 
    {
        side.style.transform = 'translateX(0)';
        cover.style.visibility = 'visible';
    }

    transformed = !transformed;
}
