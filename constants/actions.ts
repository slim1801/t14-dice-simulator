import {
  CombatActionCards,
  CombatEvalFunc,
  NumUnits,
  UnitCombat,
  Units,
} from "../types";
import { combatModFunc } from "../utils/combat";

export const COMBAT_ACTION_CARDS: CombatActionCards[] = [
  "Bunker",
  "Fighter Prototype",
  "Morale Boost",
  "Blitz",
];

export const ACTION_COMBAT: Record<CombatActionCards, CombatEvalFunc> = {
  Bunker: (allUnitCombats?: UnitCombat[], unitCombatIndex?: number) => {
    const unitCombat = allUnitCombats?.[unitCombatIndex || 0];

    const moddedCombat: Partial<UnitCombat> | null = {};
    if (unitCombat) {
      const units = Object.keys(unitCombat) as Units[];
      units.reduce((acc, unit) => {
        if (unitCombat[unit].bombardment?.combat) {
          acc[unit] = {
            bombardment: {
              ...unitCombat[unit].bombardment,
              combatMod: [-4],
            },
          };
        }
        return acc;
      }, moddedCombat);
    }
    return moddedCombat;
  },
  "Fighter Prototype": () => {
    const moddedCombat: Partial<UnitCombat> = {
      Fighter: {
        spaceCombat: {
          combatMod: [2],
        },
      },
    };
    return moddedCombat;
  },
  "Morale Boost": combatModFunc([1]),
  Blitz: (
    allUnitCombats?: UnitCombat[],
    unitCombatIndex?: number,
    numUnits?: NumUnits
  ) => {
    const unitCombat = allUnitCombats?.[unitCombatIndex || 0];

    const moddedCombat: Partial<UnitCombat> | null = {};
    if (unitCombat) {
      const units = Object.keys(unitCombat) as Units[];
      units.reduce((acc, unit) => {
        const hasSpaceCombat = unitCombat[unit].spaceCombat?.combat;
        const hasBombardment = unitCombat[unit].bombardment?.combat;
        if (hasSpaceCombat && !hasBombardment && unit !== "Fighter") {
          acc[unit] = {
            bombardment: {
              combat: 6,
              rolls: 1,
              ...(numUnits?.[unit] !== undefined && {
                numUnitsMod: [numUnits[unit]],
              }),
            },
          };
        }
        return acc;
      }, moddedCombat);
    }
    return moddedCombat;
  },
};
