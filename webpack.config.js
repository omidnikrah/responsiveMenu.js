const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const VENDOR_LIBS = [
	'react', 'react-dom'
];

const config = {
	entry: {
		bundle: './src/App.js',
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/[name].[chunkhash].js'
	},
	module: {
		rules: [{
			use: 'babel-loader',
			exclude: /node_modules/,
			test: /\.js$/
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader'
				}, {
					loader: 'autoprefixer-loader'
				}, {
					loader: "sass-loader"
				}]
			})
		},{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader'
				}]
			})
		},{
			use: [
				  {
					loader : 'url-loader',
					options : { 
					  limit : 10000,
					  outputPath: 'images/' 
					}
				  },
				  'image-webpack-loader',
				],
			exclude: /node_modules/,
			test: /\.(gif|jpe?g|png)(\?.*)?$/
		  }, {
			use: [{
				loader: 'file-loader',
				options: {
					outputPath: 'fonts/'
				}
			}],
			exclude: /node_modules/,
			test: /\.(woff2|woff|eot|ttf|svg)$/
		}]
	},
	devServer: {
		port: 2828,
		historyApiFallback: true
	},
	plugins: [
		new ExtractTextPlugin("style.css"),
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest"],
			filename: "js/[name].[chunkhash].js",
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html'
		})
	]
};

module.exports = config;