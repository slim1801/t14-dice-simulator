import {
  BESPOKE_FACTION_COMBAT,
  FACTION_COMBAT,
  FACTION_NAMES,
  FACTION_UPGRADE_COMBAT,
} from "../constants/factions";
import deepmerge from "deepmerge";
import Image from "next/image";
import styled from "styled-components";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import UnitRow from "./UnitRow";
import UnitIcon from "./UnitIcon";
import CombatModal from "./CombatModal";
import { StylelessButton } from "./StylelessButton";
import {
  DEFAULT_UNIT_COMBAT_STRENGTH,
  DEFAULT_UNIT_UPGRADE_COMBAT,
  EMPTY_COMBAT_STRENGTH,
  UNIT_ABILITIES,
  UNIT_LIST,
} from "../constants/units";
import {
  NumUnits,
  UnitUpgraded,
  Factions,
  Units,
  UnitCombat,
  AdditionalCombatUnit,
  UnitCombatDetailsList,
  BespokeUnitCombat,
} from "../types";
import { FactionBackgroundImage } from "./FactionBackgroundImage";
import SelectableButton from "./SelectableButton";
import { HeaderButtonContainer, HeaderWrapper } from "./Headers";
import {
  ADDITIONAL_UNIT_COMBAT,
  FACTION_ADDITIONAL_COMBAT_UNITS,
} from "../constants/additionalCombat";
import { calculateCombat, calculateRolls } from "../utils/combat";

interface FactionProps {
  faction: Factions;
}

const Container = styled(FactionBackgroundImage)`
  display: flex;
  flex-flow: column;
  height: 100vh;
  position: relative;

  &:before {
    filter: blur(4px);
  }
`;

const ScrollContainer = styled.div`
  padding: 20px;
  padding-top: 5px;
  overflow: auto;
  flex: 1;
`;

const ButtonContainer = styled.div`
  padding: 10px;
`;

const StyledButton = styled(StylelessButton)`
  text-align: center;
  padding: 10px;
  background: white;
  color: black;
  width: 100%;
`;

const FactionLabel = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FactionHeading = styled.h1`
  margin-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 1.5em;
`;

const Header = styled.div`
  display: flex;
  padding-right: 20px;
  padding-bottom: 10px;
  justify-content: flex-end;
`;

const BackButton = styled(StylelessButton)`
  text-decoration: underline;
  padding-left: 20px;
`;

const ClearButton = styled(StylelessButton)`
  text-decoration: underline;
`;

const DEFAULT_NUM_UNITS = {
  Flagship: 0,
  War_Sun: 0,
  Dreadnought: 0,
  Cruiser: 0,
  Destroyer: 0,
  Carrier: 0,
  Fighter: 0,
  PDS: 0,
  Space_Dock: 0,
  Mech: 0,
  Infantry: 0,
};

const DEFAULT_UNIT_UPGRADES = {
  Flagship: false,
  War_Sun: false,
  Dreadnought: false,
  Cruiser: false,
  Destroyer: false,
  Carrier: false,
  Fighter: false,
  PDS: false,
  Space_Dock: false,
  Mech: false,
  Infantry: false,
};

const Faction: React.FunctionComponent<FactionProps> = ({ faction }) => {
  const [numUnits, setNumUnits] = useState<NumUnits>({ ...DEFAULT_NUM_UNITS });

  const _setNumUnits = useCallback(
    (key: Units) => {
      return (units: number) => {
        setNumUnits((prevState) => ({
          ...prevState,
          [key]: units,
        }));
      };
    },
    [setNumUnits]
  );

  const [upgraded, setUpgraded] = useState<UnitUpgraded>(DEFAULT_UNIT_UPGRADES);

  const _setUpgraded = useCallback(
    (key: Units) => {
      return (upgraded: boolean) => {
        setUpgraded((prevState) => ({
          ...prevState,
          [key]: upgraded,
        }));
      };
    },
    [setUpgraded]
  );

  const factionUpgrade = useMemo(
    () =>
      deepmerge(DEFAULT_UNIT_UPGRADE_COMBAT, FACTION_UPGRADE_COMBAT[faction]),
    [faction]
  );

  const [bespokeCombat, setBespokeCombat] = useState<
    Partial<BespokeUnitCombat> | undefined
  >(BESPOKE_FACTION_COMBAT[faction]);

  const calculatedBespokeCombat = useMemo(() => {
    if (bespokeCombat) {
      let newBespokeCombat = { ...bespokeCombat };
      UNIT_LIST.forEach((unitKey) => {
        const bespokeUnit = newBespokeCombat[unitKey];
        if (bespokeUnit) {
          const number = bespokeUnit.number || 0;

          UNIT_ABILITIES.forEach((unitAbilityKey) => {
            const bespokeUnitAbility = bespokeUnit[unitAbilityKey];

            const newRollMod = bespokeUnitAbility?.rollMod?.map(
              (rollValue) => rollValue * number
            );
            const newCombatMod = bespokeUnitAbility?.combatMod?.map(
              (combatValue) => combatValue * number
            );

            if (bespokeUnitAbility) {
              newBespokeCombat = {
                ...newBespokeCombat,
                [unitKey]: {
                  ...newBespokeCombat[unitKey],
                  [unitAbilityKey]: {
                    ...newBespokeCombat[unitKey]?.[unitAbilityKey],
                    rollMod: newRollMod,
                    combatMod: newCombatMod,
                  },
                },
              };
            }
          });
        }
      });

      return newBespokeCombat;
    }
  }, [bespokeCombat]);

  const combat: UnitCombat = useMemo(() => {
    let calcCombat = FACTION_COMBAT[faction];
    console.log(calculatedBespokeCombat);
    if (calculatedBespokeCombat) {
      calcCombat = deepmerge(calcCombat, calculatedBespokeCombat);
    }

    const initialCombat = deepmerge(DEFAULT_UNIT_COMBAT_STRENGTH, calcCombat);
    if (upgraded) {
      const factionUpgrades = Object.keys(factionUpgrade) as Units[];
      const upgradedUnits = factionUpgrades.reduce((acc, key) => {
        if (upgraded[key]) {
          acc[key] = factionUpgrade[key];
        }
        return acc;
      }, {} as UnitCombat);
      return deepmerge(initialCombat, upgradedUnits);
    }
    return initialCombat;
  }, [upgraded, factionUpgrade, calculatedBespokeCombat, faction]);

  const defaultSelectedAdditionalUnits = useMemo(() => {
    return FACTION_ADDITIONAL_COMBAT_UNITS[faction].reduce(
      (acc, additionalCombat) => {
        acc[additionalCombat] = false;
        return acc;
      },
      {} as Record<AdditionalCombatUnit, boolean>
    );
  }, [faction]);

  const [selectedAdditionalCombatUnit, setSelectedAdditionalCombatUnit] =
    useState(defaultSelectedAdditionalUnits);

  const onAdditionalCombatUnitSelected = useCallback(
    (addCombat: AdditionalCombatUnit) => {
      setSelectedAdditionalCombatUnit((prevState) => ({
        ...prevState,
        [addCombat]: !prevState[addCombat],
      }));
    },
    []
  );

  const [showCombatModal, setShowCombatModal] = useState(false);

  const onClear = useCallback(() => {
    setNumUnits({ ...DEFAULT_NUM_UNITS });
    setSelectedAdditionalCombatUnit(defaultSelectedAdditionalUnits);
  }, [defaultSelectedAdditionalUnits]);

  const unitCombatList = useMemo(() => {
    const unitCombats: UnitCombatDetailsList = [
      {
        unitCombat: combat,
        numUnits,
      },
    ];
    const additionalCombatUnits = Object.keys(
      selectedAdditionalCombatUnit
    ) as AdditionalCombatUnit[];

    additionalCombatUnits.forEach((combatUnit) => {
      if (selectedAdditionalCombatUnit[combatUnit]) {
        const additionalCombat = ADDITIONAL_UNIT_COMBAT[combatUnit];
        if (additionalCombat) {
          const unitCombat = {
            ...EMPTY_COMBAT_STRENGTH,
            ...additionalCombat,
          };
          const unitCombatKeys = Object.keys(unitCombat) as Units[];
          const additionalNumUnits = unitCombatKeys.reduce((acc, unitKey) => {
            acc[unitKey] = Object.keys(unitCombat[unitKey]).length > 0 ? 1 : 0;
            return acc;
          }, {} as NumUnits);
          unitCombats.push({
            unitCombat,
            numUnits: additionalNumUnits,
          });
        }
      }
    });

    return unitCombats;
  }, [combat, numUnits, selectedAdditionalCombatUnit]);

  const onBespokeCombatChanged = (unit: Units) => (value: number) => {
    setBespokeCombat((prevValue) => {
      return {
        ...prevValue,
        [unit]: {
          ...prevValue?.[unit],
          number: value,
        },
      };
    });
  };

  return (
    <>
      <Container faction={faction}>
        <FactionLabel>
          <Image
            alt={faction}
            src={`/images/symbols/${faction}.png`}
            width={40}
            height={40}
          />
          <FactionHeading>{FACTION_NAMES[faction]}</FactionHeading>
        </FactionLabel>
        <Header>
          <Link href="/">
            <a>
              <BackButton>Back</BackButton>
            </a>
          </Link>
          <div style={{ flex: 1 }} />
          <ClearButton onClick={onClear}>Clear</ClearButton>
        </Header>
        <Header>
          <HeaderWrapper>
            {FACTION_ADDITIONAL_COMBAT_UNITS[faction].map(
              (additionalCombat) => (
                <HeaderButtonContainer key={additionalCombat}>
                  <SelectableButton
                    highlightColor="lightblue"
                    selected={selectedAdditionalCombatUnit[additionalCombat]}
                    onClick={() =>
                      onAdditionalCombatUnitSelected(additionalCombat)
                    }
                  >
                    {additionalCombat}
                  </SelectableButton>
                </HeaderButtonContainer>
              )
            )}
          </HeaderWrapper>
        </Header>
        <ScrollContainer>
          <UnitRow
            limit={combat.Flagship.totalUnits}
            rolls={calculateRolls("spaceCombat", combat.Flagship)}
            bespokeCombat={bespokeCombat?.Flagship}
            onBespokeCombatApplied={onBespokeCombatChanged("Flagship")}
            combat={calculateCombat("spaceCombat", combat.Flagship)}
            numUnits={numUnits.Flagship}
            setNumUnits={_setNumUnits("Flagship")}
          >
            <UnitIcon
              unit="Flagship"
              faction={faction}
              hideUpgrade={!(Object.keys(factionUpgrade.Flagship).length > 0)}
              width={60}
              upgraded={upgraded.Flagship}
              onUpgraded={_setUpgraded("Flagship")}
            />
          </UnitRow>
          <UnitRow
            limit={combat.War_Sun.totalUnits}
            rolls={calculateRolls("spaceCombat", combat.War_Sun)}
            bespokeCombat={bespokeCombat?.War_Sun}
            onBespokeCombatApplied={onBespokeCombatChanged("War_Sun")}
            combat={calculateCombat("spaceCombat", combat.War_Sun)}
            numUnits={numUnits.War_Sun}
            setNumUnits={_setNumUnits("War_Sun")}
          >
            <UnitIcon
              unit="War_Sun"
              width={50}
              faction={faction}
              upgraded={upgraded.War_Sun}
              hideUpgrade={!(Object.keys(factionUpgrade.War_Sun).length > 0)}
              onUpgraded={_setUpgraded("War_Sun")}
            />
          </UnitRow>
          <UnitRow
            limit={combat.Dreadnought.totalUnits}
            rolls={calculateRolls("spaceCombat", combat.Dreadnought)}
            bespokeCombat={bespokeCombat?.Dreadnought}
            onBespokeCombatApplied={onBespokeCombatChanged("Dreadnought")}
            combat={calculateCombat("spaceCombat", combat.Dreadnought)}
            numUnits={numUnits.Dreadnought}
            setNumUnits={_setNumUnits("Dreadnought")}
          >
            <UnitIcon
              unit="Dreadnought"
              width={65}
              faction={faction}
              upgraded={upgraded.Dreadnought}
              hideUpgrade={
                !(Object.keys(factionUpgrade.Dreadnought).length > 0)
              }
              onUpgraded={_setUpgraded("Dreadnought")}
            />
          </UnitRow>
          <UnitRow
            limit={combat.Cruiser.totalUnits}
            rolls={calculateRolls("spaceCombat", combat.Cruiser)}
            bespokeCombat={bespokeCombat?.Cruiser}
            onBespokeCombatApplied={onBespokeCombatChanged("Cruiser")}
            combat={calculateCombat("spaceCombat", combat.Cruiser)}
            numUnits={numUnits.Cruiser}
            setNumUnits={_setNumUnits("Cruiser")}
          >
            <UnitIcon
              unit="Cruiser"
              width={60}
              faction={faction}
              upgraded={upgraded.Cruiser}
              hideUpgrade={!(Object.keys(factionUpgrade.Cruiser).length > 0)}
              onUpgraded={_setUpgraded("Cruiser")}
            />
          </UnitRow>
          <UnitRow
            limit={combat.Destroyer.totalUnits}
            rolls={calculateRolls("spaceCombat", combat.Destroyer)}
            bespokeCombat={bespokeCombat?.Destroyer}
            onBespokeCombatApplied={onBespokeCombatChanged("Destroyer")}
            combat={calculateCombat("spaceCombat", combat.Destroyer)}
            numUnits={numUnits.Destroyer}
            setNumUnits={_setNumUnits("Destroyer")}
          >
            <UnitIcon
              unit="Destroyer"
              width={40}
              faction={faction}
              upgraded={upgraded.Destroyer}
              hideUpgrade={!(Object.keys(factionUpgrade.Destroyer).length > 0)}
              onUpgraded={_setUpgraded("Destroyer")}
            />
          </UnitRow>
          <UnitRow
            rolls={calculateRolls("spaceCombat", combat.Carrier)}
            bespokeCombat={bespokeCombat?.Carrier}
            onBespokeCombatApplied={onBespokeCombatChanged("Carrier")}
            combat={calculateCombat("spaceCombat", combat.Carrier)}
            limit={4}
            numUnits={numUnits.Carrier}
            setNumUnits={_setNumUnits("Carrier")}
          >
            <UnitIcon
              unit="Carrier"
              width={50}
              faction={faction}
              upgraded={upgraded.Carrier}
              hideUpgrade={!(Object.keys(factionUpgrade.Carrier).length > 0)}
              onUpgraded={_setUpgraded("Carrier")}
            />
          </UnitRow>
          <UnitRow
            rolls={calculateRolls("spaceCombat", combat.Fighter)}
            bespokeCombat={bespokeCombat?.Fighter}
            onBespokeCombatApplied={onBespokeCombatChanged("Fighter")}
            combat={calculateCombat("spaceCombat", combat.Fighter.spaceCombat)}
            numUnits={numUnits.Fighter}
            setNumUnits={_setNumUnits("Fighter")}
          >
            <UnitIcon
              unit="Fighter"
              width={30}
              faction={faction}
              upgraded={upgraded.Fighter}
              hideUpgrade={!(Object.keys(factionUpgrade.Fighter).length > 0)}
              onUpgraded={_setUpgraded("Fighter")}
            />
          </UnitRow>
          <UnitRow
            rolls={calculateRolls("spaceCannon", combat.PDS)}
            bespokeCombat={bespokeCombat?.PDS}
            onBespokeCombatApplied={onBespokeCombatChanged("PDS")}
            combat={calculateCombat("spaceCannon", combat.PDS)}
            limit={6}
            numUnits={numUnits.PDS}
            setNumUnits={_setNumUnits("PDS")}
          >
            <UnitIcon
              faction={faction}
              unit="PDS"
              width={30}
              upgraded={upgraded.PDS}
              hideUpgrade={!(Object.keys(factionUpgrade.PDS).length > 0)}
              onUpgraded={_setUpgraded("PDS")}
            />
          </UnitRow>
          <UnitRow
            limit={combat.Mech.totalUnits}
            rolls={calculateRolls("groundCombat", combat.Mech)}
            bespokeCombat={bespokeCombat?.Mech}
            onBespokeCombatApplied={onBespokeCombatChanged("Mech")}
            combat={calculateCombat("groundCombat", combat.Mech)}
            numUnits={numUnits.Mech}
            setNumUnits={_setNumUnits("Mech")}
          >
            <UnitIcon
              unit="Mech"
              width={30}
              faction={faction}
              upgraded={upgraded.Mech}
              hideUpgrade={!(Object.keys(factionUpgrade.Mech).length > 0)}
              onUpgraded={_setUpgraded("Mech")}
            />
          </UnitRow>
          <UnitRow
            rolls={calculateRolls("groundCombat", combat.Infantry)}
            bespokeCombat={bespokeCombat?.Infantry}
            onBespokeCombatApplied={onBespokeCombatChanged("Infantry")}
            combat={calculateCombat("groundCombat", combat.Infantry)}
            numUnits={numUnits.Infantry}
            setNumUnits={_setNumUnits("Infantry")}
          >
            <UnitIcon
              unit="Infantry"
              width={30}
              faction={faction}
              upgraded={upgraded.Infantry}
              hideUpgrade={!(Object.keys(factionUpgrade.Infantry).length > 0)}
              onUpgraded={_setUpgraded("Infantry")}
            />
          </UnitRow>
          <UnitRow
            limit={combat.Space_Dock.totalUnits}
            rolls={calculateRolls("spaceCombat", combat.Space_Dock)}
            bespokeCombat={bespokeCombat?.Space_Dock}
            onBespokeCombatApplied={onBespokeCombatChanged("Space_Dock")}
            combat={calculateCombat("spaceCombat", combat.Space_Dock)}
            numUnits={numUnits.Space_Dock}
            setNumUnits={_setNumUnits("Space_Dock")}
          >
            <UnitIcon
              unit="Space_Dock"
              width={30}
              faction={faction}
              upgraded={upgraded.Space_Dock}
              hideUpgrade={!(Object.keys(factionUpgrade.Space_Dock).length > 0)}
              onUpgraded={_setUpgraded("Space_Dock")}
            />
          </UnitRow>
        </ScrollContainer>
        <ButtonContainer>
          <StyledButton onClick={() => setShowCombatModal(true)}>
            Combat
          </StyledButton>
        </ButtonContainer>
      </Container>
      <CombatModal
        shouldShow={showCombatModal}
        unitCombatList={unitCombatList}
        faction={faction}
        numUnits={numUnits}
        onClose={() => setShowCombatModal(false)}
      />
    </>
  );
};

export default Faction;
