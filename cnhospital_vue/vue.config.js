const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
    // 配置devServer
    devServer: {
      host: 'localhost', // 项目运行的ip
      port: 8090, // 项目运行的端口号

      proxy: {
        '^/api': {
            target: 'http://localhost:8080/',//目标接口的前缀
            ws:true,//代理websocked
            changeOrigin:true,//虚拟的站点需要更管origin
            pathRewrite:{
                '^/api':'localhost:8080'//重写路径
            }
        }
    },
    client: {
      overlay: false
    }

    },

  
})
