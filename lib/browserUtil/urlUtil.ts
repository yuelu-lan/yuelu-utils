import Url from 'url-parse';

/**
 * url 转换为对象
 */
export const parseUrl = (url: string) => {
  return new Url(url ?? '', true);
};

/**
 * query 对象转换为字符串
 * @example {one: 111} => "one=111"
 */
export const stringifyQuery = (
  queryObj: Record<string, string | number>
): string => {
  return Url.qs.stringify(queryObj);
};
