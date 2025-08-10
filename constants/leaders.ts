import {
  CombatLeaderAbilities,
  CombatEvalFunc,
} from "../types";
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
    const unitAbilities = {
      bombardment: {
        rerollMisses: true,
      },
      antiFighterBarrage: {
        rerollMisses: true,
      },
      spaceCannon: {
        rerollMisses: true,
      },
      groundSpaceCannon: {
        rerollMisses: true,
      },
    };

    return {
      Flagship: unitAbilities,
      War_Sun: unitAbilities,
      Carrier: unitAbilities,
      Cruiser: unitAbilities,
      Dreadnought: unitAbilities,
      Destroyer: unitAbilities,
      PDS: unitAbilities,
      Mech: unitAbilities,
      Infantry: unitAbilities,
    };
  },
  "Trrakan Aun Zulok": optimisedRoll(
    ["bombardment", "antiFighterBarrage", "spaceCannon", "groundSpaceCannon"],
    [1]
  ),
};
