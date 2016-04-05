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
        jsSuffixes: ['js', 'vanilla.js'],
        scripts: ['https://yastatic.net/jquery/1.8.3/jquery.min.js',
            'https://yastatic.net/lodash/2.4.1/lodash.min.js']
    });
};
