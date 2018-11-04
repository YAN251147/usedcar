const VueLoaderPlugin = require('vue-loader/lib/plugin')



//配置参考：https://webpack.js.org/configuration/
module.exports = {
	mode: "development", 
	entry: "./app/main.js",
	output: {
	    filename: "bundle.js",  
	    publicPath: "xuni"
  	},
  	module : {
  		rules : [
  			{
  				test : /\.vue$/ ,
  				loader : "vue-loader"
  			},
  			{
	            test: /\.less$/,
	            use: [
		            {
		                loader: "style-loader" 
		            }, 
		            {
		                loader: "css-loader" 
		            }, 
		            {
		                loader: "less-loader" ,options: {
                                              strictMath: true,
                                              noIeCompat: true
                                              } 
		            },

	            ]
	        },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
  		]
  	},
	plugins: [
		new VueLoaderPlugin() 
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	devServer : {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api' : ''}
			}
		}
	}
}