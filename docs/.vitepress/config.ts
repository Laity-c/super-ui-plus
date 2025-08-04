import { defineConfig } from "vitepress"
import pkg from "../../package.json"

import {
    componentPreview,
    containerPreview,
  } from "vitepress-demo-preview-fock-plugin";

// 生产环境判断
const content = [
  "vue 版本的 t-ui-plus",
  "vue t-ui-plus",
  "t-ui-plus vue",
  "TuiPlus",
  "t-ui-plus",
  "element-plus",
  "Page level components",
  "component library",
  "ui framework",
  "ui",
  "基础组件",
  "二次封装",
  "wocwin",
  "vue"
].toString()

export default defineConfig({
  title: "TuiPlus基础组件文档",
  description: content,
  lang: "cn-ZH",
  base: "/super-ui-plus/",
  head: [
    ["meta", { name: "author", content: "wocwin" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      }
    ],
    [
      "meta",
      {
        name: "description",
        content
      }
    ],
    ["meta", { name: "keywords", content }],
    ["link", { rel: "icon", href: "/logo.jpg" }]
  ],
  lastUpdated: true,
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "TuiPlus基础组件文档",
    outline: 3,
    search: {
      provider: "local"
    },
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    outlineTitle: "本页导航",
    lastUpdatedText: "上次更新时间",
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    socialLinks: [{ icon: "github", link: "https://github.com/wocwin/t-ui-plus" }],
    nav: [
      {
        text: "安装指南",
        link: "/guide/"
      },
      { text: "基础组件", link: "/components/header/index.md" },
      {
        text: "GitHub地址",
        link: "https://github.com/wocwin/t-ui-plus"
      },
      {
        text: "Gitee码云地址",
        link: "https://gitee.com/wocwin/t-ui-plus"
      },
      {
        text: `v${pkg.version}`,
        link: "https://github.com/wocwin/t-ui-plus/releases"
      },
      {
        text: "演练场",
        link: "https://wocwin.github.io/wocwin-playground/"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "安装指南",
          items: [
            {
              text: "简介",
              link: "/guide/index"
            },
            {
              text: "安装",
              link: "/guide/installation"
            },
            {
              text: "快速开始",
              link: "/guide/quickstart"
            },
            {
              text: "Resolver按需引入",
              link: "/guide/resolver"
            }
          ]
        }
      ],
      "/components/": [
        {
          text: "常用组件",
          items: [
            { text: "头部组件", link: "/components/header/index.md" },
          ]
        },
      ]
    }
  },
  markdown: {
    theme: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    lineNumbers: true,
    // @vitepress-demo-preview的配置
      config(md) {
           // 支持区块内的方式展示 demo 和示例代码
           md.use(containerPreview)
           md.use(componentPreview)
        }
  }
})
