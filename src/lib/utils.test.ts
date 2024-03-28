
import { describe, it, expect } from 'vitest'
import { PositionValues } from "@/types";
import {liquidationPriceCalculation} from "./utils";

describe('liquidationPriceCalculation', () => {

  it('should return 0 when given logical invalid input', () => {
    const position: PositionValues = {
      entryPrice: 20,
      isLong: true,
      collateral: 10,
      size: 5
    };

    expect(liquidationPriceCalculation(position)).toBe(0);
  });

  it('should return 0 when given NaN as input', () => {
    const position: PositionValues = {
      entryPrice: NaN,
      isLong: true,
      collateral: NaN,
      size: NaN
    };

    expect(liquidationPriceCalculation(position)).toBe(0);
  });

  it('should return the correct liquidation price when given valid inputs for a long trade', () => {
    const position: PositionValues = {
      entryPrice: 0.3455,
      isLong: true,
      collateral: 5000,
      size: 10000
    };

    expect(liquidationPriceCalculation(position)).toBe(0.17275);
  });

  it('should return the correct liquidation price when given valid inputs for a short trade', () => {
    const position: PositionValues = {
      entryPrice: 69515.89,
      isLong: false,
      collateral: 70000,
      size: 280000
    };

    expect(liquidationPriceCalculation(position)).toBe(86894.8625);
  });

});
