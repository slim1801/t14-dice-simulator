import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import deepmerge from "deepmerge";
import {
  CombatType,
  Factions,
  NumUnits,
  CombatTechnology,
  UnitCombat,
  UnitHits,
  UnitRolls,
  Units,
  CombatActionCards,
  CombatLeaderAbilities,
  CombatAgendaCards,
} from "../types";
import { StylelessButton } from "./StylelessButton";
import IconImage from "./IconImage";
import Combat from "./Combat";
import RoundButton from "./RoundButton";
import TechnologyButton from "./TechnologyButton";
import { FACTION_TECHNOLOGY, TECHNOLOGY_COMBAT } from "../constants/technology";
import { ACTION_COMBAT, COMBAT_ACTION_CARDS } from "../constants/actions";
import {
  FACTION_LEADER_ABILITIES,
  LEADER_ABILITIES_COMBAT,
} from "../constants/leaders";
import SelectableButton from "./SelectableButton";
import { AGENDAS, AGENDA_COMBAT } from "../constants/agendas";
import { FACTION_FLAGSHIPS } from "../constants/flagships";

interface CombatModalProps {
  shouldShow: boolean;
  unitCombat: UnitCombat;
  numUnits: NumUnits;
  faction: Factions;
  onClose?: () => void;
}

const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  width: 90%;
  max-width: 700px;
  height: 90%;
  background-color: white;
  color: black;
`;

const Content = styled.div`
  flex: 1;
  margin-top: 10px;
  overflow: auto;
`;

const Footer = styled.div`
  padding: 5px;
`;

const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(100, 100, 100, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Rolling = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const CloseButton = styled(StylelessButton)`
  display: flex;
  padding-top: 10px;
  padding-right: 10px;
  font-size: 20px;
`;

const CombatButtonContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 5px;
`;

const GroundCombatButtonContainer = styled(CombatButtonContainer)`
  border-top: 3px solid black;
  margin-top: 10px;
  padding-top: 5px;
`;

const CombatButton = styled(StylelessButton)`
  padding: 10px;
  flex: 1;
  color: white;
  margin-top: 5px;
  background-color: grey;
  font-size: 14px;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`;

const NumUnitsContainer = styled.div`
  position: absolute;
  bottom: -5px;
  right: 0;
  font-size: 11px;
`;

const CombatUnitRow = styled.div`
  display: flex;
  width: 100%;
  padding: 3px;
`;

const DiceHit = styled.span`
  color: red;
  font-weight: 400;
`;

const TotalUnitHitContainer = styled.div`
  justify-content: right;
  width: 40px;
  color: red;
  font-weight: 500;
  font-size: 30px;
  padding-right: 10px;
  display: flex;
  align-items: center;
`;

const TotalHitsContainer = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  margin-bottom: 5px;
  width: 100%;
  align-items: center;
`;

const TotalLabel = styled.span`
  text-align: right;
  padding-right: 12px;
  font-weight: 500;
`;

const TotalHits = styled(TotalUnitHitContainer)`
  text-align: right;
`;

const RerollButton = styled(StylelessButton)`
  padding: 5px 10px;
  color: white;
  background-color: grey;
  width: 70px;
  font-size: 10px;
`;

const RollContainer = styled.div`
  flex: 1;
  padding-right: 10px;
  font-size: 12px;
`;

const RoundButtonContainer = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  padding-left: 5px;
  flex: 1;
  display: flex;
`;

const HeaderButtonContainer = styled.div`
  margin-top: 10px;
  margin-right: 10px;
`;

const RollSet = styled.div`
  vertical-align: sub;
`;

const CombatStrength = styled.span`
  vertical-align: sub;
  font-size: 9px;
`;

const UnitOrder: Units[] = [
  "Flagship",
  "War_Sun",
  "Dreadnought",
  "Cruiser",
  "Destroyer",
  "Carrier",
  "Fighter",
  "PDS",
  "Mech",
  "Infantry",
];

const _doroll = (num: number): number[] => {
  const rolls: number[] = [];
  for (let i = 0; i < num; i++) {
    rolls.push(Math.floor(Math.random() * 10) + 1);
  }
  return rolls;
};

const doRolls = (numUnits: number, rolls?: number, rollMod?: number[]) => {
  return _doroll(
    numUnits * (rolls || 1) +
      (rollMod || [0]).reduce((acc, val) => acc + val, 0)
  );
};

const ROLLING_TIMEOUT = 150;

const CombatModal: React.FunctionComponent<CombatModalProps> = ({
  shouldShow,
  unitCombat: initialUnitCombat,
  faction,
  numUnits,
  onClose,
}) => {
  const [_numUnits, _setNumUnits] = useState({ ...numUnits });

  useEffect(() => {
    _setNumUnits(numUnits);
  }, [numUnits]);

  const defaultSelectedTechs = useMemo(() => {
    return FACTION_TECHNOLOGY[faction].reduce((acc, tech) => {
      acc[tech.name] = false;
      return acc;
    }, {} as Record<CombatTechnology, boolean>);
  }, [faction]);

  const [selectedTechnologies, setSelectedTechnologies] =
    useState(defaultSelectedTechs);

  const onTechSelected = useCallback((technology: CombatTechnology) => {
    setSelectedTechnologies((prevState) => ({
      ...prevState,
      [technology]: !prevState[technology],
    }));
  }, []);

  const defaultActionCards = useMemo(() => {
    return COMBAT_ACTION_CARDS.reduce((acc, actionCard) => {
      acc[actionCard] = false;
      return acc;
    }, {} as Record<CombatActionCards, boolean>);
  }, []);

  const [selectedActionCards, setSelectedActionCards] =
    useState(defaultActionCards);

  const onActionCardSelected = useCallback((actionCard: CombatActionCards) => {
    setSelectedActionCards((prevState) => ({
      ...prevState,
      [actionCard]: !prevState[actionCard],
    }));
  }, []);

  const defaultSelectedAbilitiesLeaders = useMemo(() => {
    return FACTION_LEADER_ABILITIES[faction].reduce((acc, leaderAbility) => {
      acc[leaderAbility] = false;
      return acc;
    }, {} as Record<CombatLeaderAbilities, boolean>);
  }, [faction]);

  const [selectedLeaderAbilities, setSelectedAbilitiesLeaders] = useState(
    defaultSelectedAbilitiesLeaders
  );

  const [flagshipSelected, setFlagshipSelected] = useState(false);

  const onAbilitiesLeadersSelected = useCallback(
    (leadersAbility: CombatLeaderAbilities) => {
      setSelectedAbilitiesLeaders((prevState) => ({
        ...prevState,
        [leadersAbility]: !prevState[leadersAbility],
      }));
    },
    []
  );

  const [selectedAgendas, setSelectedAgendas] = useState({
    "Prophecy of Ixth": false,
  });

  const onAgendaSelected = useCallback((agenda: CombatAgendaCards) => {
    setSelectedAgendas((prevState) => ({
      ...prevState,
      [agenda]: !prevState[agenda],
    }));
  }, []);

  const activeUnits = useMemo(() => {
    return UnitOrder.filter((unit) => numUnits[unit] > 0);
  }, [numUnits]);

  const [rolls, setRolls] = useState<Partial<UnitRolls>>({});

  const [combatType, setCombatType] = useState<CombatType | null>(null);

  const [rolling, setRolling] = useState(0);

  const unitCombat = useMemo(() => {
    let _unitCombat: UnitCombat = JSON.parse(JSON.stringify(initialUnitCombat));

    // Calculate tech
    const techKeys = Object.keys(selectedTechnologies) as CombatTechnology[];

    techKeys.forEach((techKey) => {
      if (selectedTechnologies[techKey]) {
        const modCombat = TECHNOLOGY_COMBAT[techKey](
          initialUnitCombat,
          numUnits
        );
        if (modCombat) {
          _unitCombat = deepmerge(_unitCombat, modCombat);
        }
      }
    });

    // Calculate actions
    const actionCardKeys = Object.keys(
      selectedActionCards
    ) as CombatActionCards[];

    actionCardKeys.forEach((actionCardKey) => {
      if (selectedActionCards[actionCardKey]) {
        const modActionCombat = ACTION_COMBAT[actionCardKey](
          initialUnitCombat,
          numUnits
        );
        if (modActionCombat) {
          _unitCombat = deepmerge(_unitCombat, modActionCombat);
        }
      }
    });

    // Calculate leader abilities
    const leaderAbilitiesKeys = Object.keys(
      selectedLeaderAbilities
    ) as CombatLeaderAbilities[];

    leaderAbilitiesKeys.forEach((leaderAbilitiesKey) => {
      if (selectedLeaderAbilities[leaderAbilitiesKey]) {
        const modCombat = LEADER_ABILITIES_COMBAT[leaderAbilitiesKey](
          initialUnitCombat,
          numUnits
        );
        if (modCombat) {
          _unitCombat = deepmerge(_unitCombat, modCombat);
        }
      }
    });

    // Calculate agendas
    const agendaCardKeys = Object.keys(selectedAgendas) as CombatAgendaCards[];

    agendaCardKeys.forEach((agendaCardKey) => {
      if (selectedAgendas[agendaCardKey]) {
        const modCombat = AGENDA_COMBAT[agendaCardKey](
          initialUnitCombat,
          numUnits
        );
        if (modCombat) {
          _unitCombat = deepmerge(_unitCombat, modCombat);
        }
      }
    });

    // Calculate flagships
    if (
      FACTION_FLAGSHIPS[faction] &&
      flagshipSelected &&
      _numUnits.Flagship > 0
    ) {
      const modCombat = FACTION_FLAGSHIPS[faction]?.combatFunc?.(
        initialUnitCombat,
        numUnits
      );
      if (modCombat) {
        _unitCombat = deepmerge(_unitCombat, modCombat);
      }
    }

    return _unitCombat;
  }, [
    initialUnitCombat,
    selectedTechnologies,
    selectedActionCards,
    selectedLeaderAbilities,
    selectedAgendas,
    faction,
    flagshipSelected,
    _numUnits.Flagship,
    numUnits,
  ]);

  const rollingTimeout = useCallback(async () => {
    setRolling(1);
    await new Promise((resolve) => setTimeout(resolve, ROLLING_TIMEOUT));
    setRolling(2);
    await new Promise((resolve) => setTimeout(resolve, ROLLING_TIMEOUT));
    setRolling(3);
    await new Promise((resolve) => setTimeout(resolve, ROLLING_TIMEOUT));
    setRolling(0);
  }, []);

  const onCombat = useCallback(
    (_combatType: CombatType) => {
      return async () => {
        if (rolling > 0) {
          return;
        }
        setCombatType(_combatType);

        setRolls({});
        await rollingTimeout();

        const activeRolls: Partial<UnitRolls> = {};

        const activeUnits: Units[] = UnitOrder.filter(
          (unit) => unitCombat[unit][_combatType]?.combat !== undefined
        );

        activeUnits.forEach((unit) => {
          if (_numUnits[unit] > 0) {
            const combatDetails = unitCombat[unit][_combatType];
            activeRolls[unit] = [
              {
                combat: combatDetails?.combat,
                rolls: doRolls(
                  _numUnits[unit],
                  combatDetails?.rolls,
                  combatDetails?.rollMod
                ),
              },
            ];

            // Additional Rolls
            if (combatDetails?.additional) {
              combatDetails.additional?.forEach((additionalCombat) => {
                if (additionalCombat.combat) {
                  activeRolls[unit]?.push({
                    combat: additionalCombat.combat,
                    rolls: doRolls(
                      _numUnits[unit],
                      additionalCombat.rolls,
                      additionalCombat.rollMod
                    ),
                  });
                }
              });
            }
          }
        });
        setRolls(activeRolls);
      };
    },
    [_numUnits, unitCombat, rolling, rollingTimeout]
  );

  const rollHits = useMemo(() => {
    const activeRolls = Object.keys(rolls) as Units[];
    return activeRolls.reduce((acc, activeUnit) => {
      const rollhits = rolls[activeUnit]?.map((unitRolls) => {
        const combatStrength: number = combatType ? unitRolls.combat || 1 : 0;

        const combatMod = (
          combatType
            ? unitCombat[activeUnit][combatType]?.combatMod || [0]
            : [0]
        ).reduce((acc, val) => acc + val, 0);

        return unitRolls.rolls.map((roll) => {
          return {
            hit: roll + combatMod >= combatStrength,
            roll,
            combatStrength: combatStrength - combatMod,
          };
        });
      });
      if (rollhits) {
        acc[activeUnit] = rollhits;
      }
      return acc;
    }, {} as UnitHits);
  }, [combatType, rolls, unitCombat]);

  const totalUnitHits = useMemo(() => {
    const units = Object.keys(rollHits) as Units[];
    return units.reduce((acc, unit) => {
      acc[unit] = rollHits[unit]
        .flat()
        .reduce((acc, val) => acc + (val.hit ? 1 : 0), 0);
      return acc;
    }, {} as Record<Units, number>);
  }, [rollHits]);

  const totalHits = useMemo(() => {
    const units = Object.keys(totalUnitHits) as Units[];
    if (units.length > 0) {
      return units.reduce((acc, unit) => {
        return acc + totalUnitHits[unit];
      }, 0);
    }
    return null;
  }, [totalUnitHits]);

  const rollingLabel = useMemo(() => {
    if (rolling > 0) {
      let rollingDots = "";
      for (let i = 0; i < rolling; i++) {
        rollingDots += ".";
      }
      return `Rolling${rollingDots}`;
    }
    return "";
  }, [rolling]);

  const onReroll = useCallback(async () => {
    const newRolls: Partial<UnitRolls> = {};
    const units = Object.keys(rolls) as Units[];

    units.forEach((unit) => {
      newRolls[unit] = [];
      rolls?.[unit]?.forEach((unitRolls, rollSetIndex) => {
        const newUnitHits = unitRolls?.rolls?.map((rollValue, rollIndex) => {
          if (!rollHits?.[unit]?.[rollSetIndex]?.[rollIndex]?.hit) {
            return _doroll(1)[0];
          }
          return rollValue;
        });
        newRolls[unit]?.push({
          ...unitRolls,
          rolls: newUnitHits,
        });
      });
    });

    await rollingTimeout();
    setRolls(newRolls);
  }, [rolls, rollHits, rollingTimeout]);

  if (!shouldShow) {
    return null;
  }

  return (
    <Overlay>
      <ModalContent>
        <Header>
          <HeaderWrapper>
            {FACTION_TECHNOLOGY[faction].map((tech) => (
              <HeaderButtonContainer key={tech.name}>
                <TechnologyButton
                  type={tech.type}
                  selected={selectedTechnologies[tech.name]}
                  onClick={() => onTechSelected(tech.name)}
                >
                  {tech.name}
                </TechnologyButton>
              </HeaderButtonContainer>
            ))}
          </HeaderWrapper>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <Header>
          <HeaderWrapper>
            {COMBAT_ACTION_CARDS.map((actionCard) => (
              <HeaderButtonContainer key={actionCard}>
                <SelectableButton
                  highlightColor="orange"
                  selected={selectedActionCards[actionCard]}
                  onClick={() => onActionCardSelected(actionCard)}
                >
                  {actionCard}
                </SelectableButton>
              </HeaderButtonContainer>
            ))}
          </HeaderWrapper>
        </Header>
        <Header>
          <HeaderWrapper>
            {AGENDAS.map((agenda) => {
              return (
                <HeaderButtonContainer key={agenda}>
                  <SelectableButton
                    highlightColor="lightblue"
                    selected={selectedAgendas[agenda]}
                    onClick={() => onAgendaSelected(agenda)}
                  >
                    {agenda}
                  </SelectableButton>
                </HeaderButtonContainer>
              );
            })}
            {FACTION_LEADER_ABILITIES[faction]?.map((leaderAbility) => (
              <HeaderButtonContainer key={leaderAbility}>
                <SelectableButton
                  highlightColor="purple"
                  selected={selectedLeaderAbilities[leaderAbility]}
                  onClick={() => onAbilitiesLeadersSelected(leaderAbility)}
                >
                  {leaderAbility}
                </SelectableButton>
              </HeaderButtonContainer>
            ))}
            {_numUnits.Flagship > 0 && FACTION_FLAGSHIPS[faction] && (
              <HeaderButtonContainer>
                <SelectableButton
                  highlightColor="purple"
                  selected={flagshipSelected}
                  onClick={() => setFlagshipSelected(!flagshipSelected)}
                >
                  {FACTION_FLAGSHIPS[faction]?.name}
                </SelectableButton>
              </HeaderButtonContainer>
            )}
          </HeaderWrapper>
        </Header>
        <Content>
          {activeUnits.map((unit) => {
            return (
              <CombatUnitRow key={unit}>
                <IconContainer>
                  <IconImage faction={faction} unit={unit} />
                  <NumUnitsContainer>x{_numUnits[unit]}</NumUnitsContainer>
                </IconContainer>
                <Combat
                  combat={
                    combatType
                      ? unitCombat[unit][combatType]?.combat
                      : undefined
                  }
                />
                <RollContainer>
                  {rollHits[unit]?.map((rollSets, index) => {
                    const rollSet = rollSets.map(({ roll, hit }, _index) => {
                      const comma = _index < rollSets.length - 1 ? ", " : "";
                      if (hit) {
                        return (
                          <DiceHit key={_index}>
                            {roll}
                            {comma}
                          </DiceHit>
                        );
                      }
                      return (
                        <span key={_index}>
                          {roll}
                          {comma}
                        </span>
                      );
                    });
                    return (
                      <RollSet key={index}>
                        [{rollSet}]
                        <CombatStrength>
                          {rollSets[0]?.combatStrength || 1}
                        </CombatStrength>
                      </RollSet>
                    );
                  })}
                </RollContainer>
                <TotalUnitHitContainer>
                  {totalUnitHits[unit]}
                </TotalUnitHitContainer>
                <RoundButtonContainer>
                  <RoundButton
                    radius={15}
                    color="black"
                    disabled={_numUnits[unit] === 0}
                    onClick={() =>
                      _setNumUnits((prevState) => ({
                        ...prevState,
                        [unit]: _numUnits[unit] - 1,
                      }))
                    }
                  >
                    -
                  </RoundButton>
                </RoundButtonContainer>
                <RoundButtonContainer>
                  <RoundButton
                    radius={15}
                    color="black"
                    disabled={_numUnits[unit] === numUnits[unit]}
                    onClick={() =>
                      _setNumUnits((prevState) => ({
                        ...prevState,
                        [unit]: _numUnits[unit] + 1,
                      }))
                    }
                  >
                    +
                  </RoundButton>
                </RoundButtonContainer>
              </CombatUnitRow>
            );
          })}
        </Content>
        <Footer>
          {combatType && (
            <TotalHitsContainer>
              <Rolling>
                {rolling > 0
                  ? rollingLabel
                  : !!(totalHits !== null && totalHits === 0) && "No hits"}
              </Rolling>
              <TotalLabel>Total:</TotalLabel>
              <TotalHits>
                {Object.keys(rolls).length > 0 ? totalHits : "-"}
              </TotalHits>
              <RerollButton onClick={onReroll}>Reroll misses</RerollButton>
            </TotalHitsContainer>
          )}
          <CombatButtonContainer>
            <CombatButton onClick={onCombat("spaceCannon")}>
              Space Cannon
            </CombatButton>
            <CombatButton onClick={onCombat("antiFighterBarrage")}>
              Anti Fighter Barrage
            </CombatButton>
            <CombatButton onClick={onCombat("spaceCombat")}>
              Space Combat
            </CombatButton>
            <CombatButton onClick={onCombat("bombardment")}>
              Bombardment
            </CombatButton>
          </CombatButtonContainer>
          <GroundCombatButtonContainer>
            <CombatButton onClick={onCombat("groundSpaceCannon")}>
              Space Cannon
            </CombatButton>
            <CombatButton onClick={onCombat("groundCombat")}>
              Ground Combat
            </CombatButton>
          </GroundCombatButtonContainer>
        </Footer>
      </ModalContent>
    </Overlay>
  );
};

export default CombatModal;
