import {
  AdditionalCombatUnit,
  CombatEvalFunc,
  FactionAdditionalCombatUnits,
} from "../types";
import { ALL_FACTIONS } from "./factions";

export const FACTION_ADDITIONAL_COMBAT_UNITS: FactionAdditionalCombatUnits =
  ALL_FACTIONS.reduce((acc, faction) => {
    acc[faction] = [
      "Experimental Battlestation",
      "The Cavalry (Memoria)",
      "The Cavalry (Memoria II)",
    ];
    if (faction === "Titans") {
      acc[faction].push("Ul The Progenitor");
    }
    return acc;
  }, {} as FactionAdditionalCombatUnits);

export const ADDITIONAL_UNIT_COMBAT: Record<
  AdditionalCombatUnit,
  CombatEvalFunc
> = {
  "Experimental Battlestation": () => {
    return {
      PDS: {
        name: "Experimental Battlestation",
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
  "The Cavalry (Memoria)": () => {
    return {
      Flagship: {
        name: "Memoria",
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
  "The Cavalry (Memoria II)": () => {
    return {
      Flagship: {
        name: "Memoria II",
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
  "Ul The Progenitor": () => {
    return {
      PDS: {
        name: "Ul The Progenitor",
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
};
