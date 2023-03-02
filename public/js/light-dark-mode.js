/*
    Code adapted from:
        https://stackoverflow.com/questions/67662216/dark-light-mode-button
*/

// Get navigation bar class members from html.
top = document.getElementById("top-nav-bar");
side = document.getElementById("side-nav-bar");
light = document.getElementById("light");
dark = document.getElementById("dark");


function lightDarkMode()
{
    // If page is in light mode
    if (light.style.visibility == "hidden")
    {
        // Switch button to light mode
        light.style.visibility = "visible";
        light.style.display = "inline";
        dark.style.visibility = "hidden";
        dark.style.display = "none";

        // Make selected elements as dark.
        top.style.background = 0x1B1B1B;
        side.style.background = 0x1B1B1B;
        
    }
    else
    {   
        // Switch button to dark mode
        light.style.visibility = "hidden";
        light.style.display = "none";
        dark.style.visibility = "visible";
        dark.style.display = "inline";

        // Make selected elements as light.
        top.style.background = 0xFFFFFF;
        side.style.background = 0xFFFFFF;
        
    }
}



