import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { THEME_TRANSITION_TIME } from "../../../src/config";
import { Hooks } from "../../../src/modules";
import { version } from "../../../package.json";
import { defaultFonts } from "../../modules/CSS";

const { useConnect } = Hooks;

interface IFooterProps {
    kClassName?: string;
    projectVersion?: string;
}

const Footer = styled.footer`
    color: ${({ theme }) => theme.colors.defaultText};
    font-size: 1.4rem;
    text-align: center;
    padding-bottom: 1%;
    transition: all ${THEME_TRANSITION_TIME}s;
    background-color: ${({ theme }) => theme.colors.pageBackground};
    font-family: ${defaultFonts.oswald.family};
    width: 100%;
`;

export default ({ kClassName = "", projectVersion }: IFooterProps) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const { t } = useTranslation();

    return (
        <Footer theme={theme} className={`footer ${kClassName}`}>
            Copyright <FontAwesomeIcon icon={faCopyright} />{" "}
            {new Date().getFullYear()} Tristan Chin. {t("footer.copyright")}
            <br />
            {projectVersion && `v${projectVersion}`} (
            <a href="https://www.npmjs.com/package/tchin-react-components">
                TRC
            </a>{" "}
            v{version})
        </Footer>
    );
};
