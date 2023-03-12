// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
// import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main'),
      name: 'MyLib',
      // the proper extensions will be added
      // 默认 fileName 是 package.json 的 name 选项
      fileName: 'my-lib',
      // formats: ['es', 'umd'], // 默认值
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          // vue: 'Vue',
          // TODO: 待补充
          // react: '?',
          // 'react-dom': '?',
        },
      },
    },
  },
  // plugins: [
  //   dts({
  //     outputDir: 'dist/types',
  //   }),
  // ],
});
