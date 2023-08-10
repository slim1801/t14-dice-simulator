import {
  CombatEvalFunc,
  FactionExclusiveAbilities,
  FactionExclusives,
} from "../types";
import { ALL_FACTIONS } from "./factions";

export const FACTION_EXCLUSIVE_ABILITIES: FactionExclusiveAbilities =
  ALL_FACTIONS.reduce((acc, faction) => {
    if (faction === "Nekro") {
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
  "Ul The Progenitor": () => {
    return {
      PDS: {
        spaceCannon: {
          additional: [
            {
              combat: 5,
              rolls: 3,
            },
          ],
        },
        groundSpaceCannon: {
          additional: [
            {
              combat: 5,
              rolls: 3,
            },
          ],
        },
      },
    };
  },
};
