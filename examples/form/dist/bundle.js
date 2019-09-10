/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ingredients.js":
/*!****************************!*\
  !*** ./src/ingredients.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ingredients = {\n    ingredients: [\n        \"Mjöl\",\n        \"Mjölk\",\n        \"Ägg\",\n        \"Choklad\",\n        \"Vaniljsocker\",\n        \"Bakpulver\",\n        \"Kakao\",\n        \"Socker\"\n    ],\n\n    getSortedIngredients: function () {\n        return ingredients.ingredients.sort();\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ingredients);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5ncmVkaWVudHMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5ncmVkaWVudHMuanM/MzRkOCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbmdyZWRpZW50cyA9IHtcbiAgICBpbmdyZWRpZW50czogW1xuICAgICAgICBcIk1qw7ZsXCIsXG4gICAgICAgIFwiTWrDtmxrXCIsXG4gICAgICAgIFwiw4RnZ1wiLFxuICAgICAgICBcIkNob2tsYWRcIixcbiAgICAgICAgXCJWYW5pbGpzb2NrZXJcIixcbiAgICAgICAgXCJCYWtwdWx2ZXJcIixcbiAgICAgICAgXCJLYWthb1wiLFxuICAgICAgICBcIlNvY2tlclwiXG4gICAgXSxcblxuICAgIGdldFNvcnRlZEluZ3JlZGllbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpbmdyZWRpZW50cy5pbmdyZWRpZW50cy5zb3J0KCk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5ncmVkaWVudHM7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/ingredients.js\n");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ingredients_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ingredients.js */ \"./src/ingredients.js\");\n\n\n\n(function IIFE() {\n    'use strict';\n    let selectedIngredients = [];\n\n\n\n    let dropdown = document.getElementById(\"ingredient\");\n    const allIngredients = _ingredients_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSortedIngredients();\n\n    let allOptionGroup = document.createElement(\"optgroup\");\n    allOptionGroup.label = \"Alla ingredienser\";\n\n    let selectedOptionGroup = document.createElement(\"optgroup\");\n    selectedOptionGroup.label = \"Tidigare valda ingredienser\";\n\n    allIngredients.forEach(function(ingredient) {\n        let optionElement = document.createElement(\"option\");\n\n        optionElement.value = ingredient;\n        optionElement.textContent = ingredient;\n\n        allOptionGroup.appendChild(optionElement);\n    });\n\n    dropdown.appendChild(allOptionGroup);\n\n    dropdown.addEventListener(\"change\", function changeEvent(event) {\n        fillSelected(event);\n    });\n\n    if (localStorage.getItem(\"selectedIngredients\")) {\n        selectedIngredients = JSON.parse(\n            localStorage.getItem(\"selectedIngredients\")\n        );\n\n        fillSelected();\n    }\n\n    function fillSelected (event=false) {\n        if (event) {\n            selectedIngredients.unshift(event.target.value);\n            if (selectedIngredients.length > 3) {\n                selectedIngredients.pop();\n            }\n        }\n\n        while (dropdown.firstChild) {\n            dropdown.removeChild(dropdown.firstChild);\n        }\n\n        while (selectedOptionGroup.firstChild) {\n            selectedOptionGroup.removeChild(selectedOptionGroup.firstChild);\n        }\n\n        selectedIngredients.forEach(function(ingredient) {\n            let optionElement = document.createElement(\"option\");\n\n            optionElement.value = ingredient;\n            optionElement.textContent = ingredient;\n\n            selectedOptionGroup.appendChild(optionElement);\n        });\n\n        dropdown.appendChild(selectedOptionGroup);\n\n        dropdown.appendChild(allOptionGroup);\n\n        localStorage.setItem(\n            \"selectedIngredients\",\n            JSON.stringify(selectedIngredients)\n        );\n    }\n})();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGluZ3JlZGllbnRzIGZyb20gXCIuL2luZ3JlZGllbnRzLmpzXCI7XG5cblxuKGZ1bmN0aW9uIElJRkUoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGxldCBzZWxlY3RlZEluZ3JlZGllbnRzID0gW107XG5cblxuXG4gICAgbGV0IGRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmdyZWRpZW50XCIpO1xuICAgIGNvbnN0IGFsbEluZ3JlZGllbnRzID0gaW5ncmVkaWVudHMuZ2V0U29ydGVkSW5ncmVkaWVudHMoKTtcblxuICAgIGxldCBhbGxPcHRpb25Hcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcbiAgICBhbGxPcHRpb25Hcm91cC5sYWJlbCA9IFwiQWxsYSBpbmdyZWRpZW5zZXJcIjtcblxuICAgIGxldCBzZWxlY3RlZE9wdGlvbkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xuICAgIHNlbGVjdGVkT3B0aW9uR3JvdXAubGFiZWwgPSBcIlRpZGlnYXJlIHZhbGRhIGluZ3JlZGllbnNlclwiO1xuXG4gICAgYWxsSW5ncmVkaWVudHMuZm9yRWFjaChmdW5jdGlvbihpbmdyZWRpZW50KSB7XG4gICAgICAgIGxldCBvcHRpb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblxuICAgICAgICBvcHRpb25FbGVtZW50LnZhbHVlID0gaW5ncmVkaWVudDtcbiAgICAgICAgb3B0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IGluZ3JlZGllbnQ7XG5cbiAgICAgICAgYWxsT3B0aW9uR3JvdXAuYXBwZW5kQ2hpbGQob3B0aW9uRWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICBkcm9wZG93bi5hcHBlbmRDaGlsZChhbGxPcHRpb25Hcm91cCk7XG5cbiAgICBkcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIGNoYW5nZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGZpbGxTZWxlY3RlZChldmVudCk7XG4gICAgfSk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZWxlY3RlZEluZ3JlZGllbnRzXCIpKSB7XG4gICAgICAgIHNlbGVjdGVkSW5ncmVkaWVudHMgPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZWxlY3RlZEluZ3JlZGllbnRzXCIpXG4gICAgICAgICk7XG5cbiAgICAgICAgZmlsbFNlbGVjdGVkKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsbFNlbGVjdGVkIChldmVudD1mYWxzZSkge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSW5ncmVkaWVudHMudW5zaGlmdChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5ncmVkaWVudHMubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5ncmVkaWVudHMucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoZHJvcGRvd24uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZHJvcGRvd24ucmVtb3ZlQ2hpbGQoZHJvcGRvd24uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoc2VsZWN0ZWRPcHRpb25Hcm91cC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBzZWxlY3RlZE9wdGlvbkdyb3VwLnJlbW92ZUNoaWxkKHNlbGVjdGVkT3B0aW9uR3JvdXAuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RlZEluZ3JlZGllbnRzLmZvckVhY2goZnVuY3Rpb24oaW5ncmVkaWVudCkge1xuICAgICAgICAgICAgbGV0IG9wdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXG4gICAgICAgICAgICBvcHRpb25FbGVtZW50LnZhbHVlID0gaW5ncmVkaWVudDtcbiAgICAgICAgICAgIG9wdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSBpbmdyZWRpZW50O1xuXG4gICAgICAgICAgICBzZWxlY3RlZE9wdGlvbkdyb3VwLmFwcGVuZENoaWxkKG9wdGlvbkVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkcm9wZG93bi5hcHBlbmRDaGlsZChzZWxlY3RlZE9wdGlvbkdyb3VwKTtcblxuICAgICAgICBkcm9wZG93bi5hcHBlbmRDaGlsZChhbGxPcHRpb25Hcm91cCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICBcInNlbGVjdGVkSW5ncmVkaWVudHNcIixcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSW5ncmVkaWVudHMpXG4gICAgICAgICk7XG4gICAgfVxufSkoKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ })

/******/ });