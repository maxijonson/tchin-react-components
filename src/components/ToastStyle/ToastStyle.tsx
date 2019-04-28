import { createGlobalStyle } from "styled-components";
import { BREAKPOINTS } from "../../../src/config";
import { ITheme } from "../../../src/modules/themes";
import app from "../../app";

export default createGlobalStyle<{ theme: ITheme }>`
    .toast {
        background: ${({ theme }) => theme.colors.toastBackground};
        color: ${({ theme }) => theme.colors.defaultText};
        font-family: "${app.fonts.openSans.family}";
        font-size: 3rem;
        @media (min-width: ${BREAKPOINTS.smpx}) {
            font-size: 1.3rem;
        }
    }

    .toast__progress {
        background: ${({ theme }) => theme.colors.toastProgress};
    }
`;
