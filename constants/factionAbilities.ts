import {
  CombatEvalFuncState,
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
    } else if (faction === "Titans") {
      acc[faction] = ["Ul The Progenitor"];
    } else {
      acc[faction] = [];
    }
    return acc;
  }, {} as FactionExclusiveAbilities);

export const FACTION_EXCLUSIVE_ABILITIES_COMBAT: Record<
  FactionExclusives,
  CombatEvalFuncState
> = {
  Mordred: {
    combatEvalFunc: () => {
      return {
        Mech: {
          groundCombat: {
            combatMod: [2],
          },
        },
      };
    },
  },
  "Munitions Reserves": {
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
  "Ul The Progenitor": {
    additional: true,
    combatEvalFunc: () => {
      return {
        PDS: {
          spaceCannon: {
            combat: 5,
            rolls: 3,
            numUnitsMod: [1],
            additional: true,
          },
          groundSpaceCannon: {
            combat: 5,
            rolls: 3,
            numUnitsMod: [1],
            additional: true,
          },
        },
      };
    },
  },
};
