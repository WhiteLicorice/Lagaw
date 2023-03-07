// Get navigation bar class members from html.
topNav = document.getElementById("top-nav-bar"); //?? Error when variable is named top
sideNav = document.getElementById("side-nav-bar");
fontWhite = document.querySelectorAll('.font-white')
fontPeach = document.querySelectorAll('.font-peach')
sideChildren = document.querySelectorAll('.side-child')
theme = document.getElementById("color-theme");
icon = document.getElementById("theme-icon");

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
        document.getElementById('search-bar-input').style.background = '#FDC28B';


        fontWhite.forEach(node => 
        {
            node.style.filter = 'invert(1)'
        })

        fontPeach.forEach(node =>
        {
            node.style.filter = 'invert(1)'
        })

        sideChildren.forEach(node => {
            node.style.webkitFilter = 'invert(1)'
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
        
        fontWhite.forEach(node => 
        {
            node.style.filter = 'invert(0)'
        })

        fontPeach.forEach(node =>
        {
            node.style.filter = 'invert(0)'
        })

        sideChildren.forEach(
            node => {
            node.style.filter = 'invert(0)'
        })
    }
}



