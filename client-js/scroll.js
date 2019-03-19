(function() {
    var mainNavLinks = document.querySelectorAll(".toc ul li a");

    window.addEventListener("scroll", function() {
        var fromTop = window.scrollY + 200;

        mainNavLinks.forEach(function(link) {
            var section = document.querySelector(link.hash);

            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add("current");
            } else {
                link.classList.remove("current");
            }
        });
    });
})();
