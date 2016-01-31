declare var e: typeof eval, global: NodeJS.Global;
declare module RippleEffect {

  interface support {
    touch: boolean;
  }

  interface vendor {
    animationend: string;
    defaultEvent: string;
    transitionend: string;
    prefix: string;
    transform: string;
  }

  interface Touch {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
  }

  export interface TouchEvent extends MouseEvent {
    changedTouches: Touch[];
    touches: Touch[];
  }

  interface option {
    color: string;
    width: string;
    height: string;
    time: number;
    line: number;
    gradation: number;
    image: string;
    isCircle: boolean;
  }

}

