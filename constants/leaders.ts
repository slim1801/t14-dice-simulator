import {
  CombatLeaderAbilities,
  CombatEvalFunc,
  FactionLeaderAbilities,
} from "../types";
import { combatModFunc, optimisedRoll } from "../utils/combat";
import { ALL_FACTIONS } from "./factions";

export const FACTION_LEADER_ABILITIES: FactionLeaderAbilities =
  ALL_FACTIONS.reduce((acc, faction) => {
    if (faction === "Barony") {
      acc[faction] = ["Viscount Unlenn"];
    } else if (faction === "Winnu") {
      acc[faction] = ["Rickar Rickani"];
    } else if (faction === "Argent") {
      acc[faction] = ["Trrakan Aun Zulok"];
    } else {
      acc[faction] = [];
    }
    return acc;
  }, {} as FactionLeaderAbilities);

export const LEADER_ABILITIES_COMBAT: Record<
  CombatLeaderAbilities,
  CombatEvalFunc
> = {
  "Viscount Unlenn": combatModFunc([1]),
  "Rickar Rickani": combatModFunc([2]),
  "Trrakan Aun Zulok": optimisedRoll(
    ["bombardment", "antiFighterBarrage"],
    [1]
  ),
};
