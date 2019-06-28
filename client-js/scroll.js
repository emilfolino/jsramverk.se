let mainNavLinks;

document.addEventListener("turbolinks:before-visit", function () {
    let tmpElement = document.getElementById("toc");

    if (tmpElement) {
        tmpElement.remove();
    }

    mainNavLinks = null;
});

document.addEventListener("turbolinks:load", function () {
    mainNavLinks = document.querySelectorAll(".toc ul li a");
    let footer = document.getElementById("footer");
    let toc = document.getElementById("toc");
    let topToToc = 14.5 * parseFloat(getComputedStyle(document.body).fontSize);

    if (toc) {
        window.addEventListener("scroll", function() {
            let fromTop = window.scrollY + 200;
            let tocAbsoluteBottom = window.scrollY + topToToc + toc.clientHeight;
            let limit = document.body.clientHeight - footer.clientHeight;

            if (tocAbsoluteBottom > limit) {
                toc.style.top = "0px";
            } else {
                toc.style.top = topToToc + "px";
            }

            mainNavLinks.forEach(function(link) {
                let section = document.querySelector(link.hash);

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
