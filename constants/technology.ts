import {
  CombatEvalFuncState,
  CombatTechnology,
  FactionExclusiveTechnology,
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

export const TECHNOLOGY_COMBAT: Record<CombatTechnology, CombatEvalFuncState> =
  {
    "Antimass Deflectors": {
      combatEvalFunc: (unitCombat?: UnitCombat) => {
        const moddedCombat: Partial<UnitCombat> | null = {};
        if (unitCombat) {
          const units = Object.keys(unitCombat) as Units[];
          units.reduce((acc, unit) => {
            if (unitCombat[unit].spaceCannon?.combat) {
              acc[unit] = {
                ...(unitCombat[unit].spaceCannon?.combat && {
                  spaceCannon: { combatMod: [-1] },
                }),
              };
            }
            return acc;
          }, moddedCombat);
        }
        return moddedCombat;
      },
    },
    "Plasma Scoring": {
      combatEvalFunc: optimisedRoll(
        [
          "bombardment",
          "antiFighterBarrage",
          "spaceCannon",
          "groundSpaceCannon",
        ],
        [1]
      ),
    },
  };

export const FACTION_EXCLUSIVE_TECHNOLOGY: FactionExclusiveTechnology[] = [
  "Spec Ops II",
  "Super-Dreadnought II",
  "Hybrid Crystal Fighter II",
  "Exotrireme II",
  "Strike Wing Alpha II",
  "Supercharge",
  "Memoria II",
  "Hel Titan II",
];
