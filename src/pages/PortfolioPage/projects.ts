import { PATHS } from "src/config";
import { ITech, techs } from "./techs";

export interface IProject {
    title: string;
    short: string;
    description: string[];
    logo: string;
    techs: ITech[];
    github?: string;
    discord?: string;
    website?: string;
    steam?: string;
}

export const projects: IProject[] = [
    {
        title: "portfolio.projects.website.title",
        description: [
            "long.portfolio.projects.website.description.one",
            "long.portfolio.projects.website.description.two",
            "long.portfolio.projects.website.description.three",
        ],
        logo: PATHS.images.projects.website.logo,
        techs: [
            techs.node,
            techs.typescript,
            techs.html,
            techs.scss,
            techs.react,
        ],
        github: "https://github.com/maxijonson/Website-V4",
        website: "http://www.chintristan.io/",
        short: "portfolio.projects.website.short",
    },
    {
        title: "Cuisto",
        description: [
            "long.portfolio.projects.cuisto.description.one",
            "long.portfolio.projects.cuisto.description.two",
            "long.portfolio.projects.cuisto.description.three",
        ],
        logo: PATHS.images.projects.cuisto.logo,
        techs: [
            techs.node,
            techs.javascript,
            techs.html,
            techs.css,
            techs.android,
            techs.mysql,
            techs.jquery,
        ],
        github: "https://github.com/maxijonson/Cuisto-public",
        short: "portfolio.projects.cuisto.short",
    },
    {
        title: "PunchBot",
        description: ["long.portfolio.projects.punchbot.description"],
        logo: PATHS.images.projects.punchbot.logo,
        techs: [techs.node, techs.javascript],
        github: "https://github.com/maxijonson/PunchBot",
        discord:
            "https://discordapp.com/oauth2/authorize?client_id=483973436255895553&scope=bot&permissions=68608",
        short: "portfolio.projects.punchbot.short",
    },
    {
        title: "Intellibot",
        description: [
            "long.portfolio.projects.intellibot.description.one",
            "long.portfolio.projects.intellibot.description.two",
            "long.portfolio.projects.intellibot.description.three",
        ],
        logo: PATHS.images.projects.intellibot.logo,
        techs: [techs.node, techs.javascript],
        github: "https://github.com/maxijonson/Intellibot",
        discord:
            "https://discordapp.com/oauth2/authorize?client_id=356619840649428993&scope=bot&permissions=271707143",
        website: "http://www.maxijonson.com/intellibot/",
        short: "portfolio.projects.intellibot.short",
    },
    {
        title: "React",
        description: ["long.portfolio.projects.react.description"],
        logo: PATHS.images.projects.react.logo,
        techs: [techs.javascript, techs.html, techs.css],
        github: "https://github.com/maxijonson/React---Wallpaper-Engine",
        steam:
            "https://steamcommunity.com/sharedfiles/filedetails/?id=1108769435",
        short: "portfolio.projects.react.short",
    },
    {
        title: "Poly Wallpaper",
        description: ["long.portfolio.projects.poly.description"],
        logo: PATHS.images.projects.poly.logo,
        techs: [techs.javascript, techs.html, techs.css],
        github: "https://github.com/maxijonson/Poly-Wallpaper",
        steam:
            "https://steamcommunity.com/sharedfiles/filedetails/?id=1084251953",
        short: "portfolio.projects.poly.short",
    },
];
