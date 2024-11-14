import { PropsWithChildren } from "react";
import styled from "styled-components";

interface RoundButtonProps {
  disabled?: boolean;
  radius: number;
  color?: string;
  onClick?: () => void;
}

interface RoundButtonComponentProps {
  radius: number;
  color: string;
}

const RoundButtonComponent = styled.button<RoundButtonComponentProps>`
  border-radius: ${(props) => props.radius}px;
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  background: none;
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
  padding: 0;
  cursor: pointer;
  outline: inherit;

  :disabled {
    color: grey;
    border: 2px solid grey;
  }
`;

const RoundButton: React.FunctionComponent<
  PropsWithChildren<RoundButtonProps>
> = ({ children, disabled, color, radius, onClick }) => {
  return (
    <RoundButtonComponent
      disabled={disabled}
      color={color || "white"}
      radius={radius}
      onClick={onClick}
    >
      {children}
    </RoundButtonComponent>
  );
};

export default RoundButton;
