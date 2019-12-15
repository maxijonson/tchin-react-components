/* eslint-disable no-nested-ternary */
// TODO: Move out of TRC, too complex
import React from "react";
import * as Reveal from "react-reveal";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import Modal from "../Modal/Modal";
import { THEME_TRANSITION_TIME, BREAKPOINTS } from "../../config";
import { Hooks } from "../../modules";
import { withCatcher } from "../Catcher/Catcher";
import {
    defaultProps,
    IBodyAlignment,
    ICardInternalProps,
    ICardProps,
} from "./model";
import app from "../../app";

const { useConnect } = Hooks;

type IThemeProps = ICardInternalProps & ICardProps;

// CARD TITLE

const DTitle = styled.h1<IThemeProps>`
    font-size: 4rem;
    font-family: ${app.fonts.roboto.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        padding-left: ${({ bodyAlignment }) =>
            bodyAlignment == "right" && "50%"};
        padding-right: ${({ bodyAlignment }) =>
            bodyAlignment == "left" && "50%"};
        z-index: 2;
        text-align: ${({ bodyAlignment }) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD SUBTITLE

const DSubtitle = styled.h2<IThemeProps>`
    font-size: 2.25rem;
    color: ${({ theme }) => theme.colors.cardSubtitle};
    font-family: ${app.fonts.openSans.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        padding-left: ${({ bodyAlignment }) =>
            bodyAlignment == "right" && "25%"};
        padding-right: ${({ bodyAlignment }) =>
            bodyAlignment == "left" && "25%"};
        z-index: 2;
        text-align: ${({ bodyAlignment }) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD HEADER HIDER

const DHeaderHider = styled.div<IThemeProps>`
    ${({ imageUrl, background, theme, bodyAlignment }) =>
        imageUrl &&
        `@media (max-width: ${BREAKPOINTS.smpx}) {
        background: ${background || theme.colors.card};
        transition: all ${THEME_TRANSITION_TIME}s;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        top: 0;
        left: 0;
        box-shadow: 0 0 1.5rem ${theme.colors.cardShadow};
        transform: ${
            bodyAlignment == "left"
                ? "skew(70deg) translateX(-35%) scale(1.2)"
                : "skew(-70deg) translateX(35%) scale(1.2)"
        };
    }`}
`;

// CARD HEADER

const DHeader = styled.div`
    @media (max-width: ${BREAKPOINTS.smpx}) {
        background: url(${({ theme: { imageUrl } }) => imageUrl}) center center /
            cover no-repeat;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0.5% 3%;
        position: relative;
    }
`;

// CARD BODY

const DBody = styled.div`
    font-family: "${app.fonts.openSans.family}";
    @media (max-width: ${BREAKPOINTS.smpx}) {
        padding: 2% 3%;
    }
`;

// CARD CONTENT

const DContent = styled.div`
    grid-area: body;
    padding: 2% 3%;

    @media (max-width: ${BREAKPOINTS.smpx}) {
        grid-area: body;
        padding: 0;
    }
`;

// CARD IMAGE HIDER

const DImageHider = styled.div<IThemeProps>`
    background: ${({ theme, background }) => background || theme.colors.card};
    transform: ${({ bodyAlignment, hasRevealed }) =>
        hasRevealed &&
        (bodyAlignment == "left"
            ? "skew(10deg) translateX(-70%) scale(1.1)"
            : "skew(-10deg) translateX(70%) scale(1.1)")};
    transition: all ${THEME_TRANSITION_TIME}s, transform 1s;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1.5rem ${({ theme }) => theme.colors.cardShadow};
`;

// CARD IMAGE

const DImage = styled.div<IThemeProps>`
    @media (min-width: ${BREAKPOINTS.smpx}) {
    grid-area: image;
    background-size: cover;
    position: relative;
    transition: all 1s;
    transition-delay: 0.25s;
    overflow: hidden;
    background:
        url("${({ imageUrl }) => imageUrl}")
        center center / cover no-repeat;
    }
`;

// Footer

const DFooter = styled.div`
    font-family: "${app.fonts.roboto.family}";
    font-size: 1.6rem;
    color: ${({ theme }) => {
        const color = tinycolor(theme.colors.defaultText).clone();
        return (theme.name == "light"
            ? color.lighten(25)
            : color.darken(25)
        ).toRgbString();
    }};
`;

// Card container
const Card = styled.div<IThemeProps>`
    background: ${({ theme, background }) => background || theme.colors.card};
    width: 75%;
    display: grid;
    margin: 5% auto;
    box-shadow: 0 0.25rem 0.5rem ${({ theme }) => theme.colors.cardShadow};
    border-radius: 0.25em;
    color: ${({ theme }) => theme.colors.defaultText};
    transition: all ${THEME_TRANSITION_TIME}s;
    text-align: justify;
    overflow: hidden;
    font-size: 2.3rem;
    grid-template-columns: [body] 100%;

    @media (min-width: ${BREAKPOINTS.smpx}) {
        font-size: 1.8rem;
        grid-gap: 0 1rem;
        grid-template-columns: ${({ bodyAlignment, imageUrl }) => {
            if (!imageUrl) {
                return "[body] 100%";
            }
            switch (bodyAlignment) {
                default:
                case "left":
                    return "[body] 75% [image] 25%";
                case "right":
                    return "[image] 25% [body] 75%";
            }
        }};
    }
`;

// Component that animates internally (if animate is true)
// After the animation is done, this becomes a React.Fragment to prevent any more animations
interface IAnimateContext {
    animate: boolean;
    fallbackHasRevealed: boolean;
    bodyAlignment: IBodyAlignment;
    baseDelay: number;
    hasRevealed: boolean;
}
const AnimateContext = React.createContext<IAnimateContext>({
    animate: false,
    fallbackHasRevealed: false,
    bodyAlignment: "left",
    baseDelay: 1000,
    hasRevealed: false,
});
const AnimateSide = ({
    children,
    delay = 0,
    cascade = false,
    onReveal,
}: {
    children: JSX.Element;
    delay?: number;
    cascade?: boolean;
    onReveal?: () => void;
}) => {
    const {
        animate,
        fallbackHasRevealed,
        bodyAlignment,
        baseDelay,
        hasRevealed,
    } = React.useContext(AnimateContext);

    return animate && !fallbackHasRevealed ? (
        <Reveal.Fade
            left={bodyAlignment == "left"}
            right={bodyAlignment == "right"}
            delay={baseDelay + delay}
            children={children}
            factor={0}
            cascade={cascade}
            appear={hasRevealed}
            onReveal={onReveal}
        />
    ) : (
        <div children={children} />
    );
};

const CardComponent = (props: ICardProps & ICardInternalProps) => {
    const {
        ContentRenderer,
        HeaderRenderer,
        title,
        TitleRenderer,
        subtitle,
        SubtitleRenderer,
        HeaderHiderRenderer,
        BodyRenderer,
        children,
        ImageRenderer,
        ImageHiderRenderer,
        imageUrl,
        headerSeparator,
        bodyAlignment = defaultProps.bodyAlignment,
        animate = defaultProps.animate,
        delay = defaultProps.delay, // Animation delay provided by same props we give to React-Reveal
        duration = defaultProps.duration, // by React-Reveal
        hasRevealed: hasRevealedProp,
        animationDelayFactor = defaultProps.duration,
        isReveal = defaultProps.isReveal,
        kClassName = "",
        footerSeparator,
        FooterRenderer,
        footer,
    } = props;

    // Extra state to control the revealing ourselves for things that aren't in react-reveal's scope
    // e.g: changing language or theme would be considered like a change and re-fire the animations, we don't want that!
    const [fallbackHasRevealed, setFallbackHasRevealed] = React.useState(false);
    const [isBeingRevealed, setIsBeingRevealed] = React.useState(false);

    const hasRevealed = isReveal
        ? animate
            ? hasRevealedProp || false
            : true
        : animate
        ? isBeingRevealed
        : true;

    const baseDelay = Math.round((delay + duration) / animationDelayFactor);

    let revealTimeout: number;
    const onRevealTrigger = (timeout = 2000) => {
        if (isReveal ? hasRevealed : true) {
            setIsBeingRevealed(true);
            revealTimeout = window.setTimeout(
                () => setFallbackHasRevealed(true),
                timeout
            );
        }
    };
    React.useEffect(() => () => window.clearTimeout(revealTimeout));

    // Content
    const Content = ContentRenderer || DContent;

    // Header
    const renderHeader = !!title || !!subtitle;
    const Header = HeaderRenderer || (renderHeader && DHeader) || (() => null);
    const Title = TitleRenderer || DTitle;
    const Subtitle = SubtitleRenderer || DSubtitle;
    const HeaderHider = HeaderHiderRenderer || DHeaderHider;

    // Body
    const Body = BodyRenderer || DBody;

    // Footer
    const Footer = FooterRenderer || DFooter;

    // Image
    const Image = ImageRenderer || (imageUrl && DImage) || (() => null);
    const ImageHider = ImageHiderRenderer || DImageHider;

    return (
        <AnimateContext.Provider
            value={{
                animate,
                bodyAlignment,
                hasRevealed,
                fallbackHasRevealed,
                baseDelay,
            }}
        >
            <Card className={`card ${kClassName}`}>
                {bodyAlignment == "right" && (
                    <Image className="card-image card-bodyAlignment-right">
                        <ImageHider className="card-image-hider  card-bodyAlignment-right" />
                    </Image>
                )}
                <Content className="card-content">
                    {renderHeader && (
                        <Header className="card-header">
                            <AnimateSide
                                cascade
                                onReveal={
                                    !children
                                        ? () => onRevealTrigger(1750)
                                        : () => null
                                }
                            >
                                <div>
                                    {title && (
                                        <Title
                                            children={title}
                                            className="card-title"
                                        />
                                    )}
                                    {subtitle && (
                                        <Subtitle
                                            children={subtitle}
                                            className="card-subtitle"
                                        />
                                    )}
                                </div>
                            </AnimateSide>
                            <HeaderHider className="card-header-hider" />
                        </Header>
                    )}
                    {renderHeader &&
                        children &&
                        (headerSeparator || (
                            <AnimateSide
                                delay={250}
                                children={<hr className="card-hr header" />}
                            />
                        ))}

                    {children && (
                        <AnimateSide
                            delay={500}
                            onReveal={onRevealTrigger}
                            children={
                                <Body
                                    children={children}
                                    className="card-body"
                                />
                            }
                        />
                    )}

                    {children &&
                        footer &&
                        (footerSeparator || (
                            <AnimateSide
                                delay={750}
                                children={<hr className="card-hr footer" />}
                            />
                        ))}

                    {footer && (
                        <AnimateSide
                            delay={1000}
                            children={<Footer children={footer} />}
                        />
                    )}
                </Content>
                {bodyAlignment == "left" && (
                    <Image className="card-image card-bodyAlignment-left">
                        <ImageHider className="card-image-hider card-bodyAlignment-left" />
                    </Image>
                )}
            </Card>
        </AnimateContext.Provider>
    );
};

const CardCatcher = ({ errorReport }: { errorReport: IErrorReport }) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));

    const [modalVisible, setModalVisible] = React.useState(false);

    // const handleClick = () => {
    //     setModalVisible(true);
    // };

    const onModalRequestClose = () => setModalVisible(false);

    return (
        <>
            <Base
                background={theme.colors.defaultErrorBg}
                title={
                    <span
                        style={{ color: theme.colors.defaultErrorText }}
                        children="UH OH"
                    />
                }
                subtitle={
                    <span
                        style={{ color: theme.colors.altErrorText }}
                        children="Something went wrong..."
                    />
                }
                headerSeparator={<span />}
                imageUrl="assets/images/warn.png"
            >
                <div
                    style={{
                        color: theme.colors.defaultErrorText,
                        textAlign: "center",
                    }}
                >
                    <p>
                        An unexpected error happened and this message was
                        rendered as fallback to prevent the rest from crashing!
                    </p>
                </div>
            </Base>
            <Modal visible={modalVisible} onRequestClose={onModalRequestClose}>
                <Base
                    kClassName="ErrorModal--Modal--Card"
                    title="Error Report"
                    subtitle={errorReport.error.name}
                >
                    <pre>{errorReport.error.stack}</pre>
                </Base>
            </Modal>
        </>
    );
};

export const CardCatched = withCatcher(CardComponent, {
    Fallback: CardCatcher,
});

/**
 * Flexible Card component with default containers, or you can define your own.
 * Primary: body is aligned to the left (use Alt to align to the right)
 * @structure
 * ```tsx
    <>
        <Content>
            <Header>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
                <HeaderHider />
            </Header>
            <Body>{body}</Body>
        </Content>
        <Image>
            <ImageHider />
        </Image>
    </>
 * ```
 */
export const Base = (props: ICardProps) => (
    <CardCatched {...props} bodyAlignment="left" />
);
export default Base;

/**
 * Shows text to the right (when there's an image)
 */
export const Alt = (props: ICardProps) => (
    <CardCatched {...props} bodyAlignment="right" />
);
