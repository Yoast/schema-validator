const path = require( "path" );

module.exports = {
	entry: "./src/scripts/plugin/plugin.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [ ".tsx", ".ts", ".js" ],
	},
	output: {
		filename: "plugin.js",
		path: path.resolve( __dirname, "../../dist/scripts/plugin" ),
	},
};
