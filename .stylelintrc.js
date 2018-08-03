module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-airbnb', 'stylelint-config-styled-components'],
  rules: {
    'number-leading-zero': 'always',
    'rule-empty-line-before': null,
    'string-quotes': 'single',
    'order/order': [
      { type: 'at-rule' },
      { type: 'at-rule', hasBlock: true },
      'rules',
    ],
  },
};
