import styled from "styled-components";

interface CombatProps {
  combat?: number;
}

const CombatContainer = styled.div`
  text-align: center;
  width: 50px;
`;

const CombatNumber = styled.div`
  font-size: 25px;
`;

const CombatLabel = styled.div`
  font-size: 7px;
`;

const Combat: React.FunctionComponent<CombatProps> = ({ combat }) => {
  return (
    <CombatContainer>
      <CombatNumber>{combat !== undefined ? combat : "-"}</CombatNumber>
      <CombatLabel>COMBAT</CombatLabel>
    </CombatContainer>
  );
};

export default Combat;
