import {
  CombatDetails,
  CombatEvalFunc,
  CombatType,
  NumUnits,
  UnitCombat,
  Units,
} from "../types";

export const combatModFunc = (combatMod: number[]): CombatEvalFunc => {
  return (allUnitCombats?: UnitCombat[], unitCombatIndex?: number) => {
    const moddedCombat: Partial<UnitCombat> | null = {};
    const unitCombat = allUnitCombats?.[unitCombatIndex || 0];
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
  return (
    allUnitCombats?: UnitCombat[],
    unitCombatIndex?: number,
    numUnits?: NumUnits
  ) => {
    let bestCombat: Partial<UnitCombat> | null = {};
    if (unitCombatIndex !== undefined && allUnitCombats?.[unitCombatIndex]) {
      combatTypes.forEach((combatType) => {
        let bestUnit: Units | undefined = undefined;
        let bestUnitIndex: number | undefined = undefined;
        let bestCombatValue: number = Infinity;

        allUnitCombats?.forEach((allUnitCombat, index) => {
          const units = Object.keys(allUnitCombat) as Units[];

          units.forEach((unitKey) => {
            const _unitCombat = allUnitCombat[unitKey];
            const combatDetails = _unitCombat?.[combatType];

            if (combatDetails && numUnits && numUnits?.[unitKey] > 0) {
              const totalCombat = calculateCombat(combatDetails);
              if (totalCombat !== undefined && bestCombatValue > totalCombat) {
                bestCombatValue = totalCombat;
                bestUnit = unitKey;
                bestUnitIndex = index;
              }
            }
          });
        });

        if (bestUnit && bestUnitIndex === unitCombatIndex) {
          bestCombat = {
            ...bestCombat,
            [bestUnit]: {
              ...(bestCombat?.[bestUnit] || {}),
              [combatType]: { rollMod },
            },
          };
        }
      });
    }
    return bestCombat;
  };
};

export const calculateCombat = (combatDetails?: CombatDetails) => {
  if (combatDetails?.combat !== undefined) {
    const baseCombat: number = combatDetails.combat;

    const combatMod = (combatDetails?.combatMod || []).reduce(
      (acc, val) => acc + val,
      0
    );
    return Math.max(baseCombat - combatMod, 1);
  }
};
