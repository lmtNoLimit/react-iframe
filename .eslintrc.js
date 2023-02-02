module.exports = {
    "root": true,
    "ignorePatterns": [],
    "overrides": [
      {
        "files": ["*.ts", "*.tsx"],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
          "project": "tsconfig.json",
          tsconfigRootDir: __dirname,
          sourceType: 'module'
        },
        "extends": ["plugin:@typescript-eslint/recommended", "@typescript-eslint/parser", "plugin:prettier/recommended"],
        "rules": {
          "max-len": "off",
          "no-underscore-dangle": "off",
          "arrow-body-style": "off",
          "@typescript-eslint/no-explicit-any": "off",
          "@typescript-eslint/no-unsafe-assignment": "off",
          "@typescript-eslint/no-unsafe-member-access": "off",
          "@typescript-eslint/no-unsafe-call": "off",
          "@typescript-eslint/unbound-method": "off",
          "@typescript-eslint/no-floating-promises": "off",
          "@typescript-eslint/explicit-module-boundary-types": "off",
          "@typescript-eslint/no-unused-vars": "warn",
          "@typescript-eslint/naming-convention": "warn",
          "@typescript-eslint/no-unsafe-return": "off",
          "@typescript-eslint/no-empty-function": "off",
          "@typescript-eslint/no-inferrable-types": "off",
          "@typescript-eslint/restrict-template-expressions": "warn",
          "jsdoc/newline-after-description": "off"
        }
      }
    ]
  }
  