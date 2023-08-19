import { CombatAgendaCards, CombatEvalFunc } from "../types";

export const AGENDAS: CombatAgendaCards[] = ["Prophecy of Ixth"];

export const AGENDA_COMBAT: Record<CombatAgendaCards, CombatEvalFunc> = {
  "Prophecy of Ixth": () => {
    return {
      Fighter: {
        spaceCombat: {
          combatMod: [1],
        },
      },
    };
  },
};
