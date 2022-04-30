/* 别名配置 
   当从App.vue引入assets下的css文件时可以不用再加上“./”
   直接"assets/css/base.css"即可，
   会自动从“@/assets”搜索到assets下的css文件 */
   module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          assets:'@/assets',
          common:'@/common',
          components:'@/components',
          network:'@/network',
          views:'@/views',
        }
      }
    }
  }