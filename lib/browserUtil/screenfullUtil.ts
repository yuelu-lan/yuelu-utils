import screenfull from 'screenfull';

/**
 * 浏览器全屏
 * @param elem 需要全屏的 dom
 * @returns { Promise<void> }
 */
export const requestFullscreen = (elem: HTMLElement) => {
  if (!(elem instanceof HTMLElement)) {
    throw new Error('please enter th correct Element');
  }

  return screenfull.request(elem);
};

/**
 * 退出全屏状态
 * @returns
 */
export const exitFullscreen = () => {
  return screenfull.exit();
};

/**
 * 是否处于全屏状态
 */
export const isFullscreen = () => {
  return screenfull.isFullscreen;
};
