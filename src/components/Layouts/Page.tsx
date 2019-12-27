import React from "react";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import app from "../../App/app";

interface IPageProps {
    children: React.ReactNode;
}

const PageContainer = styled.main`
    width: 100%;
    position: relative;
    order: 0;
    flex-grow: 1;
`;

export default ({ children }: IPageProps) => (
    <PageContainer>
        <Menu />
        {children}
        <Footer projectVersion={app.version} />
    </PageContainer>
);
