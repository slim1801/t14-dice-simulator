import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { TechnologyType } from "../types";

interface ActionCardButtonProps {
  selected: boolean;
  highlightColor: string;
  onClick: () => void;
}

interface ActionButtonComponentProps {
  selected: boolean;
  highlightColor: string;
}

const ActionCardButtonComponent = styled.button<ActionButtonComponentProps>`
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
      background-color: ${props.highlightColor};
      color: white;
    `}
`;

const SelectableButton: React.FunctionComponent<
  PropsWithChildren<ActionCardButtonProps>
> = ({ children, highlightColor, selected, onClick }) => {
  return (
    <ActionCardButtonComponent
      highlightColor={highlightColor}
      selected={selected}
      onClick={() => onClick?.()}
    >
      {children}
    </ActionCardButtonComponent>
  );
};

export default SelectableButton;
