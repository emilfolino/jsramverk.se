let ucElement;
let count = 0;
let ucInterval;

document.addEventListener("turbolinks:before-visit", function () {
    let tmpElement = document.getElementById("under-construction");

    if (tmpElement) {
        tmpElement.remove();
    }

    ucElement = null;
    count = 0;
    clearInterval(ucInterval);
});

document.addEventListener("turbolinks:load", function () {
    const animationFunctions = [
        addSign,
        addBlinking,
        addBar,
        addWorker,
        addSmallTruck,
        addBigTruck,
        ohComeOn
    ];

    ucElement = document.getElementById("under-construction");

    if (ucElement) {
        setTimeout(function() {
            ucInterval = setInterval(function () {
                animationFunctions[count++]();

                if (count >= animationFunctions.length) {
                    clearInterval(ucInterval);
                }
            }, 8000);
        }, 12000);
    }

    function addSign() {
        let element = document.createElement("img");

        element.src = "under-construction.png";
        element.alt = "Under Construction";
        element.className = "fade-in";

        ucElement.prepend(element);
    }

    function addBlinking() {
        let element = document.createElement("img");

        element.src = "blinking.gif";
        element.alt = "Blinking Lamps";
        element.className = "blinking";

        document.getElementById("main-container").prepend(element);
    }

    function addBar() {
        let element = document.createElement("img");

        element.src = "bar.gif";
        element.alt = "Under Construction Bar";
        element.className = "bar";

        document.getElementById("main-container").prepend(element);
    }

    function addWorker() {
        let element = document.createElement("img");

        element.src = "worker.gif";
        element.alt = "Working Hard";

        ucElement.append(element);
    }

    function addSmallTruck() {
        let element = document.createElement("img");

        element.src = "truck.gif";
        element.alt = "Small Truck";
        element.className = "truck";

        document.getElementById("main-container").prepend(element);
    }

    function addBigTruck() {
        let element = document.createElement("img");
        let truckHeight = ucElement.offsetTop;

        element.src = "big-truck.gif";
        element.alt = "Big Truck";
        element.style.top = truckHeight + "px";
        element.className = "big-truck";

        document.getElementById("main-container").prepend(element);
    }

    function ohComeOn() {
        let element = document.createElement("div");

        element.textContent = "Oh Come On, it's not the 90's anymore";
        element.className = "oh-come-on";

        document.getElementById("main-container").prepend(element);
    }
});



