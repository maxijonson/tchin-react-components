export const DOWN: string;
export const LEFT: string;
export const RIGHT: string;
export class Swipeable {
    static defaultProps: {
        delta: number;
        preventDefaultTouchmoveEvent: boolean;
        rotationAngle: number;
        trackMouse: boolean;
        trackTouch: boolean;
    };
    constructor(props: any);
    forceUpdate(callback: any): void;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace Swipeable {
    namespace propTypes {
        function delta(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace delta {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function innerRef(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace innerRef {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function nodeName(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace nodeName {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function onSwiped(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace onSwiped {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function onSwipedDown(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace onSwipedDown {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function onSwipedLeft(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace onSwipedLeft {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function onSwipedRight(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace onSwipedRight {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function onSwipedUp(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace onSwipedUp {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function onSwiping(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace onSwiping {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function preventDefaultTouchmoveEvent(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace preventDefaultTouchmoveEvent {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function rotationAngle(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace rotationAngle {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function trackMouse(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace trackMouse {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function trackTouch(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace trackTouch {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export const UP: string;
export function useSwipeable(props: any): any;
