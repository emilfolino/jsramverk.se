document.addEventListener("turbolinks:load", function () {
    var mainNavLinks = document.querySelectorAll(".toc ul li a");
    var footer = document.getElementById("footer");
    var toc = document.getElementById("toc");
    var topToToc = 14.5 * parseFloat(getComputedStyle(document.body).fontSize);

    if (toc) {
        window.addEventListener("scroll", function() {
            var fromTop = window.scrollY + 200;
            var tocAbsoluteBottom = window.scrollY + topToToc + toc.clientHeight;
            var limit = document.body.clientHeight - footer.clientHeight;

            if (tocAbsoluteBottom > limit) {
                toc.style.top = "0px";
            } else {
                toc.style.top = topToToc + "px";
            }

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
    }
});
