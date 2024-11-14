import {
  CombatEvalFunc,
  CombatTechnology,
  DSFactionExclusiveUnitCombatTechnology,
  FactionExclusiveTechnology,
  FactionExclusiveUnitCombatTechnology,
  FactionTechnologies,
  UnitCombat,
  Units,
} from "../types";
import { optimisedRoll } from "../utils/combat";
import { ALL_FACTIONS } from "./factions";

export const FACTION_TECHNOLOGY: FactionTechnologies = ALL_FACTIONS.reduce(
  (acc, faction) => {
    acc[faction] = [
      { name: "Antimass Deflectors", type: "Propulsion" },
      { name: "Plasma Scoring", type: "Warfare" },
    ];
    return acc;
  },
  {} as FactionTechnologies
);

export const TECHNOLOGY_COMBAT: Record<CombatTechnology, CombatEvalFunc> = {
  "Antimass Deflectors": (
    allUnitCombats?: UnitCombat[],
    unitCombatIndex?: number
  ) => {
    const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
    const moddedCombat: Partial<UnitCombat> | null = {};

    if (unitCombat) {
      const units = Object.keys(unitCombat) as Units[];
      units.reduce((acc, unit) => {
        if (unitCombat[unit].spaceCannon?.combat) {
          acc[unit] = {
            ...(unitCombat[unit].spaceCannon?.combat && {
              spaceCannon: { combatMod: [-1] },
            }),
            ...(unitCombat[unit].groundSpaceCannon?.combat && {
              groundSpaceCannon: { combatMod: [-1] },
            }),
          };
        }
        return acc;
      }, moddedCombat);
    }
    return moddedCombat;
  },
  "Plasma Scoring": optimisedRoll(
    ["bombardment", "antiFighterBarrage", "spaceCannon", "groundSpaceCannon"],
    [1]
  ),
};

export const FACTION_EXCLUSIVE_TECHNOLOGY: FactionExclusiveUnitCombatTechnology[] =
  [
    "Spec Ops II",
    "Super-Dreadnought II",
    "Hybrid Crystal Fighter II",
    "Exotrireme II",
    "Strike Wing Alpha II",
    "Memoria II",
    "Hel Titan II",
  ];

export const DS_FACTION_EXCLUSIVE_TECHNOLOGY: DSFactionExclusiveUnitCombatTechnology[] =
  [
    "Aegis II",
    "Trade Port II",
    "Unholy Abomination II",
    "Corsair II",
    "Heavy Bomber II",
    "Shattered Sky II",
    "Gauss Cannon II",
    "Voidflare Warden II",
    "Terrafactory II",
    "Blockade Runner II",
    "Raider II",
    "Lancer Dreadnought II",
    "Impactor II",
    "Star Dragon II",
    "Sabre II",
  ];
