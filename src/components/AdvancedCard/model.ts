export type IChildren = React.ReactNode;
export type IRenderer = (props: { children?: IChildren }) => JSX.Element;
export type IBodyAlignment = "left" | "right";

export interface ICardInternalProps {
    bodyAlignment?: IBodyAlignment;
    delay?: number;
    duration?: number;
    hasRevealed?: boolean;
    isReveal?: boolean; // If Card is a child of a react-reveal component
}

export interface ICardProps {
    /**
     * Defines the Content container
     */
    ContentRenderer?: IRenderer;

    /**
     * Defines the Header container
     */
    HeaderRenderer?: IRenderer;

    /**
     * Defines the Title container
     */
    TitleRenderer?: IRenderer;
    /**
     * Rendered inside the Title container
     */
    title?: IChildren;

    /**
     * Defines the Subtitle container
     */
    SubtitleRenderer?: IRenderer;
    /**
     * Rendered inside the Subtitle container
     */
    subtitle?: IChildren;

    /**
     * On mobile, hides part of the header to give a desktop like look
     */
    HeaderHiderRenderer?: IRenderer;

    /**
     * Defines the Body container
     */
    BodyRenderer?: IRenderer;
    /**
     * Rendered inside the Body container
     */
    children?: IChildren;

    /**
     * Defines the Image container
     */
    ImageRenderer?: IRenderer;
    /**
     * Defines the ImageHider container. Hides part of the image.
     */
    ImageHiderRenderer?: IRenderer;

    /**
     * The url to the image
     * Not specifying it will remove the Image container
     */
    imageUrl?: string;

    /**
     * Will be rendered between the Header and Body (if Header exists)
     */
    headerSeparator?: IChildren;

    footerSeparator?: IChildren;

    FooterRenderer?: IRenderer;

    footer?: IChildren;

    /**
     * Animate the Card internal content on viewport entry
     * @default false
     */
    animate?: boolean;

    /**
     * Internal Card animation delay is based on the Card reveal animation's delay + duration divided by this factor
     * @preRequisite animate == true
     * @default 4
     */
    animationDelayFactor?: number;

    /**
     * Override the Card background
     */
    background?: string;

    /**
     * Defines another class to add along the Styled-Component one
     */
    kClassName?: string;
}

export interface IRevealProps {
    alt?: boolean;
    appear?: boolean;
    big?: boolean;
    bottom?: boolean;
    cascade?: boolean;
    collapse?: boolean;
    count?: number;
    delay?: number;
    distance?: string;
    duration?: number;
    enter?: boolean;
    exit?: boolean;
    forever?: boolean;
    fraction?: number;
    left?: boolean;
    mirror?: boolean;
    mountOnEnter?: boolean;
    opposite?: boolean;
    out?: boolean;
    right?: boolean;
    spy?: any;
    timeout?: number;
    top?: boolean;
    when?: boolean;
}

export type IAnimatedCardProps = ICardProps & IRevealProps;

export const defaultProps: {
    bodyAlignment: IBodyAlignment;
    animate: boolean;
    delay: number;
    duration: number;
    animationDelayFactor: number;
    isReveal: boolean;
} = {
    bodyAlignment: "left",
    animate: false,
    delay: 0,
    duration: 1000,
    animationDelayFactor: 4,
    isReveal: false,
};
