export interface IRoute {
    name: string;
    key: string;
    component: () => JSX.Element | null;
    hidden?: boolean;
    path: string;
    exact?: boolean;
    Icon: () => JSX.Element;
}

export interface ISocial {
    url: string;
    Icon: () => JSX.Element;
    name: string;
}
