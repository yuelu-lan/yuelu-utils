/**
 * HTML转义字符对照表 https://tool.oschina.net/commons?type=2
 */

import { invert } from 'lodash';

const unescape: Record<string, string> = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"',
};

const escape = invert(unescape);

const unescapeExp = Object.keys(unescape).join('|');

const escapeExp = Object.keys(escape).join('|');

/**
 * 转义字符 解码
 */
export const unescapeHtml = (str: string = ''): string => {
  if (!str) {
    return '';
  }

  return str.replace(RegExp(unescapeExp, 'g'), (m) => unescape[m]);
};

/**
 * 转义字符 编码
 */
export const escapeHtml = (str: string = ''): string => {
  if (!str) {
    return '';
  }

  return str.replace(RegExp(escapeExp, 'g'), (m) => escape[m]);
};
