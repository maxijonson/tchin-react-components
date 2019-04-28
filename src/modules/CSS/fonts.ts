export type IFontVariants = "400" | "400i" | "700" | "700i";
export type IFontSubsets = "latin" | "latin-ext";

export interface IFont {
    family: string;
    variants?: IFontVariants;
    subsets?: IFontSubsets;
}

export interface IFonts {
    [name: string]: IFont;
}

export const defaultFonts: IFonts = {
    oswald: {
        family: "Oswald",
    },
    roboto: {
        family: "Roboto",
    },
    bitter: {
        family: "Bitter",
    },
    openSans: {
        family: "Open Sans",
    },
    exo: {
        family: "Exo 2",
    },
    Kaushan: {
        family: "Kaushan Script",
    },
    test: {
        family: "asdf",
    },
};
