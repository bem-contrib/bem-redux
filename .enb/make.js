'use strict';

module.exports = function (config) {
  config.includeConfig('enb-bem-specs');
  var specs = config.module('enb-bem-specs').createConfigurator('specs');

  specs.configure({
    destPath: 'common.specs',
    levels: ['common.blocks'],
    sourceLevels: [
      { path: 'libs/bem-core/common.blocks', check: false },
      { path: 'libs/bem-pr/spec.blocks', check: false },
      'common.blocks'
    ],
    jsSuffixes: ['js', 'vanilla.js']
  })
};
