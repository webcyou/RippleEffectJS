/// <reference path='../_all.ts' />

module RippleEffect {

  interface ClickParam {
    x: number;
    y: number;
  }

  /*
   * Ripple Controller
   */
  export class RippleController {
    private clickParam: ClickParam;
    private util: Utility;
    constructor(
      util: Utility
      ) {
      this.util = util;
      this.clickParam = {
        x: 0,
        y: 0
      };
    }

    public setClickEvent(callback?) {
      var that = this;
      document.addEventListener(this.util.vendor.defaultEvent, function(e: TouchEvent) {
        var target = <HTMLElement>e.target;
        if(target.nodeName === 'A' || target.nodeName === 'INPUT') {
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

    }
  }

}
