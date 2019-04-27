export type IFontVariants = "400" | "400i" | "700" | "700i";
export type IFontSubsets = "latin" | "latin-ext";
export type IFontName =
    | "oswald"
    | "roboto"
    | "bitter"
    | "openSans"
    | "exo"
    | "Kaushan";

export interface IFont {
    family: string;
    variants?: IFontVariants;
    subsets?: IFontSubsets;
}

export type IFonts = { [name in IFontName]: IFont };

export const fonts: IFonts = {
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
};
