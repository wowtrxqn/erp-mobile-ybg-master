// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
    'eslint': false,
    'webpackWarnings': false,
    'exports': [
        // appBoard
        'js/config/index.js',
        // mediator
        'js/mediator/index.vue',
        // home
        'js/pages/App.vue',
        //eros
        "js/pages/Index.vue",
        "js/pages/More.vue",
        "js/pages/UserInfo.vue",
        "js/pages/Detail.vue",
        "js/pages/AddNewUser.vue",
        "js/pages/InfoMaintain.vue",
        "js/pages/Info.vue"
    ],
    'alias': {
        'Components': 'js/components',
        'Common': 'js/common',
        'Config': 'js/config',
        'Widget': 'js/widget',
        'Pages': 'js/pages',
        'Utils': 'js/utils'
    },
    'diff': {
        'pwd': '/AppBundle',
        'proxy': 'http://bjtm2.shasteel.cn/static/diff/'
    },
    'server': {
        'path': './',
        'port': 8889
    },
    'mockServer': {
        'port': 52077,
        'mockDir': './dist/mock'
    },
    'socketServer': {
        'port': 8890,
        'switch': true
    }
}
