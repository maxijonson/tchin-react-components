import React from "react";
import styled from "styled-components";

// copied from https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/domElements.js
const domElements = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",

    // SVG
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan",
];

type ToSFC<T> = T extends React.DetailedHTMLProps<infer U, any>
    ? React.SFC<U>
    : never;

type UseStyled = {
    [x in keyof JSX.IntrinsicElements]: (
        css: string
    ) => ToSFC<JSX.IntrinsicElements[x]>
};

export const useStyled: UseStyled = domElements.reduce(
    // @ts-ignore
    (ret: any, tag: keyof JSX.IntrinsicElements) => {
        ret[tag] = (css: string) => {
            // @ts-ignore
            const Inner = React.useRef(styled[tag]`
                ${(props: any) => props.css || ""}
            `).current;
            return React.useCallback(
                React.forwardRef((props: any, ref: any) => (
                    <Inner ref={ref} {...props} css={css} />
                )),
                [css]
            );
        };

        return ret;
    },
    {} as UseStyled
);

export const useStyledCustom = (Component: React.ComponentType<any>) => {
    const ret = (css: string) => {
        const Inner = React.useRef(styled(Component)`
            ${(props: any) => props.css || ""}
        `).current;

        return React.useCallback(
            React.forwardRef((props: any, ref: any) => (
                <Inner ref={ref} {...props} css={css} />
            )),
            [css]
        );
    };
    return ret;
};
