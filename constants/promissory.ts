import { CombatEvalFuncState, PromissoryNotes, UnitCombat } from "../types";
import { optimisedRoll } from "../utils/combat";
import { UNIT_LIST } from "./units";

export const PROMISSORY_NOTES: PromissoryNotes[] = [
  "War Funding",
  "Strike Wing Ambuscade",
  "Tekklar Legion",
  "The Cavalry (Memoria)",
  "The Cavalry (Memoria II)",
];

export const PROMISSORY_NOTE_COMBAT: Record<
  PromissoryNotes,
  CombatEvalFuncState
> = {
  "War Funding": {
    combatEvalFunc: () => {
      return UNIT_LIST.reduce((acc, val) => {
        acc[val] = {
          spaceCombat: {
            rerollMisses: true,
          },
        };
        return acc;
      }, {} as Partial<UnitCombat>);
    },
  },
  "Strike Wing Ambuscade": {
    combatEvalFunc: optimisedRoll(
      ["bombardment", "antiFighterBarrage", "spaceCannon", "groundSpaceCannon"],
      [1]
    ),
  },
  "Tekklar Legion": {
    combatEvalFunc: () => {
      return {
        Infantry: {
          groundCombat: {
            combatMod: [1],
          },
        },
        Mech: {
          groundCombat: {
            combatMod: [1],
          },
        },
      };
    },
  },
  "The Cavalry (Memoria)": {
    additional: true,
    combatEvalFunc: () => {
      return {
        Flagship: {
          spaceCombat: {
            rolls: 2,
            combat: 7,
            numUnitsMod: [1],
            additional: true,
          },
          antiFighterBarrage: {
            rolls: 3,
            combat: 8,
            numUnitsMod: [1],
            additional: true,
          },
        },
      };
    },
  },
  "The Cavalry (Memoria II)": {
    additional: true,
    combatEvalFunc: () => {
      return {
        Flagship: {
          spaceCombat: {
            rolls: 2,
            combat: 5,
            numUnitsMod: [1],
            additional: true,
          },
          antiFighterBarrage: {
            rolls: 3,
            combat: 5,
            numUnitsMod: [1],
            additional: true,
          },
        },
      };
    },
  },
};
