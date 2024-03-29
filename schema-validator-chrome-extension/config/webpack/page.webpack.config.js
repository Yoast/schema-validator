const path = require( "path" );

module.exports = {
	entry: "./src/scripts/page/page.ts",
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
		filename: "page.js",
		path: path.resolve( __dirname, "../../dist/scripts/page" ),
	},
};
