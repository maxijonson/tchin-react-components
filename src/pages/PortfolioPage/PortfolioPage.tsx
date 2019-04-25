import * as _ from "lodash";
import * as React from "react";
import { Project, ViewportContainer } from "src/components";
import { BREAKPOINTS, PATHS } from "src/config";
import styled from "styled-components";
import PortfolioLanding from "./PortfolioLanding";
import { projects } from "./projects";

const Projects = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    margin: 0 auto;
    width: 70%;

    @media (min-width: ${BREAKPOINTS.lgpx}) {
        grid-template-columns: 1fr 1fr;
    }
`;

export default () => (
    <>
        <ViewportContainer
            backgroundOverlay
            background={PATHS.images.portfolioBg}
            kClassName="portfolio-viewport-container"
        >
            <PortfolioLanding />
        </ViewportContainer>
        <ViewportContainer>
            <Projects className="projects">
                {_.map(projects, (project) => (
                    <Project key={project.title} {...project} />
                ))}
            </Projects>
        </ViewportContainer>
    </>
);
