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
  additional?: CombatDetails[];
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
};

export interface UnitHit {
  hit: boolean;
  roll: number;
  combatStrength: number;
}

export interface UnitRoll {
  combat?: number;
  rolls: number[];
}

export type NumUnits = Record<Units, number>;
export type UnitUpgraded = Record<Units, boolean>;
export type UnitCombat = Record<Units, Combat>;
export type UnitRolls = Record<Units, UnitRoll[]>;
export type UnitHits = Record<Units, UnitHit[][]>;
export type TechnologyCombat = Record<CombatTechnology, UnitCombat>;

export type CombatTechnology =
  | "Antimass Deflectors"
  | "Plasma Scoring"
  | "Supercharge";
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

export type FactionTechnologies = Record<Factions, Technology[]>;

export type CombatLeaderAbilities =
  | "Viscount Unlenn"
  | "Rickar Rickani"
  | "Trrakan Aun Zulok";
export type FactionLeaderAbilities = Record<Factions, CombatLeaderAbilities[]>;

export type CombatAgendaCards = "Prophecy of Ixth";

export type Flagships =
  | "Wrath of Kenara"
  | "Matriarch"
  | "The Alastoir"
  | "C'Morran N'orr"
  | "Arvicon Rex"
  | "Visz El Vir";
interface Flagship {
  name: Flagships;
  combatFunc: CombatEvalFunc;
}

export type FactionFlagships = Record<Factions, Flagship | null>;
