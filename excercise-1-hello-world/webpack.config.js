const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
	plugins: [new HtmlWebpackPlugin()],
	module: {
	rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
					presets: ['@babel/preset-env']
					}
				}
			},
			{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			}
		]
	}
};