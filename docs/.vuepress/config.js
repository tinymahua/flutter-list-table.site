import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'

export default defineUserConfig({
  lang: 'en-US',
  base: '/flutter-list-table/',
  title: 'Flutter List Table',
  description: 'Flutter List Table is a table component that is easy to use and capable of handling rich interactions.',
  

  theme: hopeTheme({
    favicon: '/imgs/logo.png',
    logo: '/imgs/logo.png',
    markdown: {
      // 启用 figure
      figure: true,
      // 启用图片懒加载
      imgLazyload: true,
      // 启用图片标记
      imgMark: true,
      // 启用图片大小
      imgSize: true,
      // Slide Show
      revealjs: true,
    },
    navbar: [
      '/', 
      '/get-started'],
  }),

  bundler: viteBundler(),
})
