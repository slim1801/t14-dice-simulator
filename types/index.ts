export type Units =
  | "Flagship"
  | "War_Sun"
  | "Cruiser"
  | "Dreadnought"
  | "Destroyer"
  | "Carrier"
  | "Fighter"
  | "PDS"
  | "Mech"
  | "Infantry";

export type Factions =
  | "Arborec"
  | "Argent"
  | "Barony"
  | "Cabal"
  | "Empyrean"
  | "Ghosts"
  | "Hacan"
  | "Jol-Nar"
  | "L1Z1X"
  | "Mahact"
  | "Mentak"
  | "Muaat"
  | "Naalu"
  | "NaazRokha"
  | "Nekro"
  | "Nomad"
  | "Saar"
  | "Sardakk"
  | "Sol"
  | "Titans"
  | "Winnu"
  | "Xxcha"
  | "Yin"
  | "Yssaril";

export interface CombatDetails {
  rolls?: number;
  rollMod?: number[];
  combat?: number;
  combatMod?: number[];
  additional?: boolean;
  rerollMisses?: boolean;
  numUnitsMod?: number[];

  name?: string;
  selectable?: boolean;
  combatEvalFunc?: CombatEvalFunc;
}

export type CombatType =
  | "spaceCannon"
  | "spaceCombat"
  | "antiFighterBarrage"
  | "bombardment"
  | "groundSpaceCannon"
  | "groundCombat";

export type Combat = {
  [key in CombatType]?: CombatDetails;
} & { name?: string };

export interface UnitHit {
  hit: boolean;
  roll: number;
  reroll?: number;
  name?: string;
  combatStrength: number;
}

export interface UnitRoll {
  combat?: number;
  rolls: number[];
  name?: string;
  rerolls?: number[];
}

export type NumUnits = Record<Units, number>;
export type UnitUpgraded = Record<Units, boolean>;
export type UnitCombat = Record<Units, Combat>;
export type UnitCombatAbilities = Record<
  Factions,
  Partial<Record<Units, CombatDetails>> | null
>;
export type UnitRolls = Record<Units, UnitRoll[]>;
export type UnitHits = Record<Units, UnitHit[][]>;
export type TechnologyCombat = Record<CombatTechnology, UnitCombat>;

export type CombatTechnology = "Antimass Deflectors" | "Plasma Scoring";
export type CombatActionCards =
  | "Bunker"
  | "Fighter Prototype"
  | "Morale Boost"
  | "Blitz";

export type CombatEvalFunc = (
  unitCombat?: UnitCombat,
  numUnits?: NumUnits
) => Partial<UnitCombat> | null;

export type TechnologyType = "Biotic" | "Propulsion" | "Cybernetic" | "Warfare";

interface Technology {
  name: CombatTechnology;
  type: TechnologyType;
}

export type FactionExclusiveUnitCombatTechnology =
  | "Spec Ops II"
  | "Super-Dreadnought II"
  | "Hybrid Crystal Fighter II"
  | "Exotrireme II"
  | "Strike Wing Alpha II"
  | "Memoria II"
  | "Hel Titan II";

export type FactionExclusiveCombatTechnology = "Supercharge";

export type FactionExclusiveTechnology =
  | FactionExclusiveCombatTechnology
  | FactionExclusiveUnitCombatTechnology;

export type FactionTechnologies = Record<Factions, Technology[]>;

export type FactionExclusives = "Munitions Reserves" | "Mordred";

export type CombatLeaderAbilities =
  | "Viscount Unlenn"
  | "Rickar Rickani"
  | "Evelyn Delouis"
  | "Trrakan Aun Zulok"
  | "Ta Zern";
export type FactionLeaderAbilities = Record<Factions, CombatLeaderAbilities[]>;
export type FactionExclusiveAbilities = Record<Factions, FactionExclusives[]>;

export type CombatAgendaCards = "Prophecy of Ixth";

export type Flagships =
  | "Wrath of Kenara"
  | "Matriarch"
  | "The Alastor"
  | "C'Morran N'orr"
  | "Arvicon Rex"
  | "Visz El Vir";

interface Flagship {
  name: Flagships;
  selectable?: boolean;
  combatEvalFunc: CombatEvalFunc;
}

export type FactionFlagships = Record<Factions, Flagship | null>;

interface UnitSpecialModifierDetails {
  name: Flagships;
  selectable?: boolean;
  combatEvalFunc: CombatEvalFunc;
}

export type UnitSpecialModifier = Partial<
  Record<Units, UnitSpecialModifierDetails>
>;
export type FactionUnitSpecialModifiers = Record<
  Factions,
  UnitSpecialModifier | null
>;

export type PromissoryNotes =
  | "War Funding"
  | "Strike Wing Ambuscade"
  | "Tekklar Legion";

export type AdditionalCombatUnit =
  | "Experimental Battlestation"
  | "Ul The Progenitor"
  | "The Cavalry (Memoria)"
  | "The Cavalry (Memoria II)";

export type FactionAdditionalCombatUnits = Record<
  Factions,
  AdditionalCombatUnit[]
>;
