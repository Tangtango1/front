import SvgIcon from '@/components/SvgIcon'

// Webpack 环境下的 SVG 导入方式
const req = require.context('./svg', true, /\.svg$/)
req.keys().forEach(req)

export default {
  install(app) {
    // 全局注册 SVG 图标组件
    app.component('svg-icon', SvgIcon)
    
    // 开发环境下打印已加载的 SVG
    if (process.env.NODE_ENV === 'development') {
      console.groupCollapsed('[SVG] 已加载的 SVG 图标')
      console.table(
        req.keys().map(path => ({
          '文件名': path.match(/\/([^/]+)\.svg$/)[1],
          '路径': path
        }))
      )
      console.groupEnd()
    }
  }
}