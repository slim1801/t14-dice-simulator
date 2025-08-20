import {
  BasePokFactions,
  BespokeUnitCombat,
  CombatEvalFunc,
  CombatTechnology,
  DSFactionExclusiveUnitCombatTechnology,
  FactionExclusiveUnitCombatTechnology,
  Factions,
  FactionUnitDetails,
  NumUnits,
  UnitCombat,
  UnitCombatAbilities,
  Units,
} from "../types";
import { combatModFunc } from "../utils/combat";
import { ALL_DISCORDANT_FACTIONS } from "./discordantStars/factions";

export const BASE_POK_FACTIONS: BasePokFactions[] = [
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

export const ALL_FACTIONS: Factions[] = [
  ...ALL_DISCORDANT_FACTIONS,
  ...BASE_POK_FACTIONS,
];

type FactionType = {
  [key in Factions | "Neutral"]: string;
};

export const FACTION_NAMES: FactionType = {
  Neutral: "Neutral",
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
  // Discordant Stars
  Axis: "The Shipwrights of Axis",
  Celdauri: "The Celdauri Trade Confederation",
  Cymiae: "The Savages of Cymiae",
  "Dih-Mohn": "The Dih-Mohn Flotilla",
  Florzen: "The Florzen Profiteers",
  "Free-Systems": "The Free Systems Compact",
  Ghemina: "The Ghemina Raiders",
  Ilyxum: "The Augurs of Ilyxum",
  Kollecc: "The Kollecc Society",
  Kortali: "The Kortali Tribunal",
  "Li-Zho": "The Li-Zho Dynasty",
  Ltokk: "The L'tokk Khrask",
  Mirveda: "The Mirveda Protectorate",
  Mortheus: "The Glimmer of Mortheus",
  "Myko-Mentori": "The Myko-Mentori",
  Nivyn: "The Nivyn Star Kings",
  Olradin: "The Olradin League",
  Rhodun: "The Zealots of Rhodun",
  RohDhna: "Roh'Dhna Mechatronics",
  Tnelis: "The Tnelis Syndicate",
  Vaden: "The Vaden Banking Clans",
  Vaylerian: "The Vaylerian Scourge",
  Veldyr: "The Veldyr Sovereignty",
  Zelian: "The Zelian Purifier",
  Bentor: "The Bentor Conglomerate",
  Cheiran: "The Cheiran Hordes",
  Edyn: "The Edyn Mandate",
  Ghoti: "The Ghoti Wayfarers",
  Gledge: "The Gledge Union",
  Kjalengard: "The Berserkers of Kjalengard",
  Kolume: "The Monks of Kolume",
  Kyro: "The Kyro Sodality",
  Lanefir: "The Lanefir Remnants",
  Nokar: "The Nokar Sellships",
};

export const FACTION_COLORS: FactionType = {
  Neutral: "grayscale(100%)",
  Arborec:
    "grayscale(100%) sepia(52%) saturate(341%) hue-rotate(42deg) brightness(90%)",
  Barony:
    "grayscale(100%) sepia(40%) saturate(600%) hue-rotate(-50deg) contrast(200%)",
  Saar: "grayscale(100%) sepia(58%) saturate(492%) hue-rotate(350deg)",
  Muaat: "grayscale(100%) sepia(68%) saturate(646%) hue-rotate(338deg)",
  Hacan: "grayscale(100%) sepia(98%) saturate(562%) hue-rotate(340deg)",
  Sol: "grayscale(100%) sepia(40%) saturate(386%) hue-rotate(161deg)",
  Ghosts: "grayscale(100%) sepia(19%) saturate(718%) hue-rotate(159deg)",
  L1Z1X:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-50deg) brightness(0.6) contrast(2)",
  Mentak:
    "grayscale(100%) sepia(97%) saturate(864%) hue-rotate(9deg) brightness(114%) contrast(103%)",
  Naalu:
    "grayscale(100%) sepia(69%) saturate(759%) hue-rotate(16deg) brightness(102%) contrast(92%)",
  Nekro:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-50deg) brightness(0.7) contrast(2)",
  Sardakk:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-53deg) brightness(0.8) contrast(1.5)",
  "Jol-Nar":
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-160deg) brightness(0.7)",
  Winnu:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-120deg) brightness(0.6)",
  Xxcha:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-245deg) brightness(0.8) contrast(1.5)",
  Yin: "grayscale(100%) sepia(30%) saturate(600%) hue-rotate(-160deg) brightness(0.7) contrast(0.9)",
  Yssaril:
    "grayscale(100%) sepia(70%) saturate(500%) hue-rotate(60deg) brightness(0.8)",
  Argent:
    "grayscale(100%) sepia(100%) saturate(1738%) hue-rotate(323deg) brightness(99%) contrast(100%)",
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

  // Discordant stars
  Axis: "grayscale(100%) sepia(60%) saturate(450%) hue-rotate(-46deg) brightness(0.6) contrast(1.5)",
  Celdauri:
    "grayscale(100%) sepia(100%) saturate(475%) brightness(0.65) contrast(0.9)",
  Cymiae:
    "grayscale(100%) sepia(128%) saturate(456%) hue-rotate(325deg) brightness(0.8) contrast(1.1)",
  "Dih-Mohn":
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-120deg) brightness(0.7) contrast(0.9)",
  Florzen:
    "grayscale(100%) sepia(80%) saturate(500%) hue-rotate(100deg) brightness(0.8) contrast(0.6)",
  "Free-Systems":
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-120deg) brightness(0.5) contrast(1.1)",
  Ghemina:
    "grayscale(100%) sepia(40%) saturate(386%) hue-rotate(170deg) brightness(0.6)",
  Ilyxum:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-130deg) brightness(0.5) contrast(1.2)",
  Kollecc:
    "grayscale(100%) sepia(78%) saturate(492%) hue-rotate(325deg) brightness(0.6) contrast(0.7)",
  Kortali:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-130deg) brightness(0.7) contrast(0.9)",
  "Li-Zho":
    "grayscale(100%) sepia(58%) saturate(492%) hue-rotate(345deg) brightness(0.7)",
  Ltokk:
    "grayscale(100%) sepia(70%) saturate(500%) hue-rotate(38deg) brightness(0.8) contrast(1)",
  Mirveda:
    "grayscale(100%) sepia(40%) saturate(386%) hue-rotate(191deg) contrast(1.2) brightness(0.7)",
  Mortheus:
    "grayscale(100%) sepia(70%) saturate(386%) hue-rotate(187deg) contrast(1.6) brightness(0.7)",
  "Myko-Mentori":
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-110deg) brightness(0.8) contrast(1.5)",
  Nivyn:
    "grayscale(100%) sepia(98%) saturate(562%) hue-rotate(345deg) brightness(0.7) contrast(0.9)",
  Olradin:
    "grayscale(100%) sepia(50%) saturate(562%) hue-rotate(330deg) brightness(0.6) contrast(0.9)",
  Rhodun:
    "grayscale(100%) sepia(100%) saturate(280%) hue-rotate(125deg) brightness(0.75)",
  RohDhna:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-155deg) brightness(0.5) contrast(0.9)",
  Tnelis:
    "grayscale(100%) sepia(60%) saturate(400%) hue-rotate(-60deg) brightness(0.6) contrast(1.5)",
  Vaden:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-240deg) brightness(0.55) contrast(1.2)",
  Vaylerian:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-250deg) brightness(0.85) contrast(1.4)",
  Veldyr:
    "grayscale(100%) sepia(20%) saturate(500%) hue-rotate(-220deg) brightness(0.85) contrast(1.2)",
  Zelian:
    "grayscale(100%) sepia(40%) saturate(600%) hue-rotate(-55deg) brightness(0.5) contrast(1.1)",
  Bentor:
    "grayscale(100%) sepia(60%) saturate(500%) hue-rotate(-140deg) brightness(0.7) contrast(0.8)",
  Cheiran:
    "grayscale(100%) sepia(100%) saturate(200%) hue-rotate(335deg) brightness(0.6) contrast(1.6)",
  Edyn: "grayscale(100%) sepia(60%) saturate(562%) hue-rotate(380deg) brightness(1) contrast(0.65)",
  Ghoti:
    "grayscale(100%) sepia(40%) saturate(386%) hue-rotate(130deg) brightness(1.4) contrast(0.8)",
  Gledge:
    "grayscale(100%) sepia(100%) saturate(200%) hue-rotate(335deg) brightness(0.85) contrast(1.6)",
  Kjalengard:
    "grayscale(100%) sepia(70%) saturate(800%) hue-rotate(-140deg) brightness(0.7) contrast(1.3)",
  Kolume:
    "grayscale(100%) sepia(10%) saturate(400%) hue-rotate(-10deg) brightness(1.1) contrast(1.2)",
  Kyro: "grayscale(100%) sepia(60%) saturate(200%) hue-rotate(-325deg) brightness(0.9) contrast(1.2)",
  Lanefir:
    "grayscale(100%) sepia(60%) saturate(400%) hue-rotate(365deg) brightness(0.9)",
  Nokar:
    "grayscale(100%) sepia(70%) saturate(300%) hue-rotate(335deg) brightness(1) contrast(1.2)",
};

export const BESPOKE_FACTION_COMBAT: Partial<
  Record<Factions, Partial<BespokeUnitCombat>>
> = {
  "Free-Systems": {
    Flagship: {
      bespokeLabel: "Planet Traits",
      spaceCombat: { rollMod: [1] },
    },
  },
  Bentor: {
    Flagship: {
      bespokeLabel: "Fragment Tokens",
      antiFighterBarrage: {
        combatMod: [1],
      },
      bombardment: {
        combatMod: [1],
      },
      spaceCannon: {
        combatMod: [1],
      },
      spaceCombat: {
        combatMod: [1],
      },
    },
  },
  Gledge: {
    Flagship: {
      bespokeLabel: "Adjacent Mechs",
      bombardment: { rollMod: [1] },
      spaceCombat: { rollMod: [1] },
    },
  },
  Mirveda: {
    Mech: {
      bespokeLabel: "Every 2 Unit Upgrades",
      groundCombat: { combatMod: [1] },
    },
  },
  Edyn: {
    Flagship: {
      bespokeLabel: "Laws in play",
      spaceCombat: { combatMod: [1] },
    },
  },
  Rhodun: {
    Flagship: {
      bespokeLabel: "Opponent Unit Upgrades",
      spaceCombat: { combatMod: [1] },
    },
    Mech: {
      bespokeLabel: "Opponent Faction Techs",
      groundCombat: { combatMod: [1] },
    },
  },
  Zelian: {
    Flagship: {
      bespokeLabel: "Adjacent Asteroid Fields",
      bombardment: { rollMod: [1] },
      antiFighterBarrage: { rollMod: [1] },
      spaceCombat: { rollMod: [1] },
    },
  },
};

export const FACTION_UNIT_COMBAT_DETAILS: Record<
  Factions,
  Partial<UnitCombat>
> = {
  Arborec: {
    Flagship: {
      name: "Duha Menaimon",
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
    Mech: {
      name: "Letani Behemoth",
    },
    Infantry: {
      name: "Letani Warrior",
    },
  },
  Barony: {
    Flagship: {
      name: "Arc Secundus",
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
      bombardment: {
        combat: 5,
        rolls: 3,
      },
    },
    Mech: {
      name: "Dunlain Reaper",
    },
  },
  Saar: {
    Flagship: {
      name: "Son of Ragh",
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
      antiFighterBarrage: {
        combat: 6,
        rolls: 4,
      },
    },
    Mech: {
      name: "Scavenger Zeta",
    },
    Space_Dock: {
      name: "Floating Factory",
    },
  },
  Muaat: {
    Flagship: {
      name: "The Inferno",
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
    War_Sun: {
      name: "Prototype War Sun I",
      spaceCombat: {
        combat: 3,
        rolls: 3,
      },
      bombardment: {
        combat: 3,
        rolls: 3,
      },
    },
    Mech: {
      name: "Ember Colossus",
    },
  },
  Hacan: {
    Flagship: {
      name: "Wrath of Kenara",
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
    },
    Mech: {
      name: "Pride of Kenara",
    },
  },
  Sol: {
    Flagship: {
      name: "Genesis",
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
    Infantry: {
      name: "Spec Ops",
      groundCombat: {
        combat: 7,
      },
    },
    Carrier: {
      name: "Advanced Carrier",
      spaceCombat: {
        combat: 9,
      },
    },
  },
  Ghosts: {
    Flagship: {
      name: "Hil Colish",
      spaceCombat: {
        combat: 5,
      },
    },
    Mech: {
      name: "Icarus Drive",
    },
  },
  L1Z1X: {
    Flagship: {
      name: "[0.0.1]",
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
    Dreadnought: {
      name: "Super-Dreadnought I",
    },
    Mech: {
      name: "Annihilator",
      bombardment: {
        combat: 8,
      },
    },
  },
  Mentak: {
    Flagship: {
      name: "Fourth Moon",
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
    },
    Mech: {
      name: "Moll Terminus",
    },
  },
  Naalu: {
    Flagship: {
      name: "Matriarch",
      spaceCombat: {
        combat: 9,
        rolls: 2,
      },
      combatEvalFunc: (
        allUnitCombats?: UnitCombat[],
        unitCombatIndex?: number
      ) => {
        const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
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
    Fighter: {
      name: "Hybrid Crystal Fighter",
      spaceCombat: {
        combat: 8,
      },
    },
    Mech: {
      name: "Iconoclast",
    },
  },
  Nekro: {
    Flagship: {
      name: "The Alastor",
      spaceCombat: {
        combat: 9,
        rolls: 2,
      },
      combatEvalFunc: (
        allUnitCombats?: UnitCombat[],
        unitCombatIndex?: number
      ) => {
        const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
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
    Mech: {
      name: "Mordred",
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
      combatEvalFunc: (
        allUnitCombats?: UnitCombat[],
        unitCombatIndex?: number
      ) => {
        const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
        if (unitCombat) {
          return {
            ...(unitCombat.Flagship.name !== "C'Morran N'orr" && {
              Flagship: {
                spaceCombat: {
                  combatMod: [1],
                },
              },
            }),
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
    Dreadnought: {
      name: "Exotrireme",
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
      name: "Valkyrie Exoskeleton",
      groundCombat: {
        combatMod: [1],
      },
    },
  },
  "Jol-Nar": {
    Flagship: {
      name: "J.N.S. Hylarim",
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
      name: "Shield Paling",
      groundCombat: {
        combatMod: [-1],
      },
      combatEvalFunc: (
        allUnitCombats?: UnitCombat[],
        unitCombatIndex?: number
      ) => {
        const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
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
  Winnu: {
    Flagship: {
      name: "Salai Sai Corian",
      spaceCombat: {
        combat: 7,
      },
    },
    Mech: {
      name: "Reclaimer",
    },
  },
  Xxcha: {
    Flagship: {
      name: "Loncara Ssodu",
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
      name: "Indomitus",
      spaceCannon: {
        combat: 8,
      },
    },
  },
  Yin: {
    Flagship: {
      name: "Van Hauge",
      spaceCombat: {
        combat: 9,
        rolls: 2,
      },
    },
    Mech: {
      name: "Moyin's Ashes",
    },
  },
  Yssaril: {
    Flagship: {
      name: "Y'sia Y'ssrila",
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
    Mech: {
      name: "Blackshade Infiltrator",
    },
  },
  Argent: {
    Flagship: {
      name: "Quetzecoatl",
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
    },
    Destroyer: {
      name: "Strike Wing Alpha",
      spaceCombat: {
        combat: 8,
      },
      antiFighterBarrage: {
        combat: 9,
        rolls: 2,
      },
    },
    Mech: {
      name: "Aerie Sentinel",
    },
  },
  Empyrean: {
    Flagship: {
      name: "Dynamo",
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
    },
    Mech: {
      name: "Watcher",
    },
  },
  Mahact: {
    Flagship: {
      name: "Arvicon Rex",
      selectable: true,
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
      combatEvalFunc: (
        allUnitCombats?: UnitCombat[],
        unitCombatIndex?: number
      ) => {
        const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
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
    Infantry: {
      name: "Crimson Legionnaire",
    },
    Mech: {
      name: "Starlancer",
    },
  },
  NaazRokha: {
    Flagship: {
      name: "Visz El Vir",
      spaceCombat: {
        combat: 9,
        rolls: 2,
      },
      combatEvalFunc: (
        allUnitCombats?: UnitCombat[],
        unitCombatIndex?: number,
        numUnits?: NumUnits
      ) => {
        const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
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
    Mech: {
      name: "Eidolon",
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
      name: "Memoria",
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
      antiFighterBarrage: {
        combat: 8,
        rolls: 3,
      },
    },
    Mech: {
      name: "Quantum Manipulator",
    },
  },
  Titans: {
    Flagship: {
      name: "Ouranos",
      spaceCombat: {
        combat: 7,
        rolls: 2,
      },
    },
    Cruiser: {
      name: "Saturn Engine",
      spaceCombat: {
        combat: 7,
      },
    },
    PDS: {
      name: "Hel Titan",
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
    Mech: {
      name: "Hecatoncheires",
    },
  },
  Cabal: {
    Flagship: {
      name: "The Terror Between",
      spaceCombat: {
        combat: 5,
        rolls: 2,
      },
      bombardment: {
        combat: 5,
      },
    },
    Space_Dock: {
      name: "Dimensional Tear",
    },
    Mech: {
      name: "Reanimator",
    },
  },

  // Discordant Stars
  Axis: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Celdauri: {
    Flagship: {
      antiFighterBarrage: {
        rolls: 2,
        combat: 6,
      },
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
    Space_Dock: {
      antiFighterBarrage: {
        rolls: 2,
        combat: 6,
      },
    },
  },
  Cymiae: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 9,
      },
    },
    Infantry: {
      groundCombat: {
        combat: 5,
      },
    },
  },
  "Dih-Mohn": {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
  },
  Florzen: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
    Fighter: {
      antiFighterBarrage: {
        combat: 9,
      },
    },
  },
  "Free-Systems": {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Ghemina: {
    Flagship: {
      totalUnits: 2,
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
      bombardment: {
        rolls: 4,
        combat: 5,
      },
    },
  },
  Ilyxum: {
    Flagship: {
      spaceCombat: {
        combat: 5,
      },
    },
  },
  Kollecc: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
  },
  Kortali: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
      bombardment: {
        combat: 3,
      },
    },
  },
  "Li-Zho": {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
    Fighter: {
      bombardment: {
        combat: 9,
      },
    },
  },
  Ltokk: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
    Cruiser: {
      bombardment: {
        combat: 8,
      },
    },
  },
  Mirveda: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 9,
      },
    },
    PDS: {
      bombardment: {
        combat: 6,
      },
      spaceCannon: {
        combat: 6,
      },
    },
  },
  Mortheus: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  "Myko-Mentori": {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Nivyn: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
  },
  Olradin: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
  },
  Rhodun: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  RohDhna: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
    War_Sun: {
      spaceCombat: {
        rolls: 2,
        combat: 5,
      },
    },
  },
  Tnelis: {
    Flagship: {
      spaceCombat: {
        rolls: 4,
        combat: 9,
      },
    },
    Destroyer: {
      antiFighterBarrage: {
        rolls: 3,
        combat: 9,
      },
    },
  },
  Vaden: {
    Flagship: {
      bombardment: {
        rolls: 2,
        combat: 5,
      },
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Vaylerian: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Veldyr: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
    Dreadnought: {
      bombardment: {
        combat: 5,
      },
      spaceCannon: {
        combat: 8,
      },
    },
  },
  Zelian: {
    Flagship: {
      antiFighterBarrage: {
        combat: 5,
      },
      bombardment: {
        combat: 5,
      },
      spaceCombat: {
        combat: 5,
      },
    },
    Infantry: {
      bombardment: {
        combat: 9,
      },
    },
  },
  Bentor: {
    Flagship: {
      antiFighterBarrage: {
        rolls: 2,
        combat: 9,
      },
      bombardment: {
        combat: 9,
      },
      spaceCannon: {
        combat: 9,
      },
      spaceCombat: {
        combat: 9,
      },
    },
  },
  Cheiran: {
    Flagship: {
      antiFighterBarrage: {
        rolls: 2,
        combat: 7,
      },
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
    Dreadnought: {
      totalUnits: 7,
    },
    Mech: {
      totalUnits: 5,
    },
  },
  Edyn: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Ghoti: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Gledge: {
    Flagship: {
      bombardment: {
        combat: 7,
      },
      spaceCombat: {
        combat: 7,
      },
    },
  },
  Kjalengard: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
    Carrier: {
      spaceCombat: {
        combat: 8,
      },
    },
  },
  Kolume: {
    Flagship: {
      spaceCannon: {
        combat: 7,
      },
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
    Mech: {
      spaceCannon: {
        rolls: 2,
        combat: 8,
      },
    },
  },
  Kyro: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Lanefir: {
    Flagship: {
      spaceCombat: {
        rolls: 2,
        combat: 7,
      },
    },
  },
  Nokar: {
    Flagship: {
      name: "Annah Regia",
      spaceCombat: {
        rolls: 2,
        combat: 9,
      },
      combatEvalFunc: (
        allUnitCombats?: UnitCombat[],
        unitCombatIndex?: number,
        numUnits?: NumUnits
      ) => {
        const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
        if (unitCombat) {
          const numDestroyers = numUnits?.Destroyer || 0;
          return {
            Flagship: {
              spaceCombat: {
                combatMod: [numDestroyers],
              },
            },
          };
        }
        return null;
      },
    },
    Destroyer: {
      spaceCombat: {
        combat: 8,
      },
    },
  },
};

export const FACTION_UNIT_COMBAT: Record<
  FactionExclusiveUnitCombatTechnology,
  Partial<UnitCombat>
> = {
  "Spec Ops II": {
    Infantry: {
      name: "Spec Ops II",
      groundCombat: {
        combat: 6,
      },
    },
  },
  "Super-Dreadnought II": {
    Dreadnought: {
      name: "Super-Dreadnought II",
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
      name: "Hybrid Crystal Fighter II",
      spaceCombat: {
        combat: 7,
      },
    },
  },
  "Exotrireme II": {
    Dreadnought: {
      name: "Exotrireme II",
      bombardment: {
        combat: 4,
        rolls: 2,
      },
    },
  },
  "Strike Wing Alpha II": {
    Destroyer: {
      name: "Strike Wing Alpha II",
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
      name: "Memoria II",
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
      name: "Hel Titan II",
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

export const DISCORDANT_STARS_FACTION_UNIT_COMBAT: Record<
  DSFactionExclusiveUnitCombatTechnology,
  Partial<UnitCombat>
> = {
  "Aegis II": {
    Dreadnought: {
      spaceCombat: {
        combat: 4,
      },
    },
  },
  "Trade Port II": {
    Space_Dock: {
      antiFighterBarrage: {
        combat: 6,
        rolls: 2,
      },
    },
  },
  "Unholy Abomination II": {
    Infantry: {
      groundCombat: {
        combat: 4,
      },
    },
  },
  "Corsair II": {
    Fighter: {
      antiFighterBarrage: {
        combat: 8,
      },
    },
  },
  "Heavy Bomber II": {
    Fighter: {
      bombardment: {
        combat: 8,
      },
    },
  },
  "Shattered Sky II": {
    Cruiser: {
      bombardment: {
        combat: 6,
      },
    },
  },
  "Gauss Cannon II": {
    PDS: {
      bombardment: {
        combat: 4,
      },
      spaceCannon: {
        combat: 4,
      },
    },
  },
  "Voidflare Warden II": {
    Mech: {
      groundCombat: {
        combat: 4,
      },
    },
  },
  "Terrafactory II": {
    War_Sun: {
      bombardment: {
        rolls: 3,
        combat: 3,
      },
      spaceCombat: {
        rolls: 3,
        combat: 3,
      },
    },
  },
  "Blockade Runner II": {
    Destroyer: {
      antiFighterBarrage: {
        rolls: 4,
        combat: 6,
      },
    },
  },
  "Raider II": {
    Cruiser: {},
  },
  "Lancer Dreadnought II": {
    Dreadnought: {
      bombardment: {
        combat: 5,
      },
      spaceCannon: {
        combat: 5,
      },
    },
  },
  "Impactor II": {
    Infantry: {
      bombardment: {
        combat: 8,
      },
    },
  },
  "Star Dragon II": {
    Carrier: {
      spaceCombat: {
        combat: 7,
      },
    },
  },
  "Sabre II": {
    Destroyer: {
      spaceCombat: {
        combat: 7,
      },
    },
  },
};

export const FACTION_TECH_COMBAT: Record<string, CombatEvalFunc> = {
  Supercharge: combatModFunc([1]),
};

export const FACTION_UPGRADE_UNIT_COMBAT_DETAILS: Record<
  Factions,
  Partial<UnitCombat>
> = {
  Arborec: {
    Infantry: {
      name: "Letani Warrior II",
    },
  },
  Barony: {},
  Saar: {},
  Muaat: {
    War_Sun: {
      name: "Prototype War Sun II",
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
      name: "Advanced Carrier II",
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
    ...FACTION_UNIT_COMBAT["Exotrireme II"],
  },
  "Jol-Nar": {},
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
    Cruiser: {
      name: "Saturn Engine II",
      spaceCombat: {
        combat: 6,
      },
    },
    ...FACTION_UNIT_COMBAT["Hel Titan II"],
  },
  Cabal: {},
  // Discordant Stars
  Axis: {},
  Celdauri: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Trade Port II"],
  },
  Cymiae: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Unholy Abomination II"],
  },
  "Dih-Mohn": {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Aegis II"],
  },
  Florzen: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Corsair II"],
  },
  "Free-Systems": {},
  Ghemina: {},
  Ilyxum: {},
  Kollecc: {},
  Kortali: {},
  "Li-Zho": {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Heavy Bomber II"],
  },
  Ltokk: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Shattered Sky II"],
  },
  Mirveda: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Gauss Cannon II"],
  },
  Mortheus: {},
  "Myko-Mentori": {},
  Nivyn: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Voidflare Warden II"],
  },
  Olradin: {},
  Rhodun: {},
  RohDhna: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Terrafactory II"],
  },
  Tnelis: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Blockade Runner II"],
  },
  Vaden: {},
  Vaylerian: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Raider II"],
  },
  Veldyr: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Lancer Dreadnought II"],
  },
  Zelian: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Impactor II"],
  },
  Bentor: {},
  Cheiran: {},
  Edyn: {},
  Ghoti: {},
  Gledge: {},
  Kjalengard: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Star Dragon II"],
  },
  Kolume: {},
  Kyro: {},
  Lanefir: {},
  Nokar: {
    ...DISCORDANT_STARS_FACTION_UNIT_COMBAT["Sabre II"],
  },
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
