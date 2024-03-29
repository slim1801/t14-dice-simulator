import {
  CombatEvalFunc,
  CombatTechnology,
  FactionUnitSpecialModifiers,
  Factions,
  NumUnits,
  UnitCombat,
} from "../types";
import { combatModFunc } from "../utils/combat";

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

export const FACTION_COLORS: FactionType = {
  Arborec:
    "grayscale(100%) sepia(52%) saturate(341%) hue-rotate(42deg) brightness(90%);",
  Barony:
    "grayscale(100%) sepia(40%) saturate(600%) hue-rotate(-50deg) contrast(200%);",
  Saar: "grayscale(100%) sepia(58%) saturate(492%) hue-rotate(350deg);",
  Muaat: "grayscale(100%) sepia(68%) saturate(646%) hue-rotate(338deg);",
  Hacan: "grayscale(100%) sepia(98%) saturate(562%) hue-rotate(340deg);",
  Sol: "grayscale(100%) sepia(40%) saturate(386%) hue-rotate(161deg);",
  Ghosts: "grayscale(100%) sepia(19%) saturate(718%) hue-rotate(159deg)",
  L1Z1X:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-50deg) brightness(0.6) contrast(2)",
  Mentak:
    "grayscale(100%) sepia(97%) saturate(864%) hue-rotate(9deg) brightness(114%) contrast(103%);",
  Naalu:
    "grayscale(100%) sepia(69%) saturate(759%) hue-rotate(16deg) brightness(102%) contrast(92%);",
  Nekro:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-50deg) brightness(0.7) contrast(2)",
  Sardakk:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-53deg) brightness(0.8) contrast(1.5)",
  "Jol-Nar":
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-160deg) brightness(0.7) ",
  Winnu:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-120deg) brightness(0.6)",
  Xxcha:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-245deg) brightness(0.8) contrast(1.5)",
  Yin: "grayscale(100%) sepia(30%) saturate(600%) hue-rotate(-160deg) brightness(0.7) contrast(0.9)",
  Yssaril:
    "grayscale(100%) sepia(70%) saturate(500%) hue-rotate(60deg) brightness(0.8)",
  Argent:
    "grayscale(100%) sepia(100%) saturate(1738%) hue-rotate(323deg) brightness(99%) contrast(100%);",
  Empyrean:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-120deg) brightness(0.7) contrast(1.5)",
  Mahact: "grayscale(100%) sepia(100%) saturate(500%)",
  NaazRokha:
    "grayscale(100%) sepia(30%) saturate(1500%) hue-rotate(45deg) brightness(0.6) ",
  Nomad:
    "grayscale(100%) sepia(100%) saturate(300%) hue-rotate(175deg) brightness(0.7);",
  Titans:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-75deg) brightness(0.65) contrast(1.7)",
  Cabal:
    "grayscale(100%) sepia(60%) saturate(400%) hue-rotate(-50deg) brightness(0.65) contrast(2)",
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
      name: "C'Morran N'orr",
      spaceCombat: {
        combat: 6,
        rolls: 2,
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
        additionalHitsFunc: (roll?: number, reroll?: number) => {
          if (
            (roll !== undefined && roll >= 9) ||
            (reroll !== undefined && reroll >= 9)
          ) {
            return 2;
          }
        },
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
      groundCombat: {
        combat: 7,
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

export const FACTION_UNIT_COMBAT: Record<string, Partial<UnitCombat>> = {
  "Spec Ops II": {
    Infantry: {
      groundCombat: {
        combat: 6,
      },
    },
  },
  "Super-Dreadnought II": {
    Dreadnought: {
      spaceCombat: {
        combat: 4,
      },
      bombardment: {
        combat: 4,
      },
    },
  },
  "Hybrid Crystal Fighter II": {
    Fighter: {
      spaceCombat: {
        combat: 7,
      },
    },
  },
  "Exotrireme II": {
    Dreadnought: {
      bombardment: {
        combat: 4,
        rolls: 2,
      },
    },
  },
  "Strike Wing Alpha II": {
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
  "Memoria II": {
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
  "Hel Titan II": {
    PDS: {
      spaceCannon: {
        combat: 5,
      },
      groundSpaceCannon: {
        combat: 5,
      },
      groundCombat: {
        combat: 6,
      },
    },
  },
};

export const FACTION_TECH_COMBAT: Record<string, CombatEvalFunc> = {
  Supercharge: combatModFunc([1]),
};

export const FACTION_UPGRADE_COMBAT: Record<Factions, Partial<UnitCombat>> = {
  Arborec: {},
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
    ...FACTION_UNIT_COMBAT["Spec Ops II"],
  },
  Ghosts: {},
  L1Z1X: {
    ...FACTION_UNIT_COMBAT["Super-Dreadnought II"],
  },
  Mentak: {},
  Naalu: {
    ...FACTION_UNIT_COMBAT["Hybrid Crystal Fighter II"],
  },
  Nekro: {},
  Sardakk: {
    War_Sun: {
      spaceCombat: {
        combatMod: [1],
      },
    },
    ...FACTION_UNIT_COMBAT["Exotrireme II"],
  },
  "Jol-Nar": {
    War_Sun: {
      spaceCombat: {
        combatMod: [-1],
      },
    },
  },
  Winnu: {},
  Xxcha: {},
  Yin: {},
  Yssaril: {},
  Argent: {
    ...FACTION_UNIT_COMBAT["Strike Wing Alpha II"],
  },
  Empyrean: {},
  Mahact: {},
  NaazRokha: {},
  Nomad: {
    ...FACTION_UNIT_COMBAT["Memoria II"],
  },
  Titans: {
    PDS: {
      spaceCannon: {
        combat: 5,
      },
      groundSpaceCannon: {
        combat: 5,
      },
      groundCombat: {
        combat: 6,
      },
    },
  },
  Cabal: {},
};

export const FACTION_STARTING_TECHNOLOGY: Partial<
  Record<Factions, Partial<Record<CombatTechnology, boolean>>>
> = {
  Argent: {
    "Plasma Scoring": true,
  },
  Barony: {
    "Antimass Deflectors": true,
    "Plasma Scoring": true,
  },
  "Jol-Nar": {
    "Antimass Deflectors": true,
    "Plasma Scoring": true,
  },
  L1Z1X: {
    "Plasma Scoring": true,
  },
  Mentak: {
    "Plasma Scoring": true,
  },
  Muaat: {
    "Plasma Scoring": true,
  },
  Saar: {
    "Antimass Deflectors": true,
  },
  Sol: {
    "Antimass Deflectors": true,
  },
  Titans: {
    "Antimass Deflectors": true,
  },
};
