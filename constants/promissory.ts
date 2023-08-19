import { CombatEvalFunc, PromissoryNotes, UnitCombat } from "../types";
import { optimisedRoll } from "../utils/combat";
import { UNIT_LIST } from "./units";

export const PROMISSORY_NOTES: PromissoryNotes[] = [
  "War Funding",
  "Strike Wing Ambuscade",
  "Tekklar Legion",
];

export const PROMISSORY_NOTE_COMBAT: Record<PromissoryNotes, CombatEvalFunc> = {
  "War Funding": () => {
    return UNIT_LIST.reduce((acc, val) => {
      acc[val] = {
        spaceCombat: {
          rerollMisses: true,
        },
      };
      return acc;
    }, {} as Partial<UnitCombat>);
  },
  "Strike Wing Ambuscade": optimisedRoll(
    ["bombardment", "antiFighterBarrage", "spaceCannon", "groundSpaceCannon"],
    [1]
  ),
  "Tekklar Legion": () => {
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
};
