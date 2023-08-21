import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
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
  FactionExclusives,
  PromissoryNotes,
  CombatEvalFunc,
} from "../types";
import { StylelessButton } from "./StylelessButton";
import IconImage from "./IconImage";
import Combat from "./Combat";
import RoundButton from "./RoundButton";
import TechnologyButton from "./TechnologyButton";
import {
  FACTION_EXCLUSIVE_TECHNOLOGY,
  FACTION_TECHNOLOGY,
  TECHNOLOGY_COMBAT,
} from "../constants/technology";
import { ACTION_COMBAT, COMBAT_ACTION_CARDS } from "../constants/actions";
import {
  FACTION_COMBAT_LEADERS,
  LEADER_ABILITIES_COMBAT,
} from "../constants/leaders";
import SelectableButton from "./SelectableButton";
import { Header, HeaderButtonContainer, HeaderWrapper } from "./Headers";
import { AGENDAS, AGENDA_COMBAT } from "../constants/agendas";
import { UNIT_COMBAT_ABILITIES } from "../constants/units";
import {
  FACTION_EXCLUSIVE_ABILITIES,
  FACTION_EXCLUSIVE_ABILITIES_COMBAT,
} from "../constants/factionAbilities";
import SelectBox from "./SelectBox";
import {
  FACTION_TECH_COMBAT,
  FACTION_UNIT_COMBAT,
} from "../constants/factions";
import Accordion from "./Accordion";
import {
  PROMISSORY_NOTES,
  PROMISSORY_NOTE_COMBAT,
} from "../constants/promissory";
import { calculateCombat } from "../utils/combat";

interface CombatModalProps {
  shouldShow: boolean;
  unitCombat: UnitCombat;
  additionalUnitCombat: UnitCombat[];
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

const HeaderSelectContainer = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const HeaderSelectLabel = styled.div`
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
  additionalUnitCombat,
  faction,
  numUnits,
  onClose,
}) => {
  const [localNumUnits, setLocalNumUnits] = useState({ ...numUnits });
  const [unitAbilitySelected, setUnitAbilitySelected] = useState<
    Partial<Record<Units, boolean>>
  >({});

  useEffect(() => {
    setLocalNumUnits(numUnits);
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
    return FACTION_COMBAT_LEADERS.reduce((acc, leaderAbility) => {
      acc[leaderAbility] = false;
      return acc;
    }, {} as Record<CombatLeaderAbilities, boolean>);
  }, []);

  const [selectedLeaderAbilities, setSelectedAbilitiesLeaders] = useState(
    defaultSelectedAbilitiesLeaders
  );

  const defaultSelectedFactionExclusiveAbilities = useMemo(() => {
    return FACTION_EXCLUSIVE_ABILITIES[faction].reduce(
      (acc, factionAbility) => {
        acc[factionAbility] = false;
        return acc;
      },
      {} as Record<FactionExclusives, boolean>
    );
  }, [faction]);

  const defaultPromissoryNotes = useMemo(() => {
    return PROMISSORY_NOTES.reduce((acc, note) => {
      acc[note] = false;
      return acc;
    }, {} as Record<PromissoryNotes, boolean>);
  }, []);

  const [selectedPromissoryNotes, setSelectedPromissoryNotes] = useState(
    defaultPromissoryNotes
  );

  const onPromissoryNoteSelected = useCallback((note: PromissoryNotes) => {
    setSelectedPromissoryNotes((prevState) => ({
      ...prevState,
      [note]: !prevState[note],
    }));
  }, []);

  const [
    selectedFactionExclusiveAbilities,
    setSelectedFactionExclusiveAbilities,
  ] = useState(defaultSelectedFactionExclusiveAbilities);

  const onFactionExclusiveSelected = useCallback(
    (factionAbility: FactionExclusives) => {
      setSelectedFactionExclusiveAbilities((prevState) => ({
        ...prevState,
        [factionAbility]: !prevState[factionAbility],
      }));
    },
    []
  );

  const [valefarX, setValefarX] = useState("");
  const [valefarY, setValefarY] = useState("");

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
    return UnitOrder.filter((unit) => {
      const hasAdditionalCombat = additionalUnitCombat.some(
        (additionalUnit) => Object.keys(additionalUnit[unit]).length > 0
      );
      return hasAdditionalCombat || numUnits[unit] > 0;
    });
  }, [numUnits, additionalUnitCombat]);

  const [rolls, setRolls] = useState<Partial<UnitRolls>>({});

  const [combatType, setCombatType] = useState<CombatType | null>(null);

  const [rolling, setRolling] = useState(0);

  const unitCombats = useMemo(() => {
    const evaluateUnitCombat = (localCombat: UnitCombat) => {
      let _unitCombat: UnitCombat = JSON.parse(JSON.stringify(localCombat));

      const runCombatEvalFunc = (combatEvalFunc?: CombatEvalFunc | null) => {
        if (combatEvalFunc) {
          const modCombat = combatEvalFunc(_unitCombat, localNumUnits);
          if (modCombat) {
            _unitCombat = deepmerge(_unitCombat, modCombat);
          }
        }
      };

      // Apply Nekro Unit Tech
      const valefarXUnitTech = FACTION_UNIT_COMBAT?.[valefarX];
      const valefarYUnitTech = FACTION_UNIT_COMBAT?.[valefarY];

      if (valefarXUnitTech) {
        _unitCombat = deepmerge(_unitCombat, valefarXUnitTech);
      }
      if (valefarYUnitTech) {
        _unitCombat = deepmerge(_unitCombat, valefarYUnitTech);
      }

      // Apply Nekro Tech
      const valefarXTech = FACTION_TECH_COMBAT?.[valefarX];
      runCombatEvalFunc(valefarXTech);

      const valefarYTech = FACTION_TECH_COMBAT?.[valefarY];
      runCombatEvalFunc(valefarYTech);

      // Calculate tech
      const techKeys = Object.keys(selectedTechnologies) as CombatTechnology[];

      techKeys.forEach((techKey) => {
        if (selectedTechnologies[techKey]) {
          runCombatEvalFunc(TECHNOLOGY_COMBAT[techKey]);
        }
      });

      // Calculate actions
      const actionCardKeys = Object.keys(
        selectedActionCards
      ) as CombatActionCards[];

      actionCardKeys.forEach((actionCardKey) => {
        if (selectedActionCards[actionCardKey]) {
          runCombatEvalFunc(ACTION_COMBAT[actionCardKey]);
        }
      });

      // Calculate leader abilities
      const leaderAbilitiesKeys = Object.keys(
        selectedLeaderAbilities
      ) as CombatLeaderAbilities[];

      leaderAbilitiesKeys.forEach((leaderAbilitiesKey) => {
        if (selectedLeaderAbilities[leaderAbilitiesKey]) {
          runCombatEvalFunc(LEADER_ABILITIES_COMBAT[leaderAbilitiesKey]);
        }
      });

      // Calculate faction abilities
      const factionExclusiveAbilitiesKeys = Object.keys(
        selectedFactionExclusiveAbilities
      ) as FactionExclusives[];

      factionExclusiveAbilitiesKeys.forEach((factionExclusiveAbilitiesKey) => {
        if (selectedFactionExclusiveAbilities[factionExclusiveAbilitiesKey]) {
          runCombatEvalFunc(
            FACTION_EXCLUSIVE_ABILITIES_COMBAT[factionExclusiveAbilitiesKey]
          );
        }
      });

      // Calculate promissory
      const selectedPromissoryNoteKeys = Object.keys(
        selectedPromissoryNotes
      ) as PromissoryNotes[];

      selectedPromissoryNoteKeys.forEach((promissoryNoteKey) => {
        if (selectedPromissoryNotes[promissoryNoteKey]) {
          runCombatEvalFunc(PROMISSORY_NOTE_COMBAT[promissoryNoteKey]);
        }
      });

      // Calculate agendas
      const agendaCardKeys = Object.keys(
        selectedAgendas
      ) as CombatAgendaCards[];

      agendaCardKeys.forEach((agendaCardKey) => {
        if (selectedAgendas[agendaCardKey]) {
          runCombatEvalFunc(AGENDA_COMBAT[agendaCardKey]);
        }
      });

      const unitCombatAbilities = UNIT_COMBAT_ABILITIES[faction];

      if (unitCombatAbilities) {
        const units = Object.keys(unitCombatAbilities) as Units[];

        units.forEach((unit) => {
          const unitCombatSelectable = unitCombatAbilities[unit]?.selectable;
          // Calculate unit combat ability
          if (
            (unitCombatSelectable && unitAbilitySelected[unit]) ||
            (!unitCombatSelectable && localNumUnits[unit] > 0)
          ) {
            runCombatEvalFunc(unitCombatAbilities[unit]?.combatEvalFunc);
          }
        });
      }

      return _unitCombat;
    };

    const additionalCombats = additionalUnitCombat.map((additionalUnit) =>
      evaluateUnitCombat(additionalUnit)
    );

    return [evaluateUnitCombat(initialUnitCombat), ...additionalCombats];
  }, [
    initialUnitCombat,
    additionalUnitCombat,
    valefarX,
    valefarY,
    selectedTechnologies,
    selectedActionCards,
    selectedLeaderAbilities,
    selectedFactionExclusiveAbilities,
    selectedPromissoryNotes,
    selectedAgendas,
    faction,
    unitAbilitySelected,
    localNumUnits,
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

        const rollForCombat = (localCombat: UnitCombat) => {
          activeUnits.forEach((unit) => {
            const combatDetails = localCombat[unit][_combatType];

            let numUnits = combatDetails?.additional
              ? combatDetails?.numUnitsMod?.[0]
              : localNumUnits[unit];

            if (!activeRolls[unit]) {
              activeRolls[unit] = [];
            }

            if (
              numUnits !== undefined &&
              numUnits > 0 &&
              combatDetails?.combat
            ) {
              const firstRoll = doRolls(
                numUnits,
                combatDetails?.rolls,
                combatDetails?.rollMod
              );

              activeRolls[unit]?.push({
                combat: combatDetails?.combat,
                rolls: firstRoll,
                name: localCombat[unit].name,
                ...(combatDetails?.rerollMisses && {
                  rerolls:
                    combatDetails?.rerollMisses &&
                    doRolls(
                      numUnits,
                      combatDetails?.rolls,
                      combatDetails?.rollMod
                    ),
                }),
              });
            } else {
              activeRolls[unit]?.push({
                rolls: [],
              });
            }
          });
        };

        unitCombats.forEach((unitCombat) => rollForCombat(unitCombat));

        setRolls(activeRolls);
      };
    },
    [rolling, rollingTimeout, unitCombats, activeUnits, localNumUnits]
  );

  const rollHits = useMemo(() => {
    const activeRolls = Object.keys(rolls) as Units[];

    return activeRolls.reduce((acc, activeUnit) => {
      const rollhits = rolls[activeUnit]?.map((unitRolls, rollIndex) => {
        const combatStrength: number = combatType
          ? calculateCombat(
              unitCombats[rollIndex]?.[activeUnit]?.[combatType]
            ) || 1
          : 0;

        return unitRolls.rolls.map((roll, index) => {
          const reroll = unitRolls.rerolls?.[index];

          const initialHit = roll >= combatStrength;
          const rerollHit = reroll !== undefined && reroll >= combatStrength;
          return {
            hit: initialHit || rerollHit,
            roll,
            ...(!initialHit && { reroll }),
            combatStrength,
            name: unitRolls?.name,
          };
        });
      });
      if (rollhits) {
        acc[activeUnit] = rollhits;
      }
      return acc;
    }, {} as UnitHits);
  }, [combatType, rolls, unitCombats]);

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

  const combinedModifiers = useMemo(() => {
    const combinedModifiers: Record<string, boolean> = {
      ...selectedActionCards,
      ...selectedTechnologies,
      ...selectedAgendas,
      ...selectedLeaderAbilities,
      ...selectedPromissoryNotes,
      ...selectedFactionExclusiveAbilities,
    };
    return Object.keys(combinedModifiers).filter(
      (key) => combinedModifiers[key]
    );
  }, [
    selectedActionCards,
    selectedAgendas,
    selectedFactionExclusiveAbilities,
    selectedPromissoryNotes,
    selectedLeaderAbilities,
    selectedTechnologies,
  ]);

  const unitCombatAbilities = useMemo(() => {
    const factionUnitAbilities = UNIT_COMBAT_ABILITIES[faction];
    if (factionUnitAbilities) {
      return Object.keys(factionUnitAbilities) as Units[];
    }
  }, [faction]);

  if (!shouldShow) {
    return null;
  }

  return (
    <Overlay>
      <ModalContent>
        <Header>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <Accordion
          label="Modifiers"
          subLabel={
            combinedModifiers.length > 0
              ? `(${combinedModifiers.join(",")})`
              : undefined
          }
        >
          <>
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
                {PROMISSORY_NOTES.map((note) => (
                  <HeaderButtonContainer key={note}>
                    <SelectableButton
                      highlightColor="orange"
                      selected={selectedPromissoryNotes[note]}
                      onClick={() => onPromissoryNoteSelected(note)}
                    >
                      {note}
                    </SelectableButton>
                  </HeaderButtonContainer>
                ))}
              </HeaderWrapper>
            </Header>
            <Header>
              <HeaderWrapper>
                {FACTION_COMBAT_LEADERS?.map((leaderAbility) => (
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
                {FACTION_EXCLUSIVE_ABILITIES[faction]?.map((factionAbility) => (
                  <HeaderButtonContainer key={factionAbility}>
                    <SelectableButton
                      highlightColor="purple"
                      selected={
                        selectedFactionExclusiveAbilities[factionAbility]
                      }
                      onClick={() => onFactionExclusiveSelected(factionAbility)}
                    >
                      {factionAbility}
                    </SelectableButton>
                  </HeaderButtonContainer>
                ))}
                {unitCombatAbilities &&
                  unitCombatAbilities.map(
                    (unit) =>
                      UNIT_COMBAT_ABILITIES[faction]?.[unit]?.selectable && (
                        <HeaderButtonContainer>
                          <SelectableButton
                            highlightColor="purple"
                            selected={!!unitAbilitySelected[unit]}
                            onClick={() =>
                              setUnitAbilitySelected((prevState) => ({
                                ...prevState,
                                [unit]: !prevState[unit],
                              }))
                            }
                          >
                            {UNIT_COMBAT_ABILITIES[faction]?.[unit]?.name}
                          </SelectableButton>
                        </HeaderButtonContainer>
                      )
                  )}
              </HeaderWrapper>
            </Header>
            {faction === "Nekro" && (
              <Header>
                <HeaderWrapper>
                  <HeaderSelectContainer>
                    <HeaderSelectLabel>X:</HeaderSelectLabel>
                    <SelectBox
                      options={FACTION_EXCLUSIVE_TECHNOLOGY.map(
                        (factionTech) => ({
                          label: factionTech,
                          value: factionTech,
                        })
                      )}
                      onChange={(e) => setValefarX(e.target.value)}
                      value={valefarX}
                    />
                  </HeaderSelectContainer>
                  <HeaderSelectContainer>
                    <HeaderSelectLabel>Y:</HeaderSelectLabel>
                    <SelectBox
                      options={FACTION_EXCLUSIVE_TECHNOLOGY.map(
                        (factionTech) => ({
                          label: factionTech,
                          value: factionTech,
                        })
                      )}
                      onChange={(e) => setValefarY(e.target.value)}
                      value={valefarY}
                    />
                  </HeaderSelectContainer>
                </HeaderWrapper>
              </Header>
            )}
          </>
        </Accordion>
        <Content>
          {activeUnits.map((unit) => {
            return (
              <CombatUnitRow key={unit}>
                <IconContainer>
                  <IconImage faction={faction} unit={unit} />
                  <NumUnitsContainer>x{localNumUnits[unit]}</NumUnitsContainer>
                </IconContainer>
                <Combat
                  combat={
                    combatType
                      ? calculateCombat(unitCombats[0]?.[unit]?.[combatType])
                      : undefined
                  }
                />
                <RollContainer>
                  {rollHits[unit]?.map((rollSets, index) => {
                    if (rollSets.length === 0) {
                      return null;
                    }

                    const rollSet = rollSets.map(
                      ({ roll, hit, reroll }, _index) => {
                        const comma = _index < rollSets.length - 1 ? ", " : "";
                        if (hit) {
                          if (reroll !== undefined) {
                            return (
                              <Fragment key={_index}>
                                <span>{`${roll}->`}</span>
                                <DiceHit>{reroll}</DiceHit>
                                <span>{comma}</span>
                              </Fragment>
                            );
                          } else {
                            return (
                              <Fragment key={_index}>
                                <DiceHit>{roll}</DiceHit>
                                <span>{comma}</span>
                              </Fragment>
                            );
                          }
                        }
                        return (
                          <span key={_index}>
                            {roll}
                            {reroll !== undefined && `->${reroll}`}
                            {comma}
                          </span>
                        );
                      }
                    );

                    return (
                      <RollSet key={index}>
                        [{rollSet}]
                        <CombatStrength>
                          {rollSets[index]?.combatStrength || 1}{" "}
                          {rollSets[index]?.name && `(${rollSets[0]?.name})`}
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
                    disabled={localNumUnits[unit] === 0}
                    onClick={() =>
                      setLocalNumUnits((prevState) => ({
                        ...prevState,
                        [unit]: prevState[unit] - 1,
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
                    disabled={localNumUnits[unit] === numUnits[unit]}
                    onClick={() =>
                      setLocalNumUnits((prevState) => ({
                        ...prevState,
                        [unit]: prevState[unit] + 1,
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
