import ingredients from "./ingredients.js";


(function IIFE() {
    'use strict';
    let selectedIngredients = [];



    let dropdown = document.getElementById("ingredient");
    const allIngredients = ingredients.getSortedIngredients();

    let allOptionGroup = document.createElement("optgroup");
    allOptionGroup.label = "Alla ingredienser";

    let selectedOptionGroup = document.createElement("optgroup");
    selectedOptionGroup.label = "Tidigare valda ingredienser";

    allIngredients.forEach(function(ingredient) {
        let optionElement = document.createElement("option");

        optionElement.value = ingredient;
        optionElement.textContent = ingredient;

        allOptionGroup.appendChild(optionElement);
    });

    dropdown.appendChild(allOptionGroup);

    dropdown.addEventListener("change", function changeEvent(event) {
        fillSelected(event);
    });

    if (localStorage.getItem("selectedIngredients")) {
        selectedIngredients = JSON.parse(
            localStorage.getItem("selectedIngredients")
        );

        fillSelected();
    }

    function fillSelected (event=false) {
        if (event) {
            selectedIngredients.unshift(event.target.value);
            if (selectedIngredients.length > 3) {
                selectedIngredients.pop();
            }
        }

        while (dropdown.firstChild) {
            dropdown.removeChild(dropdown.firstChild);
        }

        while (selectedOptionGroup.firstChild) {
            selectedOptionGroup.removeChild(selectedOptionGroup.firstChild);
        }

        selectedIngredients.forEach(function(ingredient) {
            let optionElement = document.createElement("option");

            optionElement.value = ingredient;
            optionElement.textContent = ingredient;

            selectedOptionGroup.appendChild(optionElement);
        });

        dropdown.appendChild(selectedOptionGroup);

        dropdown.appendChild(allOptionGroup);

        localStorage.setItem(
            "selectedIngredients",
            JSON.stringify(selectedIngredients)
        );
    }
})();
