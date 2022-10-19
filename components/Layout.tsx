import React from "react";
import styled from "styled-components";

const LayoutInnerContainer = styled.div`
  max-width: 800px;
  width: 800px;
`;

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const Layout: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <LayoutContainer>
      <LayoutInnerContainer>{children}</LayoutInnerContainer>
    </LayoutContainer>
  );
};
