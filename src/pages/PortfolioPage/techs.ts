export type ITechName =
    | "HTML"
    | "CSS"
    | "SCSS"
    | "JavaScript"
    | "JQuery"
    | "Node"
    | "TypeScript"
    | "React"
    | "ASP.Net"
    | "PHP"
    | "C++"
    | "C#"
    | "Java"
    | "Electron"
    | "Oracle SQL"
    | "MySQL"
    | "SQL Server"
    | "MongoDB"
    | "SQLite"
    | "Android"
    | "Shell";

export interface ITech {
    name: ITechName;
    color: string;
    image?: string;
}

export const techs: { [name: string]: ITech } = {
    html: {
        name: "HTML",
        color: "#E34C26",
    },
    css: {
        name: "CSS",
        color: "#563D7C",
    },
    scss: {
        name: "SCSS",
        color: "#fd5c63",
    },
    javascript: {
        name: "JavaScript",
        color: "#F1E05A",
    },
    jquery: {
        name: "JQuery",
        color: "#1169AE",
    },
    node: {
        name: "Node",
        color: "#71B417",
    },
    typescript: {
        name: "TypeScript",
        color: "#2B7489",
    },
    react: {
        name: "React",
        color: "#00d8ff",
    },
    asp: {
        name: "ASP.Net",
        color: "#6A40FD",
    },
    php: {
        name: "PHP",
        color: "#4F5D95",
    },
    cpp: {
        name: "C++",
        color: "#F34B7D",
    },
    cs: {
        name: "C#",
        color: "#178600",
    },
    java: {
        name: "Java",
        color: "#B07219",
    },
    electron: {
        name: "Electron",
        color: "#77D9FB",
    },
    oracle: {
        name: "Oracle SQL",
        color: "#C22D40",
    },
    mysql: {
        name: "MySQL",
        color: "#C22D40",
    },
    sqlserver: {
        name: "SQL Server",
        color: "#C22D40",
    },
    sqlite: {
        name: "SQLite",
        color: "#C22D40",
    },
    mongodb: {
        name: "MongoDB",
        color: "#5C7611",
    },
    android: {
        name: "Android",
        color: "#89E051",
    },
    shell: {
        name: "Shell",
        color: "#00004C",
    },
};
