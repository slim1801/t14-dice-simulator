import { Factions, UnitCombat } from "../types";

export const ALL_FACTIONS: Factions[] = [
  "Arborec",
  "Argent",
  "Barony",
  "Cabal",
  "Empyrean",
  "Ghosts",
  "Hacan",
  "Jol-Nar",
  "L1Z1X",
  "Mahact",
  "Mentak",
  "Muaat",
  "Naalu",
  "NaazRokha",
  "Nekro",
  "Nomad",
  "Saar",
  "Sardakk",
  "Sol",
  "Titans",
  "Winnu",
  "Xxcha",
  "Yin",
  "Yssaril",
];

type FactionType = {
  [key in Factions]: string;
};

export const FACTION_NAMES: FactionType = {
  Arborec: "The Arborec",
  Barony: "The Barony of Letnev",
  Saar: "The Clan of Saar",
  Muaat: "The Embers of Muaat",
  Hacan: "The Emirates of Hacan",
  Sol: "The Federation of Sol",
  Ghosts: "The Ghosts of Creuss",
  L1Z1X: "The L1Z1X Mindnet",
  Mentak: "The Mentak Coalition",
  Naalu: "The Naalu Collective",
  Nekro: "The Nekro Virus",
  Sardakk: "Sardakk N'orr",
  "Jol-Nar": "The Universities of Jol-Naar",
  Winnu: "The Winnu",
  Xxcha: "The Xxcha Kingdom",
  Yin: "The Yin Brotherhood",
  Yssaril: "The Yssaril Tribes",
  Argent: "The Argent Flight",
  Empyrean: "The Empyrean",
  Mahact: "The Mahact Gene-Sorcerers",
  NaazRokha: "The Naaz-Rokha Alliance",
  Nomad: "The Nomad",
  Titans: "The Titans of UI",
  Cabal: "The Vuil'Raith Cabal",
};

export const FACTION_COMBAT: Record<Factions, Partial<UnitCombat>> = {
  Arborec: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Barony: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
      bombardment: {
        combat: 5,
        rolls: 3,
      },
    },
  },
  Saar: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
      antiFighterBarrage: {
        combat: 6,
        rolls: 4,
      },
    },
  },
  Muaat: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
    War_Sun: {
      spaceCombat: {
        combat: 3,
        rolls: 3,
      },
      bombardment: {
        combat: 3,
        rolls: 3,
      },
    },
  },
  Hacan: {
    Flagship: {
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
    },
  },
  Sol: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
    Infantry: {
      groundCombat: {
        combat: 7,
      },
    },
    Carrier: {
      spaceCombat: {
        combat: 9,
      },
    },
  },
  Ghosts: {
    Flagship: {
      spaceCombat: {
        combat: 5,
      },
    },
  },
  L1Z1X: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
    Mech: {
      bombardment: {
        combat: 8,
      },
    },
  },
  Mentak: {
    Flagship: {
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
    },
  },
  Naalu: {
    Flagship: {
      spaceCombat: {
        combat: 9,
        rolls: 2,
      },
    },
    Fighter: {
      spaceCombat: {
        combat: 8,
      },
    },
  },
  Nekro: {
    Flagship: {
      spaceCombat: {
        combat: 9,
        rolls: 2,
      },
    },
  },
  Sardakk: {
    Flagship: {
      spaceCombat: {
        combat: 6,
        rolls: 2,
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
      bombardment: {
        combat: 4,
        rolls: 2,
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
    Infantry: {
      groundCombat: {
        combatMod: [1],
      },
    },
    Mech: {
      groundCombat: {
        combatMod: [1],
      },
    },
  },
  "Jol-Nar": {
    Flagship: {
      spaceCombat: {
        combat: 6,
        rolls: 2,
        combatMod: [-1],
      },
    },
    Cruiser: {
      spaceCombat: {
        combatMod: [-1],
      },
    },
    Dreadnought: {
      spaceCombat: {
        combatMod: [-1],
      },
    },
    Destroyer: {
      spaceCombat: {
        combatMod: [-1],
      },
    },
    Carrier: {
      spaceCombat: {
        combatMod: [-1],
      },
    },
    Fighter: {
      spaceCombat: {
        combatMod: [-1],
      },
    },
    Infantry: {
      groundCombat: {
        combatMod: [-1],
      },
    },
    Mech: {
      groundCombat: {
        combatMod: [-1],
      },
    },
  },
  Winnu: {
    Flagship: {
      spaceCombat: {
        combat: 7,
      },
    },
  },
  Xxcha: {
    Flagship: {
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
      spaceCannon: {
        combat: 5,
        rolls: 3,
      },
    },
    Mech: {
      spaceCannon: {
        combat: 8,
      },
    },
  },
  Yin: {
    Flagship: {
      spaceCombat: {
        combat: 9,
        rolls: 2,
      },
    },
  },
  Yssaril: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
  },
  Argent: {
    Flagship: {
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
    },
    Destroyer: {
      spaceCombat: {
        combat: 8,
      },
      antiFighterBarrage: {
        combat: 9,
        rolls: 2,
      },
    },
  },
  Empyrean: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
  },
  Mahact: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
  },
  NaazRokha: {
    Flagship: {
      spaceCombat: {
        combat: 9,
        rolls: 2,
      },
    },
    Mech: {
      spaceCombat: {
        combat: 8,
        rolls: 2,
      },
      groundCombat: {
        combat: 6,
        rolls: 2,
      },
    },
  },
  Nomad: {
    Flagship: {
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
      antiFighterBarrage: {
        combat: 8,
        rolls: 3,
      },
    },
  },
  Titans: {
    Flagship: {
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
    },
    Cruiser: {
      spaceCombat: {
        combat: 7,
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
  },
  Cabal: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
      bombardment: {
        combat: 5,
      },
    },
  },
};

export const FACTION_UPGRADE_COMBAT: Record<Factions, Partial<UnitCombat>> = {
  Arborec: {
    Infantry: {
      groundCombat: {
        combat: 7,
      },
    },
  },
  Barony: {},
  Saar: {},
  Muaat: {
    War_Sun: {
      spaceCombat: {
        combat: 3,
        rolls: 3,
      },
      bombardment: {
        combat: 3,
        rolls: 3,
      },
    },
  },
  Hacan: {},
  Sol: {
    Carrier: {
      spaceCombat: {
        combat: 9,
      },
    },
    Infantry: {
      groundCombat: {
        combat: 6,
      },
    },
  },
  Ghosts: {},
  L1Z1X: {
    Dreadnought: {
      spaceCombat: {
        combat: 4,
      },
      bombardment: {
        combat: 4,
      },
    },
  },
  Mentak: {},
  Naalu: {
    Fighter: {
      spaceCombat: {
        combat: 7,
      },
    },
  },
  Nekro: {},
  Sardakk: {},
  "Jol-Nar": {},
  Winnu: {},
  Xxcha: {},
  Yin: {},
  Yssaril: {},
  Argent: {
    Destroyer: {
      spaceCombat: {
        combat: 7,
      },
      antiFighterBarrage: {
        combat: 6,
        rolls: 3,
      },
    },
  },
  Empyrean: {},
  Mahact: {},
  NaazRokha: {},
  Nomad: {
    Flagship: {
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
      antiFighterBarrage: {
        combat: 5,
        rolls: 3,
      },
    },
  },
  Titans: {
    Cruiser: {
      spaceCombat: {
        combat: 6,
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
  },
  Cabal: {},
};
