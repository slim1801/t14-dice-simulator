import {
  CombatEvalFunc,
  CombatTechnology,
  FactionTechnologies,
  NumUnits,
  UnitCombat,
  Units,
} from "../types";
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
  "Antimass Deflectors": (unitCombat?: UnitCombat) => {
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
  "Plasma Scoring": (unitCombat?: UnitCombat, numUnits?: NumUnits) => {
    let bestCombat: Partial<UnitCombat> | null = null;
    if (unitCombat) {
      const units = Object.keys(unitCombat) as Units[];
      for (let i = 0; i < units.length; i++) {
        const unitKey = units[i];
        const _unitCombat = unitCombat[unitKey];
        if (
          _unitCombat.bombardment?.combat &&
          numUnits &&
          numUnits?.[unitKey] > 0
        ) {
          if (
            !bestCombat ||
            (bestCombat[unitKey]?.bombardment?.combat &&
              (bestCombat[unitKey]?.bombardment?.combat || 0) >
                _unitCombat.bombardment.combat)
          ) {
            bestCombat = {
              [unitKey]: {
                bombardment: {
                  ..._unitCombat.bombardment,
                  rollMod: [1],
                },
              },
            };
          }
        }
      }
    }
    return bestCombat;
  },
};
