// 这里的后缀都是 .js 因为打包出来的都是js文件，而不是.vue文件，我们要告诉客户端跳转那个js

//  这里的路径和dev.json路径的区别
//  pages里面配置的是路由跳转的地址，也就是dev生成的 dist文件夹下的js bundle路径 从dist/js开始
//  dev.json 的 exports 需要打包的js地址，填入src的需要被打包成js bundle的地址   从src开始

export default {
    'Index': {
        //title: '主页',
        url: '/pages/Index.js'
    },
    'More': {
    	url: '/pages/More.js'
    },
    'UserInfo': {
    	title: '预报港人员维护',
    	url: '/pages/UserInfo.js'
    },
    'Detail':{
        title: '详细信息',
        url: '/pages/Detail.js'
    },
    'AddNewUser':{
        title: '人员新增',
        url: '/pages/AddNewUser.js'
    },
    'InfoMaintain':{
        title: '预报港明细维护',
        url: '/pages/InfoMaintain.js'
    },
    'Info':{
        title:'预报港信息维护',
        url: '/pages/Info.js'
    }
}
