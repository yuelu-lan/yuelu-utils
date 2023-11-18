export interface BlobInfo {
  byteSize: number;
  kbSize: number;
  mbSize: number;
  fileName?: string;
  lastModified?: number;
}
export interface ImageInfo extends BlobInfo {
  width: number;
  height: number;
}

const blobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      res(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
};

/**
 * 解析传入的图片信息
 * @param blob - Blob | File
 * @returns { Promise<ImageInfo | null> } 无法解析时，返回 null
 */
export const getImageInfo = async (blob: Blob): Promise<ImageInfo | null> => {
  if (!(blob instanceof Blob)) {
    return null;
  }

  const blobInfo: BlobInfo = {
    byteSize: blob.size,
    kbSize: blob.size / 1024,
    mbSize: blob.size / (1024 * 1024),
  };

  if (blob instanceof File) {
    blobInfo.fileName = blob.name;
    blobInfo.lastModified = blob.lastModified;
  }

  return new Promise<ImageInfo | null>(async (resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        ...blobInfo,
      });
    };
    img.onerror = () => {
      resolve(null);
    };

    const dataUrl = await blobToDataUrl(blob);
    img.src = dataUrl;
  });
};
