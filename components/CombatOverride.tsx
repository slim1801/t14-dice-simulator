import { useState } from "react";
import styled from "styled-components";
import { StylelessButton } from "./StylelessButton";
import { createPortal } from "react-dom";
import { Overlay } from "./Overlay";
import { Header } from "./Headers";
import { BespokeCombat } from "../types";
import RoundButton from "./RoundButton";

interface CombatOverrideProps {
  bespokeCombat: BespokeCombat;
  onClosedButtonClicked?: () => void;
  onApply?: (value: number) => void;
}

const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  width: 80%;
  max-width: 500px;
  height: 125px;
  background-color: white;
  color: black;
`;

const CloseButton = styled(StylelessButton)`
  display: flex;
  padding-top: 10px;
  padding-right: 10px;
  font-size: 20px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const ApplyButton = styled(StylelessButton)`
  padding: 4px;
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: 500;
  border: 1px solid black;
  font-size: 12px;
`;

const RoundButtonContainer = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const LabelContainer = styled.div`
  flex: 1;
  padding-left: 10px;
`;

const ValueContainer = styled.div`
  width: 30px;
  text-align: center;
`;

const CombatOverride: React.FunctionComponent<CombatOverrideProps> = ({
  bespokeCombat,
  onClosedButtonClicked,
  onApply,
}) => {
  const [value, setValue] = useState(bespokeCombat.number || 0);

  return createPortal(
    <Overlay>
      <ModalContent>
        <Header>
          <CloseButton onClick={onClosedButtonClicked}>x</CloseButton>
        </Header>
        <Content>
          <LabelContainer>{bespokeCombat.bespokeLabel}</LabelContainer>
          <RoundButtonContainer>
            <RoundButton
              radius={15}
              color="black"
              disabled={value === 0}
              onClick={() => setValue(value - 1)}
            >
              -
            </RoundButton>
          </RoundButtonContainer>
          <ValueContainer>{value}</ValueContainer>
          <RoundButtonContainer>
            <RoundButton
              radius={15}
              color="black"
              onClick={() => setValue(value + 1)}
            >
              +
            </RoundButton>
          </RoundButtonContainer>
        </Content>
        <div style={{ padding: 4 }}>
          <ApplyButton
            onClick={() => {
              onApply?.(value);
            }}
          >
            APPLY
          </ApplyButton>
        </div>
      </ModalContent>
    </Overlay>,
    document.body
  );
};

export default CombatOverride;
