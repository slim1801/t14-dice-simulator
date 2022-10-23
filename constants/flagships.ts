import { FactionFlagships, UnitCombat } from "../types";

export const FACTION_FLAGSHIPS: FactionFlagships = {
  Arborec: null,
  Barony: null,
  Saar: null,
  Muaat: null,
  Hacan: {
    name: "Wrath of Kenara",
    combatFunc: () => ({
      Flagship: {
        spaceCombat: {
          combatMod: [1],
        },
      },
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
    }),
  },
  Sol: null,
  Ghosts: null,
  L1Z1X: null,
  Mentak: null,
  Naalu: {
    name: "Matriarch",
    combatFunc: (unitCombat?: UnitCombat) => {
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
    name: "The Alastoir",
    combatFunc: (unitCombat?: UnitCombat) => {
      if (unitCombat) {
        return {
          Mech: {
            spaceCombat: { ...unitCombat.Mech.groundCombat },
          },
          Infantry: {
            spaceCombat: { ...unitCombat.Mech.groundCombat },
          },
        };
      }
      return null;
    },
  },
  Sardakk: {
    name: "C'Morran N'orr",
    combatFunc: (unitCombat?: UnitCombat) => {
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
    combatFunc: (unitCombat?: UnitCombat) => {
      if (unitCombat) {
        return {
          Flagship: {
            spaceCombat: {
              combatMod: [1],
            },
          },
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
          Fighter: {
            spaceCombat: {
              combatMod: [1],
            },
          },
          Mech: {
            groundCombat: {
              combatMod: [1],
            },
          },
          Infantry: {
            groundCombat: {
              combatMod: [1],
            },
          },
        };
      }
      return null;
    },
  },
  NaazRokha: {
    name: "Visz El Vir",
    combatFunc: (unitCombat?: UnitCombat) => {
      if (unitCombat) {
        return {
          Mech: {
            groundCombat: {
              rollMod: [1],
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
