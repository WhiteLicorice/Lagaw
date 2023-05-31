var assets = document.querySelectorAll('a[data-href]');

assets.forEach(asset => {
    asset.addEventListener('click', function(e){
        var point = e.target;
        window.location.href = point.getAttribute('data-href')
    });   
})
