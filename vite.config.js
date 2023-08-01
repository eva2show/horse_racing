import { resolve,join } from 'path'
import { defineConfig } from 'vite'


const PACKAGE_ROOT = __dirname;
const PACKAGES_ROOT = join(PACKAGE_ROOT, '../..');;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../../..');


console.log("PACKAGES_ROOT:",PACKAGES_ROOT)
console.log("PROJECT_ROOT:",PROJECT_ROOT)
console.log("PACKAGE_ROOT:",PACKAGE_ROOT)

export default defineConfig({

  // publicDir:PROJECT_ROOT + '/',

  resolve: {
    alias: {
      // 'games': join(PACKAGES_ROOT, 'games') + '/',
      'pkg': PACKAGES_ROOT + '/',
      'root': PACKAGE_ROOT + '/',
      // 'assets': join(PACKAGE_ROOT, 'assets') + '/',
      // 'aikui': join(PACKAGE_ROOT, 'src') + '/',
      // 'aikcore': join(PACKAGES_ROOT, 'aikcore','src') + '/',
    },
  },
  build: {
    // lib: {
    //   // Could also be a dictionary or array of multiple entry points
    //   entry: resolve(__dirname, 'src/YuanApp.js'),
    //   name: '__yuan__',
    //   // the proper extensions will be added
    //   fileName: 'YuanApp',
    //   formats: ["es", "umd", "cjs"],
    // },

    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    // //   external: ['vue'],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //       YuanApp: 'YuanApp',
    //     },
    //   },
    // },
  },
})