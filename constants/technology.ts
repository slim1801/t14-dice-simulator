import {
  CombatEvalFunc,
  CombatTechnology,
  DSFactionExclusiveUnitCombatTechnology,
  FactionExclusiveTechnology,
  FactionTechnologies,
  Technology,
  UnitCombat,
  Units,
} from "../types";
import { combatModFunc, optimisedRoll } from "../utils/combat";
import { ALL_FACTIONS } from "./factions";

export const FACTION_TECHNOLOGY: FactionTechnologies = ALL_FACTIONS.reduce(
  (acc, faction) => {
    const techs: Technology[] = [
      { name: "Antimass Deflectors", type: "Propulsion" },
      { name: "X-89 Bacterial Weapon", type: "Biotic" },
      { name: "Plasma Scoring", type: "Warfare" },
    ];
    if (faction === "NaazRokha") {
      techs.push({ name: "Supercharge", type: "Warfare" });
    }
    acc[faction] = techs;
    return acc;
  },
  {} as FactionTechnologies
);

// additionalHitsFunc: (roll?: number, reroll?: number) => {
//   if (
//     (roll !== undefined && roll >= 9) ||
//     (reroll !== undefined && reroll >= 9)
//   ) {
//     return 2;
//   }
// },
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
    ["bombardment", "spaceCannon", "groundSpaceCannon"],
    [1]
  ),
  "X-89 Bacterial Weapon": (
    allUnitCombats?: UnitCombat[],
    unitCombatIndex?: number
  ) => {
    const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
    const moddedCombat: Partial<UnitCombat> | null = {};

    if (unitCombat) {
      const units = Object.keys(unitCombat) as Units[];
      units.reduce((acc, unit) => {
        acc[unit] = {
          ...(unitCombat[unit].groundCombat?.combat && {
            groundCombat: { doubleHits: true },
          }),
          ...(unitCombat[unit].bombardment?.combat && {
            bombardment: { doubleHits: true },
          }),
        };
        return acc;
      }, moddedCombat);
    }
    return moddedCombat;
  },
  Supercharge: combatModFunc([1]),
};

export const FACTION_EXCLUSIVE_TECHNOLOGY: FactionExclusiveTechnology[] = [
  "Spec Ops II",
  "Super-Dreadnought II",
  "Hybrid Crystal Fighter II",
  "Exotrireme II",
  "Strike Wing Alpha II",
  "Memoria II",
  "Hel Titan II",
  "Supercharge",
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
