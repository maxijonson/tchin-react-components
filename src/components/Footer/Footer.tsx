import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import styled from "styled-components";
import { version } from "../../../package.json";
import { fonts } from "../../modules/CSS";

const { useConnect } = Hooks;

interface IFooterProps {
    kClassName?: string;
}

const Footer = styled.footer`
    color: ${({ theme }) => theme.colors.defaultText};
    font-size: 1.4rem;
    text-align: center;
    padding-bottom: 1%;
    transition: all ${THEME_TRANSITION_TIME}s;
    background-color: ${({ theme }) => theme.colors.pageBackground};
    font-family: ${fonts.oswald.family};
    width: 100%;
`;

export default ({ kClassName = "" }: IFooterProps) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const { t } = useTranslation();

    return (
        <Footer theme={theme} className={`footer ${kClassName}`}>
            Copyright <FontAwesomeIcon icon={["far", "copyright"]} />{" "}
            {new Date().getFullYear()} Tristan Chin. {t("footer.copyright")}
            <br />v{version}
        </Footer>
    );
};
