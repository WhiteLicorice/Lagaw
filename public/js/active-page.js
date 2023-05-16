/* const active = window.location.pathname;
const links = document.querySelectorAll('nav li a').
forEach(link => {
    if(link.href.includes('${active}')){
        link.classList.add('active');
    }
}); */

var currentURL = window.location.href;

var pageNames = ["http://localhost:8080/places-and-landmarks", "http://localhost:8080/culture-and-festivals", "http://localhost:8080/food", "http://localhost:8080/accommodation", "http://localhost:8080/traffic"];

for (var index = 1; index <= pageNames.length; i++) 
{
  var link = document.getElementById("link" + i);
  var image = link.getElementsByTagName("img");
  var text = link.getElementsByTagName("p");

  if (currentURL.includes(pageNames[i])) 
  {
    image.style.color = "#b57e07";
    text.style.color = "#b57e07";
  }
  else
  {
    image.style.color = "white";
    text.style.color = "white";
  }
}