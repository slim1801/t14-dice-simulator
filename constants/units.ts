import { NumUnits, UnitCombat, UnitCombatAbilities, Units } from "../types";

export const UNIT_LIST: Units[] = [
  "Flagship",
  "War_Sun",
  "Dreadnought",
  "Cruiser",
  "Destroyer",
  "Carrier",
  "Fighter",
  "PDS",
  "Mech",
  "Infantry",
];

export const EMPTY_COMBAT_STRENGTH: UnitCombat = {
  Flagship: {},
  War_Sun: {},
  Dreadnought: {},
  Cruiser: {},
  Destroyer: {},
  Carrier: {},
  Fighter: {},
  PDS: {},
  Mech: {},
  Infantry: {},
};

export const DEFAULT_UNIT_COMBAT_STRENGTH: UnitCombat = {
  Flagship: {},
  War_Sun: {},
  Dreadnought: {
    spaceCombat: {
      combat: 5,
    },
    bombardment: {
      combat: 5,
    },
  },
  Cruiser: {
    spaceCombat: {
      combat: 7,
    },
  },
  Destroyer: {
    spaceCombat: {
      combat: 9,
    },
    antiFighterBarrage: {
      combat: 9,
      rolls: 2,
    },
  },
  Carrier: {
    spaceCombat: {
      combat: 9,
    },
  },
  Fighter: {
    spaceCombat: {
      combat: 9,
    },
  },
  PDS: {
    spaceCannon: {
      combat: 6,
    },
    groundSpaceCannon: {
      combat: 6,
    },
  },
  Mech: {
    groundCombat: {
      combat: 6,
    },
  },
  Infantry: {
    groundCombat: {
      combat: 8,
    },
  },
};

export const DEFAULT_UNIT_UPGRADE_COMBAT: UnitCombat = {
  Flagship: {},
  War_Sun: {
    spaceCombat: {
      combat: 3,
      rolls: 3,
    },
    bombardment: {
      rolls: 3,
      combat: 3,
    },
  },
  Dreadnought: {
    spaceCombat: {
      combat: 5,
    },
    bombardment: {
      combat: 5,
    },
  },
  Cruiser: {
    spaceCombat: {
      combat: 6,
    },
  },
  Destroyer: {
    spaceCombat: {
      combat: 8,
    },
    antiFighterBarrage: {
      combat: 6,
      rolls: 3,
    },
  },
  Carrier: {
    spaceCombat: {
      combat: 9,
    },
  },
  Fighter: {
    spaceCombat: {
      combat: 8,
    },
  },
  PDS: {
    spaceCannon: {
      combat: 5,
    },
    groundSpaceCannon: {
      combat: 5,
    },
  },
  Mech: {},
  Infantry: {
    groundCombat: {
      combat: 7,
    },
  },
};

export const UNIT_COMBAT_ABILITIES: UnitCombatAbilities = {
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
    Flagship: {
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
  },
  Nekro: {
    Flagship: {
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
  },
  Sardakk: {
    Flagship: {
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
  },
  "Jol-Nar": {
    Mech: {
      combatEvalFunc: (unitCombat?: UnitCombat) => {
        if (unitCombat) {
          return {
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
  },
  Winnu: null,
  Xxcha: null,
  Yin: null,
  Yssaril: null,
  Argent: null,
  Empyrean: null,
  Mahact: {
    Flagship: {
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
  },
  NaazRokha: {
    Flagship: {
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
  },
  Nomad: null,
  Titans: null,
  Cabal: null,
};
