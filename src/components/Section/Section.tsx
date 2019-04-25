import * as _ from "lodash";
import * as React from "react";
import { useSwipeable } from "react-swipeable";
import { Tooltip } from "src/components";
import { BREAKPOINTS, THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import { fonts, ITheme } from "src/modules/CSS";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const { useConnect, useCurrentBreakpoint } = Hooks;
const SLIDE_TIME = 1000;

type ITitlePosition = "top" | "right" | "left";
type IDirection = "next" | "prev";

interface ISectionItem {
    title?: React.ReactNode;
    content?: React.ReactNode;
    titlePosition?: ITitlePosition;
}

interface ISectionProps {
    items: ISectionItem[];
    startIndex?: number;
    kClassName?: string;
}

const Wrapper = styled.div<{ theme: ITheme }>`
    transition: all ${THEME_TRANSITION_TIME}s;
    user-select: none;
    position: relative;
    width: 100%;
    padding: 2% 0;
    background: ${({ theme }) => theme.colors.sectionBackground};
    color: ${({ theme }) => theme.colors.defaultText};
    font-size: 2rem;
    margin: 5% 0;
    overflow: hidden;
    &:focus {
        outline: none;
    }
`;

const Caroussel = styled.div<{
    sliding: boolean;
    direction: IDirection;
    position: number;
    lastPosition: number;
}>`
    display: flex;
    transition: ${({ sliding }) =>
        sliding ? "none" : `transform ${SLIDE_TIME}ms ease`};
    transform: ${({ sliding, direction, position, lastPosition }) => {
        if (!sliding) {
            return `translateX(-${position * 100}%)`;
        }
        if (direction == "prev") {
            return `translateX(-${lastPosition * 100}%)`;
        }
        return `translateX(-${lastPosition * 100}%)`;
    }};
    padding-bottom: 2.5%;
`;

const Item = styled.div<{
    titlePosition: ITitlePosition;
    kTitle: React.ReactNode;
}>`
    flex: 1 0 100%;
    flex-basis: 100%;
    padding: ${({ titlePosition, kTitle }) => {
        if (!kTitle) {
            return "0 12.5%";
        }
        switch (titlePosition) {
            case "top":
                return "0 12.5% 0 12.5%";
            case "right":
                return "0 3% 0 12.5%";
            case "left":
                return "0 12.5% 0 3%";
        }
    }};
    display: grid;
    width: 100%;
    grid-template: ${({ titlePosition, kTitle }) => {
        if (!kTitle) {
            return "[content] auto / [content] 100%";
        }
        switch (titlePosition) {
            case "top":
                return "[title] auto [content] 2fr / [title content] auto";
            case "right":
                return "[title content] auto / [content] 1fr [title] 10%";
            case "left":
                return "[title content] auto / [title] 10% [content] 1fr";
        }
    }};
    gap: 2.5rem;
`;

const TitleOuter = styled.div<{ titlePosition: ITitlePosition }>`
    display: ${({ titlePosition }) => titlePosition != "top" && "table"};
    grid-area: title;
    margin: ${({ titlePosition }) => titlePosition != "top" && "auto 0"};
`;

const TitleInner = styled.div<{ titlePosition: ITitlePosition }>`
    padding: ${({ titlePosition }) => titlePosition != "top" && "50% 0"};
    height: ${({ titlePosition }) => titlePosition != "top" && 0};
`;

const Title = styled.div<ISectionItem>`
    font-size: 5.5rem;
    text-align: center;
    text-transform: uppercase;
    transform-origin: ${({ titlePosition }) =>
        titlePosition != "top" && "top left"};
    transform: ${({ titlePosition }) =>
        titlePosition != "top" &&
        (titlePosition == "left"
            ? "rotate(-90deg) translate(-100%)"
            : "rotate(90deg) translate(0, -100%)")};
    margin-top: ${({ titlePosition }) => titlePosition != "top" && "-50%"};
    white-space: ${({ titlePosition }) => titlePosition != "top" && "nowrap"};
`;

const Content = styled.div`
    grid-area: content;
    text-align: justify;
    margin: auto 0;
    font-family: "${fonts.openSans.family}";
`;

const Indicator = styled.div<{ active: boolean; theme: ITheme }>`
    width: 2rem;
    height: 2rem;
    margin: 0 2rem;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    background-color: ${({ active, theme }) =>
        active
            ? theme.colors.defaultText
            : tinycolor(theme.colors.defaultText)
                  .setAlpha(0.5)
                  .toRgbString()};

    @media (min-width: ${BREAKPOINTS.mdpx}) {
        width: 0.75rem;
        height: 0.75rem;
        margin: 0 0.75rem;
    }
`;

export default (props: ISectionProps) => {
    const { items, startIndex, kClassName = "" } = props;
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => next(),
        onSwipedRight: () => prev(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });
    const screenBreakpoint = useCurrentBreakpoint("screen");

    // State
    const [position, setPosition] = React.useState(startIndex || 0);
    const [lastPosition, setLastPosition] = React.useState(startIndex || 0);
    const [sliding, setSliding] = React.useState(false);
    const [direction, setDirection] = React.useState<IDirection>("next");

    const nextThrottled = React.useRef(
        _.throttle((pos: number) => {
            setDirection("next");
            setLastPosition(pos);
            setPosition(pos == items.length - 1 ? 0 : pos + 1);
            setSliding(true);
        }, SLIDE_TIME),
    );
    const prevThrottled = React.useRef(
        _.throttle((pos: number) => {
            setDirection("prev");
            setLastPosition(pos);
            setPosition(pos == 0 ? items.length - 1 : pos - 1);
            setSliding(true);
        }, SLIDE_TIME),
    );

    const next = () => {
        nextThrottled.current(position);
    };
    const prev = () => {
        prevThrottled.current(position);
    };
    const navigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const destination = Number(e.currentTarget.dataset.index);
        if (destination == position) {
            return;
        }
        setDirection(destination > position ? "next" : "prev");
        setLastPosition(position);
        setPosition(destination);
        setSliding(true);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case "ArrowLeft":
                prev();
                break;
            case "ArrowRight":
                next();
                break;
        }
    };
    const focus = (e: React.MouseEvent<HTMLDivElement>) =>
        e.currentTarget.focus();

    React.useEffect(() => {
        setSliding(false);
    }, [sliding]);

    return (
        <Wrapper
            className={`section ${kClassName}`}
            theme={theme}
            {...swipeHandlers}
            tabIndex={(screenBreakpoint > BREAKPOINTS.sm && "0") || null}
            onKeyDown={handleKeyDown}
            onClick={(screenBreakpoint > BREAKPOINTS.sm && focus) || null}
        >
            <Caroussel
                className="section__caroussel"
                sliding={sliding}
                direction={direction}
                position={position}
                lastPosition={lastPosition}
            >
                {_.map(items, ({ titlePosition, title, content }, index) => (
                    <Item
                        titlePosition={titlePosition || "left"}
                        kTitle={title}
                        key={index}
                        className="section__item"
                    >
                        {title && (
                            <TitleOuter
                                className="section__title-outer"
                                titlePosition={titlePosition || "left"}
                            >
                                <TitleInner
                                    className="section__title-inner"
                                    titlePosition={titlePosition || "left"}
                                >
                                    <Title
                                        className="section__title"
                                        children={title}
                                        titlePosition={titlePosition || "left"}
                                    />
                                </TitleInner>
                            </TitleOuter>
                        )}
                        <Content children={content} />
                    </Item>
                ))}
            </Caroussel>
            <div
                className="section__indicators"
                style={{
                    textAlign: "center",
                    position: "absolute",
                    bottom: "0.25rem",
                    width: "100%",
                }}
            >
                {items.length > 1 &&
                    _.times(items.length, (i) => (
                        <Tooltip tip={items[i].title || ""} key={i}>
                            <Indicator
                                className="section__indicator"
                                data-index={i}
                                theme={theme}
                                active={i == position}
                                onClick={navigate}
                            />
                        </Tooltip>
                    ))}
            </div>
        </Wrapper>
    );
};
