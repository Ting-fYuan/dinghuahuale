// Rem 布局适配
// 如果需要使用 rem 单位进行适配，推荐使用以下两个工具：

// postcss-pxtorem 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位
// lib-flexible 用于设置 rem 基准值
// PostCSS 示例配置

// 找到包文件里的 lib-flexible --》 lib-flexible.js 配置 rem 根

// postcss.config.js
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
    },
  },
};
