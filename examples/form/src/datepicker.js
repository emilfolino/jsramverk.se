const datepicker = {
    year: 1990,
    month: 1,
    day: 1,
    current: 0,
    order: [],

    element: null,
    number: null,

    init: function (id) {
        datepicker.element = document.getElementById(id);

        datepicker.order = [
            datepicker.year,
            datepicker.month,
            datepicker.day,
        ];

        datepicker.element.onfocus = datepicker.show;
        datepicker.element.onblur = datepicker.hide;
    },

    show: function () {
        datepicker.element.nextElementSibling.style.display = "block";
        datepicker.reset();
    },

    // hide: function () {
    //     datepicker.element.nextElementSibling.style.display = "none";
    // },

    reset: function () {
        let dp = datepicker.element.nextElementSibling;

        while (dp.firstChild) {
            dp.removeChild(dp.firstChild);
        }

        let picker = document.createElement("div");
        picker.className = "picker";

        let top = document.createElement("div");
        top.className = "top arrow";
        top.textContent = "^";

        datepicker.number = document.createElement("div");
        datepicker.number.className = "number";
        datepicker.number.textContent = datepicker.year;

        let bottom = document.createElement("div");
        bottom.className = "bottom arrow";
        bottom.textContent = "v";

        let next = document.createElement("div");
        next.className = "next";
        next.textContent = ">";

        top.addEventListener("click", datepicker.increase);
        bottom.addEventListener("click", datepicker.decrease);

        next.addEventListener("click", datepicker.moveon);

        picker.appendChild(top);
        picker.appendChild(datepicker.number);
        picker.appendChild(bottom);
        picker.appendChild(next);

        dp.appendChild(picker);
    },

    increase: function () {
        datepicker.number.textContent = (++datepicker.order[datepicker.current]);
    },

    decrease: function () {
        datepicker.number.textContent = (--datepicker.order[datepicker.current]);
    },

    moveon: function () {
        datepicker.number.textContent = (datepicker.order[++datepicker.current]);
    },

    zeroPad: function (number) {
        if (number < 10) {
            return "0" + number;
        }

        return "" + number;
    }
};

export default datepicker;
