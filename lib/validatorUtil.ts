import isIdentityCard from 'validator/lib/isIdentityCard';
import isIP from 'validator/lib/isIP';

const defaultLocale = 'zh-CN';

export const isChineseIdentityCard = (idCard: string) => {
  return isIdentityCard(idCard, defaultLocale);
};

export const isIpV4 = (ip: string) => {
  return isIP(ip, 4);
};

export const isIpV6 = (ip: string) => {
  return isIP(ip, 6);
};
