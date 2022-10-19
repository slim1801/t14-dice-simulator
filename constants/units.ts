import { UnitCombat } from "../types";

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
