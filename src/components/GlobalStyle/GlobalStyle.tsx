import { BREAKPOINTS } from "src/config";
import { fonts, ITheme } from "src/modules/CSS";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle<{ theme: ITheme }>`
    .toast {
        background: ${({ theme }) => theme.colors.toastBackground};
        color: ${({ theme }) => theme.colors.defaultText};
        font-family: "${fonts.openSans.family}";
        font-size: 3rem;
        @media (min-width: ${BREAKPOINTS.smpx}) {
            font-size: 1.3rem;
        }
    }

    .toast__progress {
        background: ${({ theme }) => theme.colors.toastProgress};
    }
`;
