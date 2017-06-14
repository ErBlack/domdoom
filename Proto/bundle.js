/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Cacodemon = __webpack_require__(1);
	onDomReady = __webpack_require__(18);

	__webpack_require__(19);

	onDomReady(function() {
	    new Cacodemon(document.querySelector('.cacodemon'));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const css = __webpack_require__(2);
	const DomMonster = __webpack_require__(17);


	class Vector {
	    constructor(a, b) {
	        this._a = a;
	        this._b = b;
	    }
	    get width() {
	        return this._a[0] - this._b[0];
	    }

	    get height() {
	        return this._a[1] - this._b[1];
	    }

	    get length() {
	        return Math.sqrt(this.width * this.width + this.height * this.height);
	    }

	    valueOf() {
	        return length;
	    }
	}

	module.exports = class Cacodemon extends DomMonster {
	    constructor() {
	        super(...arguments);

	        this._mode = 'watch';

	        Object.assign(this.data, {
	            angle: 0
	        });

	        this._template();

	        this._onMouseMove = this._onMouseMove.bind(this);

	        this._body.addEventListener('click', function () {
	            this._elem.classList.add('cacodemon_death');
	        }.bind(this));

	        document.body.addEventListener('mousemove', this._onMouseMove);

	        this._panicDistance = 160;
	    }

	    get bounds() {
	        return this._body.getBoundingClientRect();
	    }

	    get center() {
	        const bounds = this._elem.getBoundingClientRect();

	        return [
	            bounds.left,
	            bounds.top
	        ];
	    }

	    _onMouseMove(e) {
	        const run = this._calcRunaway(e.clientX, e.clientY);
	        
	        if (run) {
	            this.data.angle = this._calcAngle(e.clientX);

	            Object.assign(this, run);
	        } else {
	            this.data.angle = 0;
	        }
	    }

	    _calcRunaway(x, y) {
	        const center = this.center;
	        const v = new Vector([x, y], this.center);
	        const offset = this._panicDistance - v.length;
	        const speed = 1.5;

	        if (offset > 0) {
	            const mult = offset / v.length;

	            return {
	                left: center[0] - v.width * mult * speed,
	                top: center[1] - v.height * mult * speed
	            }
	        }
	    }

	    _calcAngle(x) {
	        const center = this.center[0];
	        let rect = this.bounds;
	        let left = rect.left;
	        let right = left + rect.width;

	        const leftPanicBound = center - this._panicDistance;
	        const rightPanicBound = center + this._panicDistance;

	        if (x >= leftPanicBound && x < left) {
	            return -45;
	        } else if (x >= left && x < center) {
	            return -90;
	        } if (x >= center && x <= right) {
	            return 90;
	        } else if (x > right && x <= rightPanicBound) {
	            return 45;
	        } else {
	            return 0;
	        }
	    }

	    _template() {
	        this._sprite = document.createElement('div');
	        this._sprite.className = 'sprite';
	        this._elem.appendChild(this._sprite);

	        this._body = document.createElement('div');
	        this._body.className = 'body';
	        this._elem.appendChild(this._body);
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".cacodemon\r\n{\r\n    position: fixed;\r\n    left: 50%;\r\n    top: 50%;\r\n    width: 0;\r\n    height: 0;\r\n    transition: top .5s ease-out, left .5s ease-out;\r\n}\r\n\r\n.cacodemon .sprite\r\n{\r\n    background: url(" + __webpack_require__(5) + ") 50% 50% no-repeat;\r\n    position: absolute;\r\n    left: -80px;\r\n    top: -80px;\r\n    width: 160px;\r\n    height: 160px;\r\n}\r\n\r\n.cacodemon[data-angle*=\"45\"] .sprite\r\n{\r\n    background-image: url(" + __webpack_require__(6) + ");\r\n}\r\n\r\n.cacodemon[data-angle*=\"90\"] .sprite\r\n{\r\n    background-image: url(" + __webpack_require__(7) + ");\r\n}\r\n\r\n.cacodemon[data-angle*=\"135\"] .sprite\r\n{\r\n    background-image: url(" + __webpack_require__(8) + ");\r\n}\r\n\r\n.cacodemon[data-angle*=\"180\"] .sprite\r\n{\r\n    background-image: url(" + __webpack_require__(9) + ");\r\n}\r\n\r\n.cacodemon[data-angle^=\"-\"] .sprite\r\n{\r\n    transform: scaleX(-1);\r\n}\r\n\r\n.cacodemon .body {\r\n    border-radius: 100%;\r\n    position: absolute;\r\n    width: 125px;\r\n    height: 114px;\r\n    top: -49px;\r\n    left: -62px;\r\n}\r\n\r\n.cacodemon_death .sprite\r\n{\r\n    animation: death .5s steps(1);\r\n    animation-fill-mode: both;\r\n    transform: none !important;\r\n}\r\n\r\n.cacodemon_death .body\r\n{\r\n    cursor: default;\r\n}\r\n\r\n@keyframes death {\r\n    16.5% {\r\n        background-image: url(" + __webpack_require__(10) + ");\r\n    }\r\n    33% {\r\n        background-image: url(" + __webpack_require__(11) + ");\r\n    }\r\n    49.5% {\r\n        background-image: url(" + __webpack_require__(12) + ");\r\n    }\r\n    66% {\r\n        background-image: url(" + __webpack_require__(13) + ");\r\n    }\r\n    82.5% {\r\n        background-image: url(" + __webpack_require__(14) + ");\r\n    }\r\n    100% {\r\n        background-image: url(" + __webpack_require__(15) + ");\r\n    }\r\n}", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bfcaf8b0618d3e24cff07d397d14a042.png";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "28912b5d823f3b10f85cca968077aa64.png";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "398eedcd631f3733f14e81b46be3f783.png";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "09ad6a142cd3c530f600c7743bcabcfa.png";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "95d9d67a127ad7c2016f6f10f59fbee8.png";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ae449e8c36fe3a440e334fe6ccf1f47a.png";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "62d13dc631d37aa9d5acd1c00866e580.png";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "12e0e9b295d73761b8dbfb90b9d4f45f.png";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "070a74ce631c4d27a128097e0f2d549b.png";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a9385587318a7a4079b1c282eda45e92.png";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e93e279cec26163601fb22c905d48e7d.png";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = class DomMonster {
	    constructor(elem) {
	        if (elem instanceof HTMLElement) {
	            this._elem = elem;
	        } else {
	            throw new TypeError('elem should be an instance of HTMLElement');
	        }
	    }
	    /**
	     * main dataset
	     */
	    get data() {
	        return this._elem.dataset;
	    }

	    get left() {
	        return Number(this._elem.style.left);
	    }

	    set left(value) {
	        return this._elem.style.left = value + 'px';
	    }

	    get top() {
	        return Number(this._elem.style.top);
	    }

	    set top(value) {
	        return this._elem.style.top = value + 'px';
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	const domReady = new Promise(function (resolve) {
	    if (document.addEventListener) {
	        document.addEventListener('DOMContentLoaded', resolve);
	    } else {
	        window.addEventListener('load', resolve);
	    }
	});

	function errorHandler(e) {
	    console.error(e);

	    throw e;
	}

	module.exports = function onDomReady(cb) {
	    domReady.then(cb).catch(errorHandler);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "body {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n", ""]);

	// exports


/***/ }
/******/ ]);