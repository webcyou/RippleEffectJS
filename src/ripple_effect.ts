/*
 * Author: Daisuke Takayama
 */
/// <reference path='_all.ts' />

'use strict';
var e = eval, global: NodeJS.Global = e('this');
module RippleEffect {

  /*
   * Ripple Model
   */
  export class RippleModel {
    private static _instance: RippleModel = null;
    private util: Utility = new Utility;
    private view: RippleView;
    private controller: RippleController;
    constructor(
      option?: option
      ) {
      if (RippleModel._instance) {
        if (option !== void 0) {
          RippleModel._instance.view.setRippleStyle(option);
        }
        return RippleModel._instance;
      } else {
        this.view = new RippleView(this.util);
        this.controller = new RippleController(this.util);
        this.setClickEvent();
        RippleModel._instance = this;
      }
    }

    public setClickEvent() {
      var that = this;
      this.controller.setClickEvent(function(args) {
        that.view.appendRipple(args);
      });
    }

  }

  new RippleModel();
}

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
