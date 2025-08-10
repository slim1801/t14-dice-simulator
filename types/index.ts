import { DiscordantStarsFactions } from "./discordantStars";

export type Units =
  | "Flagship"
  | "War_Sun"
  | "Cruiser"
  | "Dreadnought"
  | "Destroyer"
  | "Carrier"
  | "Fighter"
  | "PDS"
  | "Space_Dock"
  | "Mech"
  | "Infantry";

export type BasePokFactions =
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

export type Factions = BasePokFactions | DiscordantStarsFactions;

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
  additionalHitsFunc?: AdditionalCombatFunc;
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
} & {
  name?: string;
  totalUnits?: number;
};

export interface UnitHit {
  hit: boolean;
  roll: number;
  reroll?: number;
  name?: string;
  combatStrength: number;
  additionalHits?: number;
}

export interface UnitRoll {
  combat?: number;
  rolls: number[];
  name?: string;
  rerolls?: number[];
}

export interface UnitCombatDetails {
  unitCombat: UnitCombat;
  numUnits: NumUnits;
}

export type BespokeUnitCombat = Record<Units, BespokeCombat>;
export type BespokeCombat = Combat & {
  bespokeLabel?: string;
  number?: number;
};

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
export type UnitCombatDetailsList = UnitCombatDetails[];

export type CombatTechnology = "Antimass Deflectors" | "Plasma Scoring" | "Supercharge";
export type CombatActionCards =
  | "Bunker"
  | "Fighter Prototype"
  | "Morale Boost"
  | "Blitz";

export type CombatEvalFunc = (
  allUnitCombats?: UnitCombat[],
  unitCombatIndex?: number,
  numUnits?: NumUnits
) => Partial<UnitCombat> | null;

export type AdditionalCombatFunc = (
  roll?: number,
  reroll?: number
) => number | undefined;

export type TechnologyType = "Biotic" | "Propulsion" | "Cybernetic" | "Warfare";

export interface Technology {
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

export type DSFactionExclusiveUnitCombatTechnology =
  | "Aegis II"
  | "Trade Port II"
  | "Unholy Abomination II"
  | "Corsair II"
  | "Heavy Bomber II"
  | "Shattered Sky II"
  | "Gauss Cannon II"
  | "Voidflare Warden II"
  | "Terrafactory II"
  | "Blockade Runner II"
  | "Raider II"
  | "Lancer Dreadnought II"
  | "Impactor II"
  | "Star Dragon II"
  | "Sabre II"
  | "Raider II";

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
