// const path = require('path')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    port: 9000,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/django": {
				pathRewrite: {'/django/' : ''},
				// pathRewrite: function(path, req) {
				// 	console.log('path', path)
				// 	// console.log('req', req)
				// 	if(path.indexOf("/django/" >= 0)) {
				// 		const replacedPath = path.replace("/django/", "")
				// 		console.log('replacedPath', replacedPath)
				// 		return replacedPath
				// 	}
				// },
        "target": "http://localhost:9010/",
      },
      "/node": {
				pathRewrite: function(path, req) {
					console.log('path', path)
					// console.log('req', req)
					if(path.indexOf("/node/" >= 0)) {
						const replacedPath = path.replace("/node/", "")
						console.log('replacedPath', replacedPath)
						return replacedPath
					}
				},
        "target": "http://localhost:9020",
        "secure": false
      }
    }
	},
	
  configureWebpack: {
    module: {
      rules: []
    },
    plugins: []
  },
  // "transpileDependencies": [
  //   "vuetify"
  // ],
  // chainWebpack: config => {
	// 	config
	// 		.plugin('html')
	// 		.tap(args => {
	// 				args[0].title = "Patient Payment Portal";
	// 				return args;
	// 		})
	// },
}
