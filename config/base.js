const webpack = require('webpack');
const { resolve } = require('path');

module.exports = function(env) {
	return {
		output: {
		  // the output bundle
		  path: resolve(__dirname, '../dist'),
		},
		module: {
			rules: [
				{
				  	test: /\.js$/,
				  	use: 'babel-loader',
				  	exclude: /node_modules/
				},
				{
				  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				  use: [{
				  	loader:'url-loader',
					  options: {
					    limit: 10000,
					    name: 'images/[name].[hash:7].[ext]'
					  }
					}]
				},
				{
				  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				  use: [{
				  	loader:'url-loader',
					  options: {
					    limit: 10000,
					    name: 'fonts/[name].[hash:7].[ext]'
					  }
					}]
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
			    'process.env': {
			        'NODE_ENV': JSON.stringify( env == 'prod' ? 'production' : env)
			    }
			}),
		]
	}
}