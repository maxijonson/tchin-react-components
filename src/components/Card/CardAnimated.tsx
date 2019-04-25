import * as React from "react";
import { CardCatched as Card } from "./Card";
import { IAnimatedCardProps } from "./model";

import * as Reveal from "react-reveal";
// @ts-ignore:noImplicitAny
import RevealFlash from "react-reveal/Flash";
// @ts-ignore:noImplicitAny
import RevealHeadShake from "react-reveal/HeadShake";
// @ts-ignore:noImplicitAny
import RevealJello from "react-reveal/Jello";
// @ts-ignore:noImplicitAny
import RevealJump from "react-reveal/Jump";
// @ts-ignore:noImplicitAny
import RevealPulse from "react-reveal/Pulse";
// @ts-ignore:noImplicitAny
import RevealRubberBand from "react-reveal/RubberBand";
// @ts-ignore:noImplicitAny
import RevealShake from "react-reveal/Shake";
// @ts-ignore:noImplicitAny
import RevealSpin from "react-reveal/Spin";
// @ts-ignore:noImplicitAny
import RevealSwing from "react-reveal/Swing";
// @ts-ignore:noImplicitAny
import RevealTada from "react-reveal/Tada";
// @ts-ignore:noImplicitAny
import RevealWobble from "react-reveal/Wobble";

export const Fade = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Fade {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Fade>
    );
};

export const Flip = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Flip {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Flip>
    );
};

export const Rotate = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Rotate {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Rotate>
    );
};

export const Zoom = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Zoom {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Zoom>
    );
};

export const Bounce = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Bounce {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Bounce>
    );
};

export const Slide = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Slide {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Slide>
    );
};

export const Roll = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Roll {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Roll>
    );
};

export const LightSpeed = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.LightSpeed {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.LightSpeed>
    );
};

export const Jump = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealJump {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealJump>
    );
};

export const Flash = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealFlash {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealFlash>
    );
};

export const HeadShake = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealHeadShake {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealHeadShake>
    );
};

export const Jello = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealJello {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealJello>
    );
};

export const Pulse = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealPulse {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealPulse>
    );
};

export const RubberBand = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealRubberBand {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealRubberBand>
    );
};

export const Shake = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealShake {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealShake>
    );
};

export const Spin = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealSpin {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealSpin>
    );
};

export const Swing = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealSwing {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealSwing>
    );
};

export const Tada = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealTada {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealTada>
    );
};

export const Wobble = (props: IAnimatedCardProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealWobble {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealWobble>
    );
};
