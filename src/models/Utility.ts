/// <reference path='../_all.ts' />

module RippleEffect {

  /**
   * Utility Class
   * @public
   * @param option
   */
  export class Utility {
    private support: support;
    public vendor: vendor;
    constructor(
      public option?
      ) {
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

    public whichPrefix() {
      return (/webkit/i).test(navigator.appVersion) ? '-webkit-' : (/firefox/i).test(navigator.userAgent) ? '-moz-' :
        (/trident/i).test(navigator.userAgent) ? '-ms-' : 'opera' in window ? '-o-' : '';
    }

    public whichTransform() {
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
    }

    public whichAnimationEvent() {
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
    }

    public whichTransitionEvent() {
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
    }
  }

}
