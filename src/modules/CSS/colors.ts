import { IShade } from "./shades";

export type IColor =
    | "black"
    | "blue"
    | "navy"
    | "orange"
    | "cream"
    | "white"
    | "red"
    | "onyx";

export type IColors = { [name in IColor]: string };

export type IPalette = { [name in IShade]: IColors };

export const colors: IPalette = {
    pitchDark: {
        black: "#030303",
        blue: "#04080A",
        cream: "#0A0A0A",
        navy: "#050607",
        onyx: "#030303",
        orange: "#0B0602",
        red: "#090203",
        white: "#161616",
    },
    pitchLight: {
        black: "#F8F8F7",
        blue: "#F8FCFD",
        cream: "#FDFDFD",
        navy: "#F9FAFB",
        onyx: "#F8F8F8",
        orange: "#FFFBF7",
        red: "#FCF7F8",
        white: "#FFFFFF",
    },
    dark: {
        black: "#11100D",
        blue: "#397EA1",
        cream: "#A5A6A2",
        navy: "#4B5C71",
        onyx: "#25272A",
        orange: "#BA651C",
        red: "#8D1E22",
        white: "#D3D3D3",
    },
    light: {
        black: "#171611",
        blue: "#7EC3E5",
        cream: "#E9EBE7",
        navy: "#90A1B6",
        onyx: "#696C6F",
        orange: "#FFA961",
        red: "#D16367",
        white: "#EEEEEE",
    },
    normal: {
        black: "#14130F",
        blue: "#4EADDC",
        cream: "#E2E4DE",
        navy: "#677E9B",
        onyx: "#323539",
        orange: "#FF8A26",
        red: "#C1292E",
        white: "#E8E8E8",
    },
    ultraDark: {
        black: "#0B0A09",
        blue: "#0F2028",
        cream: "#2A2A29",
        navy: "#13171D",
        onyx: "#0A0A0B",
        orange: "#2F1A07",
        red: "#240809",
        white: "#555555",
    },
    ultraLight: {
        black: "#353227",
        blue: "#DEF0F8",
        cream: "#F9FAF9",
        navy: "#E3E7EC",
        onyx: "#D9DADB",
        orange: "#FFE9D7",
        red: "#F3D8D9",
        white: "#F8F8F8",
    },
    veryDark: {
        black: "#0E0D0B",
        blue: "#244F64",
        cream: "#676865",
        navy: "#2F3A47",
        onyx: "#17191A",
        orange: "#743F12",
        red: "#581315",
        white: "#949494",
    },
    veryLight: {
        black: "#26241C",
        blue: "#AED9EF",
        cream: "#F1F2F0",
        navy: "#B9C4D1",
        onyx: "#A1A3A5",
        orange: "#FFC99C",
        red: "#E29DA0",
        white: "#F4F4F4",
    },
};
