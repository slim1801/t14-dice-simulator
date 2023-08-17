import {
  CombatActionCards,
  CombatEvalFuncState,
  UnitCombat,
  Units,
} from "../types";
import { combatModFunc } from "../utils/combat";

export const COMBAT_ACTION_CARDS: CombatActionCards[] = [
  "Bunker",
  "Experimental Battlestation",
  "Fighter Prototype",
  "Morale Boost",
  "Blitz",
];

export const ACTION_COMBAT: Record<CombatActionCards, CombatEvalFuncState> = {
  Bunker: {
    combatEvalFunc: (unitCombat?: UnitCombat) => {
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
  },
  "Fighter Prototype": {
    combatEvalFunc: () => {
      const moddedCombat: Partial<UnitCombat> = {
        Fighter: {
          spaceCombat: {
            combatMod: [2],
          },
        },
      };
      return moddedCombat;
    },
  },
  "Experimental Battlestation": {
    additional: true,
    combatEvalFunc: () => {
      const moddedCombat: Partial<UnitCombat> = {
        PDS: {
          spaceCannon: {
            combat: 5,
            rolls: 3,
          },
        },
      };
      return moddedCombat;
    },
  },
  "Morale Boost": { combatEvalFunc: combatModFunc([1]) },
  Blitz: {
    combatEvalFunc: (unitCombat?: UnitCombat, numUnits?) => {
      const moddedCombat: Partial<UnitCombat> | null = {};
      if (unitCombat) {
        const units = Object.keys(unitCombat) as Units[];
        units.reduce((acc, unit) => {
          const hasSpaceCombat = unitCombat[unit].spaceCombat?.combat;
          const hasBombardment = unitCombat[unit].bombardment?.combat;
          if (hasSpaceCombat && !hasBombardment && unit !== "Fighter") {
            acc[unit] = {
              bombardment: {
                additional: true,
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
  },
};
