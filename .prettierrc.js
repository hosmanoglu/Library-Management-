module.exports = {
	trailingComma: "es5",
	tabWidth: 2,
	semi: true,
	singleQuote: false,
	useTabs: true,
	endOfLine: require("os").EOL === "\r\n" ? "crlf" : "lf",
	printWidth: 120,
	parser: "babel-ts",
};
