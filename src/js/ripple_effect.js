var RippleEffect;
(function (RippleEffect) {
    var Utility = (function () {
        function Utility(option) {
            this.option = option;
            this.support = {
                touch: ('ontouchstart' in window)
            };
            this.vendor = {
                defaultEvent: 'click',
                transitionend: this.whichTransitionEvent(),
                animationend: this.whichAnimationEvent(),
                prefix: this.whichPrefix(),
                transform: this.whichTransform()
            };
            if (this.support.touch) {
                this.vendor.defaultEvent = 'touchend';
            }
        }
        Utility.prototype.whichPrefix = function () {
            return (/webkit/i).test(navigator.appVersion) ? '-webkit-' : (/firefox/i).test(navigator.userAgent) ? '-moz-' :
                (/trident/i).test(navigator.userAgent) ? '-ms-' : 'opera' in window ? '-o-' : '';
        };
        Utility.prototype.whichTransform = function () {
            var t, el = document.createElement('fakeelement');
            var transform = {
                'transform': 'transform',
                'OTransform': 'OTransform',
                'MozTransform': 'MozTransform',
                'webkitTransform': 'webkitTransform'
            };
            for (t in transform) {
                if (el.style[t] !== undefined) {
                    return transform[t];
                }
            }
        };
        Utility.prototype.whichAnimationEvent = function () {
            var t, el = document.createElement('fakeelement');
            var animations = {
                'animation': 'animationend',
                'OAnimation': 'oAnimationEnd',
                'MozAnimation': 'animationend',
                'WebkitAnimation': 'webkitAnimationEnd'
            };
            for (t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        };
        Utility.prototype.whichTransitionEvent = function () {
            var t, el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        };
        return Utility;
    })();
    RippleEffect.Utility = Utility;
})(RippleEffect || (RippleEffect = {}));
var RippleEffect;
(function (RippleEffect) {
    var Ripple = (function () {
        function Ripple(color, width, height, time, line, gradation, image, isCircle, rgb, rippleClass, ripplePictureClass) {
            this.color = color;
            this.width = width;
            this.height = height;
            this.time = time;
            this.line = line;
            this.gradation = gradation;
            this.image = image;
            this.isCircle = isCircle;
            this.rgb = rgb;
            this.rippleClass = rippleClass;
            this.ripplePictureClass = ripplePictureClass;
            this.color = (this.color.match('#')) ? this.color : '#' + this.color;
            this.color = (this.color.length > 4) ? this.color : this.colorTo6Num(this.color);
            this.rgb = this.getColorToRgb();
            if (this.height === null) {
                this.height = this.width;
            }
        }
        Ripple.fromData = function (data) {
            return new Ripple(data.color ? data.color : '#64c7eb', data.width ? data.width : '50px', data.height ? data.height : null, data.time ? data.time : 500, data.line ? data.line : 0, data.gradation ? data.gradation : null, data.image ? data.image : null, data.isCircle ? data.isCircle : true, null, data.rippleClass ? data.rippleClass : 'rf-ripple', data.ripplePictureClass ? data.ripplePictureClass : 'rf-ripple-picture');
        };
        Ripple.prototype.colorTo6Num = function (color) {
            var firstNum = color.slice(1, 2) + color.slice(1, 2);
            var secondNum = color.slice(2, 3) + color.slice(2, 3);
            var thirdNum = color.slice(3, 4) + color.slice(3, 4);
            return '#' + firstNum + secondNum + thirdNum;
        };
        Ripple.prototype.getColorToRgb = function () {
            function hexToRGB(h) {
                function cutHex(h) {
                    return (h.charAt(0) === '#') ? h.substring(1, 7) : h;
                }
                return {
                    r: parseInt((cutHex(h)).substring(0, 2), 16),
                    g: parseInt((cutHex(h)).substring(2, 4), 16),
                    b: parseInt((cutHex(h)).substring(4, 6), 16)
                };
            }
            return hexToRGB(this.color);
        };
        return Ripple;
    })();
    RippleEffect.Ripple = Ripple;
})(RippleEffect || (RippleEffect = {}));
var RippleEffect;
(function (RippleEffect) {
    var RippleController = (function () {
        function RippleController(util) {
            this.util = util;
            this.clickParam = {
                x: 0,
                y: 0
            };
        }
        RippleController.prototype.setClickEvent = function (callback) {
            var that = this;
            document.addEventListener(this.util.vendor.defaultEvent, function (e) {
                var target = e.target;
                if (target.nodeName === 'A' || target.nodeName === 'INPUT') {
                    return;
                }
                if (e.pageX || e.pageX) {
                    that.clickParam = {
                        x: e.pageX,
                        y: e.pageY
                    };
                }
                if (e.touches !== void 0) {
                    var touch = e.changedTouches[0];
                    that.clickParam = {
                        x: touch.pageX,
                        y: touch.pageY
                    };
                }
                callback(that.clickParam);
            }, false);
        };
        return RippleController;
    })();
    RippleEffect.RippleController = RippleController;
})(RippleEffect || (RippleEffect = {}));
var RippleEffect;
(function (RippleEffect) {
    var requestAnimationFrame = window['requestAnimationFrame']
        || window['mozRequestAnimationFrame']
        || window['webkitRequestAnimationFrame']
        || window['.msRequestAnimationFrame']
        || function (callback) { window.setTimeout(callback, 1000 / 60); };
    window.requestAnimationFrame = requestAnimationFrame;
    var RippleView = (function () {
        function RippleView(util) {
            this.ripple = RippleEffect.Ripple.fromData({});
            this._diff_x = this.getCenterPoint(this.ripple.width);
            this._diff_y = this.getCenterPoint(this.ripple.height);
            this.util = util;
        }
        RippleView.prototype.getCenterPoint = function (size) {
            return size.match(/\d/g).join('') / 2;
        };
        RippleView.prototype.circleCheck = function () {
            if (this.ripple.isCircle) {
                if (this._diff_x > this._diff_y) {
                    this._diff_y = this._diff_x;
                    this.ripple.height = this.ripple.width;
                }
                else if (this._diff_x < this._diff_y) {
                    this._diff_x = this._diff_y;
                    this.ripple.width = this.ripple.height;
                }
            }
        };
        RippleView.prototype.setRippleStyle = function (option) {
            this.ripple = RippleEffect.Ripple.fromData(option);
            this._diff_x = this.getCenterPoint(this.ripple.width);
            this._diff_y = this.getCenterPoint(this.ripple.height);
            this.circleCheck();
        };
        RippleView.prototype.createRipple = function () {
            var ripple = this.createRippleWrap();
            var ripplePicture = this.createRipplePicture();
            return this.mergeRipple(ripple, ripplePicture);
        };
        RippleView.prototype.createRippleWrap = function () {
            var ripple = document.createElement('div');
            ripple.classList.add(this.ripple.rippleClass);
            ripple.style.width = this.ripple.width;
            ripple.style.height = this.ripple.height;
            return ripple;
        };
        RippleView.prototype.createRipplePicture = function () {
            var ripplePicture = document.createElement('p');
            ripplePicture.classList.add(this.ripple.ripplePictureClass);
            ripplePicture.style.width = this.ripple.width;
            ripplePicture.style.height = this.ripple.height;
            ripplePicture.style.opacity = '0';
            ripplePicture.style.borderRadius = this.getCenterPoint(this.ripple.width) + 'px';
            if (this.ripple.isCircle && this.ripple.image !== null) {
                ripplePicture.style.backgroundSize = this.ripple.width + ' auto';
            }
            else if (!this.ripple.isCircle && this.ripple.image !== null) {
                ripplePicture.style.backgroundSize = this.ripple.width + ' ' + this.ripple.height;
            }
            this.setGradient(ripplePicture);
            return ripplePicture;
        };
        RippleView.prototype.setGradient = function (ripplePicture) {
            var setPrefix = [''], rgb = this.ripple.rgb, setSize = parseInt(this.ripple.width.match(/\d/g).join(''), 10);
            if (this.util.vendor.prefix !== '') {
                setPrefix.push(this.util.vendor.prefix);
            }
            function setStyle(setPrefix) {
                ripplePicture.style.background = setPrefix + 'gradient(radial, center center, ' + (setSize * 0.3) + ', center center, ' + setSize +
                    ', from(rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 0)), ' + 'to(rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1)))';
            }
            for (var i = 0; i < setPrefix.length; i++) {
                setStyle(setPrefix[i]);
            }
            return ripplePicture;
        };
        RippleView.prototype.setAnimation = function (rippleElem) {
            var that = this, vendorTransform = this.util.vendor.transform, animationStartTime = 0, defaultOpacty = 0.5, defaultScale = 0.2;
            var startAnimation = function () {
                animationStartTime = Date.now();
                requestAnimationFrame(update);
            };
            rippleElem.opacity = defaultOpacty;
            rippleElem.style.transform = 'scale(' + defaultScale + ')';
            if (vendorTransform !== 'transform') {
                rippleElem.style[vendorTransform] = 'scale(' + defaultScale + ')';
            }
            function update() {
                var currentTime = Date.now(), animationFrame = (currentTime - animationStartTime) / that.ripple.time, addOpacityVal = animationFrame * 0.5 / 0.85, addScaleVal = animationFrame * 1.6 / 0.85;
                if (animationFrame >= 0.85) {
                    addOpacityVal = animationFrame * -0.06 / 0.15;
                    addScaleVal = animationFrame * 0.3 / 0.15;
                }
                rippleElem.style.opacity = defaultOpacty + addOpacityVal;
                rippleElem.style.transform = 'scale(' + (defaultScale + addScaleVal) + ')';
                if (vendorTransform !== 'transform') {
                    rippleElem.style[vendorTransform] = 'scale(' + (defaultScale + addScaleVal) + ')';
                }
                if (animationFrame <= 1) {
                    requestAnimationFrame(update);
                }
                else if (animationFrame >= 1) {
                    that.removeRipple(rippleElem.parentNode);
                }
            }
            startAnimation();
        };
        RippleView.prototype.mergeRipple = function (ripple, ripplePicture) {
            ripple.appendChild(ripplePicture);
            this.setAnimation(ripplePicture);
            return ripple;
        };
        RippleView.prototype.appendRipple = function (args) {
            var newRipple = this.createRipple();
            newRipple.style.top = (args.y - this._diff_y) + 'px';
            newRipple.style.left = (args.x - this._diff_x) + 'px';
            newRipple.style.position = 'absolute';
            newRipple.style.zIndex = '5000';
            document.body.appendChild(newRipple);
        };
        RippleView.prototype.removeRipple = function (removeElem) {
            removeElem.parentNode.removeChild(removeElem);
        };
        return RippleView;
    })();
    RippleEffect.RippleView = RippleView;
})(RippleEffect || (RippleEffect = {}));
'use strict';
var e = eval, global = e('this');
var RippleEffect;
(function (RippleEffect) {
    var RippleModel = (function () {
        function RippleModel(option) {
            this.util = new RippleEffect.Utility;
            if (RippleModel._instance) {
                if (option !== void 0) {
                    RippleModel._instance.view.setRippleStyle(option);
                }
                return RippleModel._instance;
            }
            else {
                this.view = new RippleEffect.RippleView(this.util);
                this.controller = new RippleEffect.RippleController(this.util);
                this.setClickEvent();
                RippleModel._instance = this;
            }
        }
        RippleModel.prototype.setClickEvent = function () {
            var that = this;
            this.controller.setClickEvent(function (args) {
                that.view.appendRipple(args);
            });
        };
        RippleModel._instance = null;
        return RippleModel;
    })();
    RippleEffect.RippleModel = RippleModel;
    new RippleModel();
})(RippleEffect || (RippleEffect = {}));
if (typeof (module) !== 'undefined') {
    if (typeof (module).exports.RippleEffect === 'undefined') {
        (module).exports.RippleEffect = {};
    }
    (module).exports.RippleEffect = RippleEffect.RippleModel;
}
if (typeof (global) !== 'undefined') {
    if (typeof global['RippleEffect'] === 'undefined') {
        global['RippleEffect'] = {};
    }
    global['RippleEffect'] = RippleEffect.RippleModel;
}
