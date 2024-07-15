import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

interface SelectableButtonProps {
  selected?: boolean;
  highlightColor?: string;
  onClick?: () => void;
}

interface SelectableButtonComponentProps {
  selected?: boolean;
  highlightColor?: string;
}

const SelectableButtonComponent = styled.button<SelectableButtonComponentProps>`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: grey;
  border: 1px solid grey;
  font-size: 12px;
  background: white;

  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.highlightColor};
      color: white;
    `}
`;

const SelectableButton: React.FunctionComponent<
  PropsWithChildren<SelectableButtonProps>
> = ({ children, highlightColor, selected, onClick }) => {
  return (
    <SelectableButtonComponent
      highlightColor={highlightColor}
      selected={selected}
      onClick={() => onClick?.()}
    >
      {children}
    </SelectableButtonComponent>
  );
};

export default SelectableButton;
