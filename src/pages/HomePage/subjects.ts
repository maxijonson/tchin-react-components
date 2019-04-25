import { ITechName } from "../PortfolioPage/techs";

export type ICategory = "application" | "web" | "database" | "os" | "mobile";
export type ILevel = "advanced" | "intermediate" | "basic";

export const categories: ICategory[] = [
    "web",
    "application",
    "database",
    "mobile",
    "os",
];
export const levels: ILevel[] = ["advanced", "intermediate", "basic"];

export interface ISubject {
    category: ICategory;
    level: ILevel;
    name: ITechName;
    selfTaught?: boolean;
}

export const subjects: ISubject[] = [
    {
        category: "application",
        level: "intermediate",
        name: "C++",
    },
    {
        category: "application",
        level: "intermediate",
        name: "C#",
    },
    {
        category: "application",
        level: "intermediate",
        name: "Java",
    },
    {
        category: "web",
        level: "basic",
        name: "ASP.Net",
    },
    {
        category: "web",
        level: "advanced",
        name: "HTML",
    },
    {
        category: "web",
        level: "advanced",
        name: "CSS",
    },
    {
        category: "web",
        level: "basic",
        name: "PHP",
    },
    {
        category: "database",
        level: "intermediate",
        name: "Oracle SQL",
    },
    {
        category: "database",
        level: "intermediate",
        name: "MySQL",
    },
    {
        category: "database",
        level: "basic",
        name: "SQL Server",
    },
    {
        category: "os",
        level: "intermediate",
        name: "Shell",
    },
    {
        category: "mobile",
        level: "basic",
        name: "Android",
    },
    {
        category: "web",
        level: "advanced",
        name: "JavaScript",
        selfTaught: true,
    },
    {
        category: "web",
        level: "intermediate",
        name: "TypeScript",
    },
    {
        category: "web",
        level: "advanced",
        name: "JQuery",
        selfTaught: true,
    },
    {
        category: "web",
        level: "intermediate",
        name: "React",
        selfTaught: true,
    },
    {
        category: "web",
        level: "advanced",
        name: "Node",
        selfTaught: true,
    },
    {
        category: "database",
        level: "basic",
        name: "MongoDB",
        selfTaught: true,
    },
    {
        category: "application",
        level: "basic",
        name: "Electron",
        selfTaught: true,
    },
    {
        category: "database",
        level: "basic",
        name: "SQLite",
    },
    {
        category: "web",
        level: "basic",
        name: "SCSS",
        selfTaught: true,
    },
];
