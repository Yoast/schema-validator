module.exports = function (grunt) {
	grunt.initConfig({
		copy: {
			views: {
				expand: true,
				cwd: "src/",
				src: ["views/**/*.{html,css,png}"],
				dest: "dist/"
			},
			styles: {
				expand: true,
				cwd: "src/",
				src: ["styles/**/*.{html,css,png}"],
				dest: "dist/"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", ["copy"]);
};
