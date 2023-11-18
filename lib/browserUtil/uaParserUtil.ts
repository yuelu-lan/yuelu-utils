import UAParse from 'ua-parser-js';

const parser = new UAParse();

/**
 * 获取浏览器信息
 * 使用 ua-parser-js 库
 */
export const getBrowserInfo = (): UAParse.IResult => {
  return parser.getResult();
};
