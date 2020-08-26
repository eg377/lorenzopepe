module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: { jsx: true },
	},
	env: {
		browser: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier",
	],
	rules: {
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"jsx-a11y/label-has-associated-control": [
			"error",
			{
				labelComponents: [],
				labelAttributes: [],
				controlComponents: [],
				assert: "either",
				depth: 25,
			},
		],
		"@typescript-eslint/no-explicit-any": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
