module.exports = function (grunt) {
	grunt.initConfig({
		copy: {
			views: {
				expand: true,
				cwd: "src/",
				src: ["views/**/*.html"],
				dest: "dist/"
			},
			images: {
				expand: true,
				cwd: "src/",
				src: ["images/**/*.{jpg,gif,png}"],
				dest: "dist/"
			},
			css: {
				expand: true,
				cwd: "src/",
				src: ["images/**/*.css"],
				dest: "dist/"
			},
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", ["copy"]);
};