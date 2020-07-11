/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const { override, addWebpackAlias } = require('customize-cra');

const eslintConfig = require('./.eslintrc.js');

const useEslintConfig = (configRules) => (config) => {
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.use && rule.use.some((use) => use.options && use.options.useEslintrc !== void 0)) {
      const ruleUse = rule.use[0];
      const baseOptions = ruleUse.options;
      const baseConfig = baseOptions.baseConfig || {};

      ruleUse.options = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...configRules },
      };
      return rule;
    } else {
      return rule;
    }
  });
  return config;
};

module.exports = override(
  useEslintConfig(eslintConfig),
  addWebpackAlias({
    ['src']: path.resolve(__dirname, 'src'),
  }),
);
