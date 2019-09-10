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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ingredients_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ingredients.js */ \"./src/ingredients.js\");\n\n\n(function IIFE() {\n    'use strict';\n\n    console.log(_ingredients_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSortedIngredients());\n\n    console.log(\"hej di li hopp\");\n})();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGluZ3JlZGllbnRzIGZyb20gXCIuL2luZ3JlZGllbnRzLmpzXCI7XG5cbihmdW5jdGlvbiBJSUZFKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGNvbnNvbGUubG9nKGluZ3JlZGllbnRzLmdldFNvcnRlZEluZ3JlZGllbnRzKCkpO1xuXG4gICAgY29uc29sZS5sb2coXCJoZWogZGkgbGkgaG9wcFwiKTtcbn0pKCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ })

/******/ });