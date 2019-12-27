import { createGlobalStyle } from "styled-components";
import { BREAKPOINTS } from "../../../src/config";
import { CSS } from "../../modules";

const { fonts } = CSS;

export default createGlobalStyle`
    .toast {
        background: ${({ theme }) => theme.colors.toastBackground};
        color: ${({ theme }) => theme.colors.defaultText};
        font-family: "${fonts.openSans.family}";
        font-size: 1.6em;
        @media (min-width: ${BREAKPOINTS.smpx}) {
            font-size: 1.3em;
        }
    }

    .toast__progress {
        background: ${({ theme }) => theme.colors.toastProgress};
    }
`;
