interface ILoadingBaseProps {
    /** between 0 and 100 */
    progress?: number;
}

export interface ISpinnerProps extends ILoadingBaseProps {
    type: "spinner";
    /** In px. Defaults to 100 */
    size?: number;
}

export interface IBarProps extends ILoadingBaseProps {
    type: "bar";
}

export type ILoadingProps = ISpinnerProps | IBarProps;
