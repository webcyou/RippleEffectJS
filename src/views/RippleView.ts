/// <reference path='../_all.ts' />

module RippleEffect {
  var requestAnimationFrame = window['requestAnimationFrame']
    || window['mozRequestAnimationFrame']
    || window['webkitRequestAnimationFrame']
    || window['.msRequestAnimationFrame']
    || function (callback) { window.setTimeout(callback, 1000 / 60); };
  window.requestAnimationFrame = requestAnimationFrame;

  /*
   * Ripple View
   */
  export class RippleView {
    private util: Utility;
    private ripple: Ripple = Ripple.fromData({});
    private _diff_x: number = this.getCenterPoint(this.ripple.width);
    private _diff_y: number = this.getCenterPoint(this.ripple.height);
    constructor(
      util: Utility
      ) {
      this.util = util;
    }

    public getCenterPoint(size: any): number {
      return size.match(/\d/g).join('') / 2;
    }

    public circleCheck() {
      if (this.ripple.isCircle) {
        if (this._diff_x > this._diff_y) {
          this._diff_y = this._diff_x;
          this.ripple.height = this.ripple.width;
        } else if (this._diff_x < this._diff_y) {
          this._diff_x = this._diff_y;
          this.ripple.width = this.ripple.height;
        }
      }
    }

    public setRippleStyle(option: option) {
      this.ripple = Ripple.fromData(option);
      this._diff_x = this.getCenterPoint(this.ripple.width);
      this._diff_y = this.getCenterPoint(this.ripple.height);
      this.circleCheck();
    }

    public createRipple(): HTMLElement {
      var ripple: HTMLElement = this.createRippleWrap();
      var ripplePicture: HTMLElement = this.createRipplePicture();
      return this.mergeRipple(ripple, ripplePicture);
    }

    public createRippleWrap(): HTMLElement {
      var ripple: HTMLElement = document.createElement('div');
      ripple.classList.add(this.ripple.rippleClass);
      ripple.style.width = this.ripple.width;
      ripple.style.height = this.ripple.height;
      return ripple;
    }

    public createRipplePicture (): HTMLElement {
      var ripplePicture: HTMLElement = document.createElement('p');
      ripplePicture.classList.add(this.ripple.ripplePictureClass);
      ripplePicture.style.width = this.ripple.width;
      ripplePicture.style.height = this.ripple.height;
      ripplePicture.style.opacity = '0';
      ripplePicture.style.borderRadius = this.getCenterPoint(this.ripple.width) + 'px';
      if (this.ripple.isCircle && this.ripple.image !== null) {
        ripplePicture.style.backgroundSize = this.ripple.width + ' auto';
      } else if (!this.ripple.isCircle && this.ripple.image !== null) {
        ripplePicture.style.backgroundSize = this.ripple.width + ' ' + this.ripple.height;
      }
      this.setGradient(ripplePicture);
      return ripplePicture;
    }

    public setGradient(ripplePicture): HTMLElement {
      var setPrefix = [''],
          rgb = this.ripple.rgb,
          setSize = parseInt(this.ripple.width.match(/\d/g).join(''), 10);

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
    }

    public setAnimation(rippleElem) {
      var that = this,
          vendorTransform = this.util.vendor.transform,
          animationStartTime = 0,
          defaultOpacty = 0.5,
          defaultScale = 0.2;

      var startAnimation = function() {
        animationStartTime = Date.now();
        requestAnimationFrame(update);
      };
      rippleElem.opacity = defaultOpacty;
      rippleElem.style.transform = 'scale(' + defaultScale + ')';
      if (vendorTransform !== 'transform') {
        rippleElem.style[vendorTransform] = 'scale(' + defaultScale + ')';
      }

      function update() {
        var currentTime = Date.now(),
            animationFrame = (currentTime - animationStartTime) / that.ripple.time,
            addOpacityVal = animationFrame * 0.5 / 0.85,
            addScaleVal = animationFrame * 1.6 / 0.85;

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
        } else if (animationFrame >= 1) {
          that.removeRipple(rippleElem.parentNode);
        }
      }
      startAnimation();
    }

    public mergeRipple(ripple: HTMLElement, ripplePicture: HTMLElement): HTMLElement {
      ripple.appendChild(ripplePicture);
      this.setAnimation(ripplePicture);
      return ripple;
    }

    public appendRipple(args) {
      var newRipple = this.createRipple();
      newRipple.style.top = (args.y - this._diff_y) + 'px';
      newRipple.style.left = (args.x - this._diff_x) + 'px';
      newRipple.style.position = 'absolute';
      newRipple.style.zIndex = '5000';
      document.body.appendChild(newRipple);
    }

    public removeRipple(removeElem) {
      removeElem.parentNode.removeChild(removeElem);
    }

  }
}
