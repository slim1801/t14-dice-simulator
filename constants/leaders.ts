import { CombatLeaderAbilities, CombatEvalFunc } from "../types";
import { combatModFunc, optimisedRoll } from "../utils/combat";

export const FACTION_COMBAT_LEADERS: CombatLeaderAbilities[] = [
  "Viscount Unlenn",
  "Rickar Rickani",
  "Evelyn Delouis",
  "Trrakan Aun Zulok",
  "Ta Zern",
];

export const LEADER_ABILITIES_COMBAT: Record<
  CombatLeaderAbilities,
  CombatEvalFunc
> = {
  "Viscount Unlenn": optimisedRoll(["spaceCombat"], [1]),
  "Evelyn Delouis": optimisedRoll(["groundCombat"], [1]),
  "Rickar Rickani": combatModFunc([2]),
  "Ta Zern": () => {
    return {
      War_Sun: {
        bombardment: {
          rerollMisses: true,
        },
      },
      Dreadnought: {
        bombardment: {
          rerollMisses: true,
        },
      },
      Destroyer: {
        antiFighterBarrage: {
          rerollMisses: true,
        },
      },
      PDS: {
        spaceCannon: {
          rerollMisses: true,
        },
        groundSpaceCannon: {
          rerollMisses: true,
        },
      },
    };
  },
  "Trrakan Aun Zulok": optimisedRoll(
    ["bombardment", "antiFighterBarrage", "spaceCannon", "groundSpaceCannon"],
    [1]
  ),
};
