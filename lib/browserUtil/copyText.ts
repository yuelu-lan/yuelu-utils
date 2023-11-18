import Clipboard from 'clipboard';

/**
 * 复制浏览器文本
 */
export const copyText = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const btnDom = document.createElement('button');
      btnDom.setAttribute('data-clipboard-text', text);
      const clipboardIns = new Clipboard(btnDom);
      clipboardIns.on('success', () => {
        clipboardIns.destroy();
        resolve();
      });
      clipboardIns.on('error', (err) => {
        clipboardIns.destroy();
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};
