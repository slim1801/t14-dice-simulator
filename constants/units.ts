import {
  CombatType,
  NumUnits,
  UnitCombat,
  UnitCombatAbilities,
  Units,
} from "../types";

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
  "Memoria",
  "Experimental Battlestation",
  "Ul The Progenitor",
];

export const UNIT_ABILITIES: CombatType[] = [
  "spaceCannon",
  "spaceCombat",
  "antiFighterBarrage",
  "bombardment",
  "groundSpaceCannon",
  "groundCombat",
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
  Space_Dock: {},
  Mech: {},
  Infantry: {},
  Memoria: {},
  "Experimental Battlestation": {},
  "Ul The Progenitor": {},
};

export const DEFAULT_UNIT_COMBAT_STRENGTH: UnitCombat = {
  Flagship: {
    totalUnits: 1,
  },
  War_Sun: {
    name: "War Sun",
    totalUnits: 2,
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
    name: "Dreadnought",
    totalUnits: 5,
    spaceCombat: {
      combat: 5,
    },
    bombardment: {
      combat: 5,
    },
  },
  Cruiser: {
    name: "Cruiser",
    totalUnits: 8,
    spaceCombat: {
      combat: 7,
    },
  },
  Destroyer: {
    name: "Destroyer",
    totalUnits: 8,
    spaceCombat: {
      combat: 9,
    },
    antiFighterBarrage: {
      combat: 9,
      rolls: 2,
    },
  },
  Carrier: {
    name: "Carrier",
    totalUnits: 4,
    spaceCombat: {
      combat: 9,
    },
  },
  Fighter: {
    name: "Fighter",
    spaceCombat: {
      combat: 9,
    },
  },
  PDS: {
    name: "PDS",
    totalUnits: 6,
    spaceCannon: {
      combat: 6,
    },
    groundSpaceCannon: {
      combat: 6,
    },
  },
  Space_Dock: {
    name: "Space Dock",
    totalUnits: 3,
  },
  Mech: {
    totalUnits: 4,
    groundCombat: {
      combat: 6,
    },
  },
  Infantry: {
    name: "Infantry",
    groundCombat: {
      combat: 8,
    },
  },
  Memoria: {
    name: "Memoria",
    totalUnits: 1,
    spaceCombat: {
      combat: 7,
      rolls: 2,
    },
    antiFighterBarrage: {
      combat: 8,
      rolls: 3,
    },
  },
  "Experimental Battlestation": {
    name: "Experimental Battlestation",
    totalUnits: 1,
    spaceCannon: {
      combat: 5,
      rolls: 3,
    },
  },
  "Ul The Progenitor": {
    name: "Ul The Progenitor",
    totalUnits: 1,
    spaceCannon: {
      combat: 5,
      rolls: 3,
    },
    groundSpaceCannon: {
      combat: 5,
      rolls: 3,
    },
  },
};

export const DEFAULT_UNIT_UPGRADE_COMBAT: UnitCombat = {
  Flagship: {},
  War_Sun: {},
  Dreadnought: {
    name: "Dreadnought II",
    spaceCombat: {
      combat: 5,
    },
    bombardment: {
      combat: 5,
    },
  },
  Cruiser: {
    name: "Cruiser II",
    spaceCombat: {
      combat: 6,
    },
  },
  Destroyer: {
    name: "Destroyer II",
    spaceCombat: {
      combat: 8,
    },
    antiFighterBarrage: {
      combat: 6,
      rolls: 3,
    },
  },
  Carrier: {
    name: "Carrier II",
    spaceCombat: {
      combat: 9,
    },
  },
  Fighter: {
    name: "Fighter II",
    spaceCombat: {
      combat: 8,
    },
  },
  PDS: {
    name: "PDS II",
    spaceCannon: {
      combat: 5,
    },
    groundSpaceCannon: {
      combat: 5,
    },
  },
  Space_Dock: {
    name: "Space Dock II",
  },
  Mech: {},
  Infantry: {
    name: "Infantry II",
    groundCombat: {
      combat: 7,
    },
  },
  Memoria: {
    name: "Memoria II",
    totalUnits: 1,
    spaceCombat: {
      combat: 5,
      rolls: 2,
    },
    antiFighterBarrage: {
      combat: 5,
      rolls: 3,
    },
  },
  "Experimental Battlestation": {},
  "Ul The Progenitor": {},
};
