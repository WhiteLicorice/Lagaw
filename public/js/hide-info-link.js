var assets = document.querySelectorAll('a[data-href]');

assets.forEach(asset => {
    asset.addEventListener('click', function(e){
        var point = e.target;
        window.open(point.getAttribute('data-href'))
    });
})
