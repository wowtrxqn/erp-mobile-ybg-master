export default {
	/********************************************
	//预报港人员信息列表
    'getUserList': 'user.js',
    //人员标识数据
    'getLabelList' : 'label.js',
    'login' : 'login.js'
    /********************************************/

    //----------------登陆/用户api接口-----------------------

    //登录
    login : 'EiService?type=mobile&service=EP50&method=mobileLoad&$$Login$$=true',
    
    //注销
    logout: 'logout.jsp',

    //获取当前用户信息
    getCurrentUser : 'EiService?type=mobile&service=WEEXUser&method=GetCurrentUser',

    //修改密码
    updatePassword : 'EiService?type=mobile&service=BCBA01&method=changePassword',

    //登陆日志
    log : 'EiService?type=mobile&service=WEEXUser&method=Log',


    //-----------------业务功能api接口------------------

    //查询所有预报港人员
    selectMaintainAll : 'EiService?type=mobile&service=WEEXMaintain&method=SelectMaintain',

    //删除预报港人员
    delMaintain : 'EiService?type=mobile&service=WEEXMaintain&method=DelMaintain',

    //新增预报港人员

    addMaintain : 'EiService?type=mobile&service=WEEXMaintain&method=AddMaintain',

    //报港人员明细更改
    updateMaintain : 'EiService?type=mobile&service=WEEXMaintain&method=UpdateMaintain',



    //废钢预报钢

    /****************************** 弹窗选择label组件 ******************************/

    //车俩类型
    carType : 'EiService?type=mobile&service=WEEX03&method=SelectCarType',

    //废钢种类
    scrapType : 'EiService?type=mobile&service=WEEX03&method=SelectScrapType',

    //车皮异常信息
    wagonType : 'EiService?type=mobile&service=WEEX03&method=SelectWagonType',

    //产地
    originType : 'EiService?type=mobile&service=WEEX03&method=SelectOrigin',

    //业务代表
    business : 'EiService?type=mobile&service=WEEX03&method=SelectPeople',

    //录入状态
    statusType : 'EiService?type=mobile&service=WEEX03&method=SelectStatus',

    /****************************** 预报港操作 ******************************/

    //预报港查询
    selectMiniInfo : 'EiService?type=mobile&service=WEEX03&method=SelectMiniInfo',

    //预报港新增
    addInfo : 'EiService?type=mobile&service=WEEX03&method=AddInfo',

    //删除预报港
    delInfo : 'EiService?type=mobile&service=WEEX03&method=DelInfo',

    //更新预报港明细
    updateInfo : 'EiService?type=mobile&service=WEEX03&method=UpdateInfo',

    //车俩提交
    submit : 'EiService?type=mobile&service=WEEX03&method=UpdateSt'

}