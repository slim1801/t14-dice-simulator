import styled, { css } from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AccordionProps {
  label?: string;
  isExpanded?: boolean;
  onClick?: () => void;
}

const AccordionContainer = styled.div`
  cursor: pointer;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
`;

const AccordionLabel = styled.div`
  flex: 1;
  padding-left: 10px;
`;

interface IconContainerProps {
  isExpanded?: boolean;
}

const IconContainer = styled(Image)<IconContainerProps>`
  ${(props) =>
    props.isExpanded &&
    css`
      transform: rotate(180deg);
    `}
`;

const Accordion: React.FunctionComponent<
  React.PropsWithChildren<AccordionProps>
> = ({ children, isExpanded, label, onClick }) => {
  const [localIsExpanded, setLocalIsExpanded] = useState(isExpanded);

  useEffect(() => {
    setLocalIsExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <>
      <AccordionContainer
        onClick={() => {
          setLocalIsExpanded(!localIsExpanded);
          onClick?.();
        }}
      >
        <IconContainer
          isExpanded={localIsExpanded}
          priority
          src="/images/svg/chevron.svg"
          height={14}
          width={14}
        />
        <AccordionLabel>{label}</AccordionLabel>
      </AccordionContainer>
      {localIsExpanded && <div>{children}</div>}
    </>
  );
};

export default Accordion;
