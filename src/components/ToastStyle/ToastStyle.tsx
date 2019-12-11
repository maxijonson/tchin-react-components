import { createGlobalStyle } from "styled-components";
import { BREAKPOINTS } from "../../../src/config";
import app from "../../app";
import { ITheme } from "../../modules";

export default createGlobalStyle`
    .toast {
        background: ${({ theme }: { theme: ITheme }) =>
            theme.colors.toastBackground};
        color: ${({ theme }: { theme: ITheme }) => theme.colors.defaultText};
        font-family: "${app.fonts.openSans.family}";
        font-size: 1.6em;
        @media (min-width: ${BREAKPOINTS.smpx}) {
            font-size: 1.3em;
        }
    }

    .toast__progress {
        background: ${({ theme }) => theme.colors.toastProgress};
    }
`;
