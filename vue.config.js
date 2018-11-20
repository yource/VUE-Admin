// 测试环境的ip，默认为""
const PROD_URL = "";

module.exports = {
    lintOnSave: false,
    configureWebpack: config => {},
    css: {
        loaderOptions: {
            // 配置公共scss样式文件
            sass: {
                data: `@import "@/assets/css/theme.scss";`
            }
        }
    },
    chainWebpack: config => {
        // 将测试环境ip混入webpakck变量
        config.plugin('define').tap(args => {
            args[0]['process.env'].PROD_URL = "'" + PROD_URL + "'";
            return args;
        });
        // 启用mockjs
        if (process.env.NODE_ENV === 'development' && !PROD_URL) {
            config.entry('app').add('./src/mock/index.js')
        }
    },
    devServer: PROD_URL ? {
        open: true,
        // 为api开头的接口配置跨域
        proxy: {
            '/api': {
                target: PROD_URL,
                changeOrigin: true
            }
        }
    } : { open: true }
}