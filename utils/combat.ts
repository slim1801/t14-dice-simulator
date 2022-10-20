import {
  CombatDetails,
  CombatEvalFunc,
  CombatType,
  NumUnits,
  UnitCombat,
  Units,
} from "../types";

export const combatModFunc = (combatMod: number[]): CombatEvalFunc => {
  return (unitCombat?: UnitCombat) => {
    const moddedCombat: Partial<UnitCombat> | null = {};
    if (unitCombat) {
      const units = Object.keys(unitCombat) as Units[];
      units.reduce((acc, unit) => {
        const _spaceCombat = unitCombat[unit].spaceCombat?.combat;
        const _groundCombat = unitCombat[unit].groundCombat?.combat;
        if (_spaceCombat || _groundCombat) {
          acc[unit] = {
            ...(_spaceCombat && { spaceCombat: { combatMod } }),
            ...(_groundCombat && { groundCombat: { combatMod } }),
          };
        }
        return acc;
      }, moddedCombat);
    }
    return moddedCombat;
  };
};

export const optimisedRoll = (
  combatTypes: CombatType[],
  rollMod: number[]
): CombatEvalFunc => {
  return (unitCombat?: UnitCombat, numUnits?: NumUnits) => {
    let bestCombat: Partial<UnitCombat> | null = {};
    if (unitCombat) {
      combatTypes.forEach((combatType) => {
        let bestUnit: Units | undefined = undefined;
        let bestCombatValue: number = Infinity;

        const units = Object.keys(unitCombat) as Units[];
        units.forEach((unitKey) => {
          const _unitCombat = unitCombat[unitKey];
          const combatDetails = _unitCombat?.[combatType];

          if (combatDetails && numUnits && numUnits?.[unitKey] > 0) {
            const totalCombat = calculateCombat(combatDetails);
            if (bestCombatValue > totalCombat) {
              bestCombatValue = totalCombat;
              bestUnit = unitKey;
            }
          }
        });
        if (bestUnit) {
          bestCombat = {
            ...bestCombat,
            [bestUnit]: {
              ...(bestCombat?.[bestUnit] || {}),
              [combatType]: {
                rollMod,
              },
            },
          };
        }
      });
    }
    return bestCombat;
  };
};

export const calculateCombat = (combatDetails: CombatDetails) => {
  const baseCombat: number = combatDetails.combat || 0;

  const combatMod = (combatDetails.combatMod || []).reduce(
    (acc, val) => acc + val,
    0
  );
  return baseCombat - combatMod;
};
