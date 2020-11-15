module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.*?.json", "e2e/tsconfig.json"],
        createDefaultProgram: true,
      },
      extends: [
          "plugin:@angular-eslint/recommended", 
          "airbnb-typescript/base",
          "prettier/@typescript-eslint",
          "plugin:prettier/recommended",
      ],
      rules: {
        "import/prefer-default-export": "off",
        "@typescript-eslint/lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
        "@typescript-eslint/no-explicit-any": "error",
        "class-methods-use-this": "off",
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
          },
        ],
      },
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { code: 140 }],
      },
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"],
    },
  ],
};
