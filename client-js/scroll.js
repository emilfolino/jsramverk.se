(function() {
    var mainNavLinks = document.querySelectorAll(".toc ul li a");
    var mainSections = document.querySelectorAll(".week section");

    var lastId;
    var cur = [];

    window.addEventListener("scroll", function(event) {
        var fromTop = window.scrollY;

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
