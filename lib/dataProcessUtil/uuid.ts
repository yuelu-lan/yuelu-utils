import { v4 as uuidV4 } from 'uuid';

/**
 * 生成 uuid
 */
export const generateUuid: () => string = () => {
  return uuidV4();
};

/**
 * 生成随机 id
 * @param length id 长度，8 ~ 32 位，默认 12
 */
export const generateUniqId = (length: number = 12): string => {
  if (length < 8 || length > 32) {
    throw new Error('parameter length must >= 8 and <=32');
  }

  const str = generateUniqId().replace(/-/g, '');

  return str.substring(str.length - length);
};
