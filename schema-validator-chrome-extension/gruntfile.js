const pageWebpackConfig = require( "./config/webpack/page.webpack.config" );
const pluginWebpackConfig = require( "./config/webpack/plugin.webpack.config" );
const backgroundWebpackConfig = require( "./config/webpack/background.webpack.config" );

module.exports = function( grunt ) {
	grunt.initConfig( {
		webpack: {
			page: pageWebpackConfig,
			plugin: pluginWebpackConfig,
			background: backgroundWebpackConfig,
		},
		copy: {
			views: {
				expand: true,
				cwd: "src/",
				src: [ "views/**/*.html" ],
				dest: "dist/",
			},
			images: {
				expand: true,
				cwd: "src/",
				src: [ "images/**/*.{jpg,gif,png}" ],
				dest: "dist/",
			},
			styles: {
				expand: true,
				cwd: "src/",
				src: [ "styles/**/*.css" ],
				dest: "dist/",
			},
		},
	} );

	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-webpack" );

	grunt.registerTask( "default", [ "copy", "webpack" ] );
};
