import {
  CombatEvalFunc,
  FactionExclusiveAbilities,
  FactionExclusives,
  UnitCombat,
} from "../types";
import { ALL_FACTIONS } from "./factions";
import { UNIT_LIST } from "./units";

export const FACTION_EXCLUSIVE_ABILITIES: FactionExclusiveAbilities =
  ALL_FACTIONS.reduce((acc, faction) => {
    if (faction === "Barony") {
      acc[faction] = ["Munitions Reserves"];
    } else if (faction === "Nekro") {
      acc[faction] = ["Mordred"];
    } else {
      acc[faction] = [];
    }
    return acc;
  }, {} as FactionExclusiveAbilities);

export const FACTION_EXCLUSIVE_ABILITIES_COMBAT: Record<
  FactionExclusives,
  CombatEvalFunc
> = {
  Mordred: () => {
    return {
      Mech: {
        groundCombat: {
          combatMod: [2],
        },
      },
    };
  },
  "Munitions Reserves": () => {
    return UNIT_LIST.reduce((acc, val) => {
      acc[val] = {
        spaceCombat: {
          rerollMisses: true,
        },
      };
      return acc;
    }, {} as Partial<UnitCombat>);
  },
};
