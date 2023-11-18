import { forEach } from 'lodash';
import Url from 'url-parse';
import { saveAs } from 'file-saver';

type UrlQuery = Record<string, string | number>;

export type OpenUrlOptions = {
  query?: UrlQuery;
  /**
   * 是否新窗口打开
   */
  newWindow?: boolean;
};

const openUrlInner = (
  url: string,
  options?: OpenUrlOptions & {
    download?: string;
  }
) => {
  // 构建 URL
  const urlIns = new Url(url, true);
  Object.assign(urlIns.query, options?.query);
  const finalUrl = urlIns.toString();

  // 模拟 a 标签点击执行下载
  const aEl = document.createElement('a');
  aEl.rel = 'noopener';
  aEl.href = finalUrl;
  if (options?.newWindow) {
    aEl.target = '_blank';
  }
  if (options?.download) {
    aEl.download = options.download;
  }
  aEl.style.display = 'none';

  // 模拟点击
  document.body.appendChild(aEl);
  aEl.click();
  document.body.removeChild(aEl);
};

/**
 * 打开链接（避免 window.open 被浏览器拦截）
 * @param url
 * @param options
 */
export const openUrl = (url: string, options?: OpenUrlOptions) => {
  openUrlInner(url, options);
};

type DownloadOptions = {
  fileName?: string;
  newWindow?: boolean;
  query?: UrlQuery;
};

/**
 * 浏览器下载同源文件
 */
export const download = (url: string, options?: DownloadOptions) => {
  if (typeof url !== 'string') {
    throw new Error('url must be string !');
  }
  const downloadFilename = String(options?.fileName ?? 'download');
  // 构建下载相关参数
  const finalOptions = Object.assign({ newWindow: true }, options ?? {}, {
    download: downloadFilename,
  });
  openUrlInner(url, finalOptions);
};

export type DownloadBlobOptions = {
  fileName?: string;
  headers?: Record<string, string>;
  /**
   * 是否需要带上 cookie（默认 false）
   * 注意：
   * 如果 withCredentials 设为 true 且是跨域请求，
   * 需确认接口响应头 access-control-allow-origin 没有被设置为 *，否则请求将失败
   */
  withCredentials?: boolean;
  /**
   * @param total 下载总量
   * @param loaded 已下载量
   */
  onProgressChange?: (total: number, loaded: number) => void;
};

/**
 * 浏览器下载多媒体文件
 * 后端接口返回二进制数据
 * 注意：因为不能再浏览器内看见下载进度，所以一定要注意用户提示
 */
export const downloadBlob = (
  url: string,
  options?: DownloadBlobOptions
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (typeof url !== 'string') {
      reject(new Error('url must be string !'));
    }

    const {
      fileName = 'download',
      headers = {},
      withCredentials = false,
      onProgressChange = () => {},
    } = options ?? {};

    const downloadXhr = new XMLHttpRequest();
    downloadXhr.open('GET', url);
    downloadXhr.withCredentials = withCredentials;
    downloadXhr.responseType = 'blob';

    if (headers) {
      forEach(headers, (value, key) => {
        if (typeof value === 'string') {
          downloadXhr.setRequestHeader(key, value);
        }
      });
    }

    downloadXhr.onload = () => {
      if (downloadXhr.status < 200 || downloadXhr.status > 299) {
        return reject(
          new Error(`download blob failed. status = ${downloadXhr.status}`)
        );
      }
      saveAs(downloadXhr.response, String(fileName));
      resolve(true);
    };

    downloadXhr.onerror = () => {
      reject(new Error('download blob failed.'));
    };

    downloadXhr.onprogress = (event) => {
      const { total, loaded } = event;
      onProgressChange(total, loaded);
    };

    downloadXhr.send();
  });
};
