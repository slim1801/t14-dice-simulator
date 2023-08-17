import { CombatAgendaCards, CombatEvalFuncState } from "../types";

export const AGENDAS: CombatAgendaCards[] = ["Prophecy of Ixth"];

export const AGENDA_COMBAT: Record<CombatAgendaCards, CombatEvalFuncState> = {
  "Prophecy of Ixth": {
    combatEvalFunc: () => {
      return {
        Fighter: {
          spaceCombat: {
            combatMod: [1],
          },
        },
      };
    },
  },
};
