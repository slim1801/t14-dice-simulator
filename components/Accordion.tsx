import styled, { css } from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AccordionProps {
  label?: string;
  subLabel?: string;
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

const AccordionLabelContainer = styled.div`
  flex: 1;
  padding-left: 10px;
`;

const AccordionSubLabel = styled.span`
  font-size: 11px;
  padding-left: 10px;
`;

const IconContainer = styled.div`
  padding-top: 4px;
`;

interface ImageWrapperProps {
  isExpanded?: boolean;
}

const ImageWrapper = styled.div<ImageWrapperProps>`
  height: 14px;
  ${(props) =>
    props.isExpanded &&
    css`
      transform: rotate(180deg);
    `}
`;

const Accordion: React.FunctionComponent<
  React.PropsWithChildren<AccordionProps>
> = ({ children, isExpanded, label, subLabel, onClick }) => {
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
        <IconContainer>
          <ImageWrapper isExpanded={localIsExpanded}>
            <Image
              src="/images/svg/chevron.svg"
              priority
              height={14}
              width={14}
              alt="Chevron"
            />
          </ImageWrapper>
        </IconContainer>
        <AccordionLabelContainer>
          <span>{label}</span>
          <AccordionSubLabel>{subLabel}</AccordionSubLabel>
        </AccordionLabelContainer>
      </AccordionContainer>
      {localIsExpanded && <div>{children}</div>}
    </>
  );
};

export default Accordion;
