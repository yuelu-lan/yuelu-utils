export const is = (val: any, type: string) => {
  return toString.call(val) === `[object ${type}]`;
};

/**
 * 是否为 undefined
 * 注释测试
 */
export const isDef = (val: any) => {
  return typeof val !== 'undefined';
};

export const isUnDef = (val: any) => {
  return !isDef(val);
};

export const isObject = (val: any) => {
  return val !== null && is(val, 'Object');
};
