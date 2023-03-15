// Get navigation bar class members from html.
topNav = document.getElementById("top-nav-bar"); //?? Error when variable is named top
sideNav = document.getElementById("side-nav-bar");
fontWhite = document.querySelectorAll('.font-white')
fontPeach = document.querySelectorAll('.font-peach')
sideChildren = document.querySelectorAll('.side-child')
theme = document.getElementById("color-theme");
icon = document.getElementById("theme-icon");
transparentBackground = document.querySelectorAll('transparent-background');
transparentBackgroundLeft = document.querySelectorAll('transparent-background-left');
transparentBackgroundTitle = document.querySelectorAll("transparent-background-title");

darkMode = true; // Webpage is dark mode by default
function lightDarkMode()
    //TODO: Change element colors when swithcing modes
{
    if (darkMode == true)
    {
        darkMode = false;
        icon.src = "/img/dark.png";
        topNav.style.background = "#FFFFFF";
        sideNav.style.background = "#FFFFFF";
        document.getElementById('menu-btn').style.filter = 'invert(1)';
        document.getElementById('search-bar-input').style.background = '#b57e07';


        transparentBackground.forEach(bg => 
        {
            bg.style.backgroundColor = "rgba(237,231,225,0.7)";
        })

        transparentBackgroundLeft.forEach(bgl => 
        {
            bgl.style.backgroundColor = "rgba(237,231,225,0.7)";
        })

        transparentBackgroundTitle.forEach(bgt => 
        {
            bgt.style.backgroundColor = "rgba(237,231,225,0.7)";
        })

        fontWhite.forEach(whitefont => 
        {
            whitefont.style.filter = 'invert(1)'
        })

        fontPeach.forEach(whitefont =>
        {
            whitefont.style.filter = 'invert(1)'
        })

        sideChildren.forEach(child => 
        {
            child.style.webkitFilter = 'invert(1)'
        })
    }
    else
    {
        darkMode = true;
        icon.src = "/img/light.png";
        topNav.style.background = "#1B1B1B";
        sideNav.style.background = "#1B1B1B";
        document.getElementById('menu-btn').style.filter = 'invert(0)';
        document.getElementById('search-bar-input').style.background = '#FFFFFF';

        transparentBackground.forEach(bg => 
        {
            bg.style.backgroundColor = "rgba(0,0,0,0.7)";
        })

        transparentBackgroundLeft.forEach(bgl => 
        {
            bgl.style.backgroundColor = "rgba(0,0,0,0.7)";
        })

        transparentBackgroundTitle.forEach(bgt => 
        {
            bgt.style.backgroundColor = "rgba(0,0,0,0.7)";
        })

        fontWhite.forEach(node => 
        {
            node.style.filter = 'invert(0)'
        })

        fontPeach.forEach(node =>
        {
            node.style.filter = 'invert(0)'
        })

        sideChildren.forEach(node =>
        {
            node.style.filter = 'invert(0)'
        })
    }
}



