// Get navigation bar class members from html.
topNav = document.getElementById("top-nav-bar");
sideNav = document.getElementById("side-nav-bar");
fontWhite = document.querySelectorAll('.font-white')
fontBlack = document.querySelectorAll('.font-black')
fontPeach = document.querySelectorAll('.font-peach')
sideChildren = document.querySelectorAll('.side-child')
theme = document.getElementById("color-theme");
icon = document.getElementById("theme-icon");
menuBtn = document.getElementById("menu");
homeHighlights = document.getElementById('home-highlights');
homeExplore = document.getElementById('home-explore');
transparentBackgroundHome = document.querySelectorAll('.transparent-background');
transparentBackgroundPaL = document.querySelectorAll('.transparent-background');
transparentBackgroundTitle = document.querySelectorAll(".transparent-background-title");

darkMode = true; // Webpage is dark mode by default
function lightDarkMode()
{
    if (darkMode == true) {
        darkMode = false;
        icon.src = "/img/dark.png";
        topNav.style.background = "#FFFFFF";
        sideNav.style.background = "#FFFFFF";
        menuBtn.style.filter = 'invert(1)';
        document.getElementById('search-bar-input').style.background = '#b57e07';
        homeHighlights.style.background = "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url('/img/whitebg.jpg')";
        homeExplore.style.background = "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url('/img/whitebg.jpg')";

        transparentBackgroundHome.forEach(bg => {
            bg.style.background = "rgba(237,231,225,0.7)";
        })

        transparentBackgroundPaL.forEach(bgl => {
            bgl.style.backgroundColor = "rgba(237,231,225,0.7)";
        })

        transparentBackgroundTitle.forEach(bgt => {
            bgt.style.backgroundColor = "rgba(237,231,225,0.7)";
        })

        fontWhite.forEach(whitefont => {
            whitefont.style.filter = 'invert(1)'
        })

        fontBlack.forEach(whitefont => {
            whitefont.style.filter = 'invert(1)'
        })

        fontPeach.forEach(whitefont => {
            whitefont.style.filter = 'invert(1)'
        })

        sideChildren.forEach(child => {
            child.style.webkitFilter = 'invert(1)'
        })
    }
    else {
        darkMode = true;
        icon.src = "/img/light.png";
        topNav.style.background = "#1B1B1B";
        sideNav.style.background = "#1B1B1B";
        menuBtn.style.filter = 'invert(0)';
        document.getElementById('search-bar-input').style.background = '#FFFFFF';
        homeHighlights.style.background = "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/img/whitebg.jpg')";
        homeExplore.style.background = "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/img/whitebg.jpg')";


        transparentBackgroundHome.forEach(bg => {
            bg.style.background = "rgba(0,0,0,0.7)";
        })

        transparentBackgroundPaL.forEach(bgl => {
            bgl.style.backgroundColor = "rgba(0,0,0,0.7)";
        })

        transparentBackgroundTitle.forEach(bgt => {
            bgt.style.backgroundColor = "rgba(0,0,0,0.7)";
        })

        fontWhite.forEach(node => {
            node.style.filter = 'invert(0)'
        })

        fontBlack.forEach(node => {
            node.style.filter = 'invert(0)'
        })

        fontPeach.forEach(node => {
            node.style.filter = 'invert(0)'
        })

        sideChildren.forEach(node => {
            node.style.filter = 'invert(0)'
        })
    }
}



