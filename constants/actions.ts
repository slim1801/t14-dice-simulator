import { CombatActionCards, CombatEvalFunc, UnitCombat, Units } from "../types";
import { combatModFunc } from "../utils/combat";

export const COMBAT_ACTION_CARDS: CombatActionCards[] = [
  "Bunker",
  "Fighter Prototype",
  "Morale Boost",
  "Blitz",
];

export const ACTION_COMBAT: Record<CombatActionCards, CombatEvalFunc> = {
  Bunker: (unitCombat?: UnitCombat) => {
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
  Blitz: (unitCombat?: UnitCombat) => {
    const moddedCombat: Partial<UnitCombat> | null = {};
    if (unitCombat) {
      const units = Object.keys(unitCombat) as Units[];
      units.reduce((acc, unit) => {
        if (unitCombat[unit].spaceCombat?.combat && unit !== "Fighter") {
          acc[unit] = {
            bombardment: {
              additional: [
                {
                  combat: 6,
                },
              ],
            },
          };
        }
        return acc;
      }, moddedCombat);
    }
    return moddedCombat;
  },
};
