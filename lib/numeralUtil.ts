import Decimal from 'decimal.js';

/**
 * 操作类型
 */
type TOperation = 'add' | 'sub' | 'mul' | 'div';

// TODO:
export const numberAdd = () => {
  Decimal.add('1', 2);
};
