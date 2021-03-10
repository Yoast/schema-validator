const path = require( "path" );

module.exports = {
	entry: "./src/scripts/background/background.ts",
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
		filename: "background.js",
		path: path.resolve( __dirname, "../../dist/scripts/background" ),
	},
	node: {
		tls: "empty",
		fs: "empty",
		net: "empty",
	},
};
