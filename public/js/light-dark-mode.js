// Get navigation bar class members from html.
topNav = document.getElementById("top-nav-bar"); //?? Error when variable is named top
sideNav = document.getElementById("side-nav-bar");
fontWhite = document.querySelectorAll('.font-white')
theme = document.getElementById("color-theme");
icon = document.getElementById("theme-icon");

darkMode = true; // Webpage is dark mode by default


function lightDarkMode()
    //TODO: Change element colors when swithcing modes
{
    if (darkMode == true)
    {
        darkMode = false;
        icon.src = "/img/dark.png"
        topNav.style.background = "#FFFFFF";
        sideNav.style.background = "#FFFFFF";
        
        fontWhite.forEach(node => {
            node.style.color = 'black'
          })


        
    }
    else
    {
        darkMode = true;
        icon.src = "/img/light.png";
        topNav.style.background = "#1B1B1B";
        sideNav.style.background = "#1B1B1B";

        fontWhite.forEach(node => {
            node.style.color = 'white'
          })
    }
}



