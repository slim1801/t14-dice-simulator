import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { TechnologyType } from "../types";

interface ActionCardButtonProps {
  selected: boolean;
  onClick: () => void;
}

interface ActionButtonComponentProps {
  selected: boolean;
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
      background-color: orange;
      color: white;
    `}
`;

const ActionButton: React.FunctionComponent<
  PropsWithChildren<ActionCardButtonProps>
> = ({ children, selected, onClick }) => {
  return (
    <ActionCardButtonComponent selected={selected} onClick={() => onClick?.()}>
      {children}
    </ActionCardButtonComponent>
  );
};

export default ActionButton;
