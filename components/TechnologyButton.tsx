import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { TechnologyType } from "../types";

interface TechnologyButtonProps {
  selected: boolean;
  type: TechnologyType;
  onClick: () => void;
}

interface TechnologyButtonComponentProps {
  selected: boolean;
  color: string;
}

const TechnologyButtonComponent = styled.button<TechnologyButtonComponentProps>`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: grey;
  border: 1px solid grey;
  font-size: 12px;
  background: none;

  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.color};
      color: white;
    `}
`;

const TECH_MAPPING: Record<TechnologyType, string> = {
  Biotic: "#00AD61",
  Propulsion: "#00AEDA",
  Cybernetic: "#F1E538",
  Warfare: "#FF606F",
};

const TechnologyButton: React.FunctionComponent<
  PropsWithChildren<TechnologyButtonProps>
> = ({ children, selected, type, onClick }) => {
  return (
    <TechnologyButtonComponent
      color={TECH_MAPPING[type]}
      selected={selected}
      onClick={() => onClick?.()}
    >
      {children}
    </TechnologyButtonComponent>
  );
};

export default TechnologyButton;
