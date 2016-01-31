/// <reference path='../_all.ts' />

module RippleEffect {

  /*
   * Ripple
   */
  interface RGB {
    r: number;
    g: number;
    b: number;
  }

  export class Ripple {
    constructor(
      public color: string,
      public width: string,
      public height: string,
      public time: number,
      public line: number,
      public gradation: number,
      public image: string,
      public isCircle: boolean,
      public rgb: RGB,
      public rippleClass: string,
      public ripplePictureClass: string
      ) {
      this.color = (this.color.match('#')) ? this.color : '#' + this.color;
      this.color = (this.color.length > 4) ? this.color : this.colorTo6Num(this.color);
      this.rgb = this.getColorToRgb();
      if (this.height === null) {
        this.height = this.width;
      }
    }
    static fromData(data: any): Ripple {
      return new Ripple(
        data.color ? data.color : '#64c7eb',
        data.width ? data.width : '50px',
        data.height ? data.height : null,
        data.time ? data.time : 500,
        data.line ? data.line : 0,
        data.gradation ? data.gradation : null,
        data.image ? data.image : null,
        data.isCircle ? data.isCircle : true,
        null,
        data.rippleClass ? data.rippleClass : 'rf-ripple',
        data.ripplePictureClass ? data.ripplePictureClass : 'rf-ripple-picture'
      );
    }

    public colorTo6Num(color: string): string {
      var firstNum = color.slice(1, 2) + color.slice(1, 2);
      var secondNum = color.slice(2, 3) + color.slice(2, 3);
      var thirdNum = color.slice(3, 4) + color.slice(3, 4);
      return '#' + firstNum + secondNum + thirdNum;
    }

    public getColorToRgb(): RGB {
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
    }
  }

}

