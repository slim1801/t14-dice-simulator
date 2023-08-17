import { FactionFlagships, NumUnits, UnitCombat } from "../types";

export const FACTION_FLAGSHIPS: FactionFlagships = {
  Arborec: null,
  Barony: null,
  Saar: null,
  Muaat: null,
  Hacan: null,
  Sol: null,
  Ghosts: null,
  L1Z1X: null,
  Mentak: null,
  Naalu: {
    name: "Matriarch",
    combatEvalFunc: (unitCombat?: UnitCombat) => {
      if (unitCombat?.Fighter) {
        return {
          Fighter: {
            groundCombat: { ...unitCombat.Fighter.spaceCombat },
          },
        };
      }
      return null;
    },
  },
  Nekro: {
    name: "The Alastor",
    combatEvalFunc: (unitCombat?: UnitCombat) => {
      if (unitCombat) {
        return {
          Mech: {
            spaceCombat: { ...unitCombat.Mech.groundCombat },
          },
          Infantry: {
            spaceCombat: { ...unitCombat.Infantry.groundCombat },
          },
        };
      }
      return null;
    },
  },
  Sardakk: {
    name: "C'Morran N'orr",
    combatEvalFunc: (unitCombat?: UnitCombat) => {
      if (unitCombat) {
        return {
          War_Sun: {
            spaceCombat: {
              combatMod: [1],
            },
          },
          Dreadnought: {
            spaceCombat: {
              combatMod: [1],
            },
          },
          Cruiser: {
            spaceCombat: {
              combatMod: [1],
            },
          },
          Destroyer: {
            spaceCombat: {
              combatMod: [1],
            },
          },
          Carrier: {
            spaceCombat: {
              combatMod: [1],
            },
          },
        };
      }
      return null;
    },
  },
  "Jol-Nar": null,
  Winnu: null,
  Xxcha: null,
  Yin: null,
  Yssaril: null,
  Argent: null,
  Empyrean: null,
  Mahact: {
    name: "Arvicon Rex",
    selectable: true,
    combatEvalFunc: (unitCombat?: UnitCombat) => {
      if (unitCombat) {
        return {
          Flagship: {
            spaceCombat: {
              combatMod: [2],
            },
          },
          War_Sun: {
            spaceCombat: {
              combatMod: [2],
            },
          },
          Dreadnought: {
            spaceCombat: {
              combatMod: [2],
            },
          },
          Cruiser: {
            spaceCombat: {
              combatMod: [2],
            },
          },
          Destroyer: {
            spaceCombat: {
              combatMod: [2],
            },
          },
          Carrier: {
            spaceCombat: {
              combatMod: [2],
            },
          },
          Fighter: {
            spaceCombat: {
              combatMod: [2],
            },
          },
          Mech: {
            groundCombat: {
              combatMod: [2],
            },
          },
          Infantry: {
            groundCombat: {
              combatMod: [2],
            },
          },
        };
      }
      return null;
    },
  },
  NaazRokha: {
    name: "Visz El Vir",
    combatEvalFunc: (unitCombat?: UnitCombat, numUnits?: NumUnits) => {
      if (unitCombat) {
        const extraRolls = numUnits?.Mech || 0;
        return {
          Mech: {
            spaceCombat: {
              rollMod: [extraRolls],
            },
            groundCombat: {
              rollMod: [extraRolls],
            },
          },
        };
      }
      return null;
    },
  },
  Nomad: null,
  Titans: null,
  Cabal: null,
};
