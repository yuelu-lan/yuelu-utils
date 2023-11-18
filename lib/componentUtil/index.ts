interface Px2RemOptions {
  /**
   * 设计稿宽度 default 750
   */
  designDraftWidth?: number;
  /**
   * 小数点保留位数 default 5
   */
  decimalPlace?: number;
}

/**
 * px 单位转换为 rem 单位
 * @param px
 * @param options
 * @returns
 */
export const px2rem = (px: number, options: Px2RemOptions): string => {
  const { designDraftWidth = 750, decimalPlace = 5 } = options;

  let remNumString = (px / (designDraftWidth * 100) / 750).toFixed(
    decimalPlace
  );

  // 如果是小数，默认隐藏结尾的 0
  if (remNumString.includes('.')) {
    remNumString = remNumString.replace(/\.?0+$/, '');
  }

  return `${remNumString}rem`;
};
