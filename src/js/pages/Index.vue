<template>
	<div class="root">
		<div class="head">
			<div class="leftPopBtn" @click="openLeftPopup"><image style="width:40px;height:40px;" :src="headmenu"></image></div>
			<div class="headcenter">
				<image style="width:24px;height:24px;" :src="work"></image>
				<text class="headmiddle">掌上办公</text>
			</div>
			<div class="rightBtn" @click="rightButtonClick">
				<image style="width:40px;height:40px;" :src="headright"></image>
				<wxc-popover ref="wxc-popover"
                 :buttons="btns"
                 :position="popoverPosition"
                 :arrowPosition="popoverArrowPosition"
                 :textStyle="txt"
                 @wxcPopoverButtonClicked="popoverButtonClicked"></wxc-popover>
			</div>
		</div>
		<div class="main">
			<div class="welcome">
        <div class="welline">
				  <text class="wel">Welcome </text>
          <text style="font-size:30px;">[{{userId}}]</text>
        </div>
				<text class="come">欢迎来到掌上废钢预报管理</text>
			</div>
			<div class="fn">
				<div class="block" @click="all()">
					<div class="inner">
						<div class="innerleft">
							<text style="width:50px;"></text>
							<image style="height:40px;width:40px;" :src="one"></image>
							<text style="width:10px;"></text>
							<text>综合查询</text>
						</div>
						<div class="inneright">
							<image :src="arror" style="width:30px;height:30px;"></image>
							<text style="width:50px;"></text>
						</div>
					</div>
					<!--<text class="detail">查询明细信息</text>-->
				</div>
				<div class="block" @click="userInfo">
					<div class="inner">
						<div class="innerleft">
							<text style="width:50px;"></text>
							<image style="height:40px;width:40px;" :src="two"></image>
							<text style="width:10px;"></text>
							<text>废钢预报港人员维护</text>
						</div>
						<div class="inneright">
							<image :src="arror" style="width:30px;height:30px;"></image>
							<text style="width:50px;"></text>
						</div>
					</div>
					<!--<text class="detail">查询明细信息</text>-->
				</div>
				<div class="block end" @click="infos">
					<div class="inner">
						<div class="innerleft">
							<text style="width:50px;"></text>
							<image style="height:36px;width:36px;" :src="three"></image>
							<text style="width:10px;"></text>
							<text>废钢预报港维护</text>
						</div>
						<div class="inneright">
							<image :src="arror" style="width:30px;height:30px;"></image>
							<text style="width:50px;"></text>
						</div>
					</div>
					<!--<text class="detail">查询明细信息</text>-->
				</div>

<!--
				<div class="block end" @click="more">
					<div class="inner">
						<div class="innerleft">
							<text style="width:50px;"></text>
							<image style="height:40px;width:40px;" :src="four"></image>
							<text style="width:10px;"></text>
							<text>more</text>
						</div>
						<div class="inneright">
							<image :src="arror" style="width:30px;height:30px;"></image>
							<text style="width:50px;"></text>
						</div>
					</div>

					<!--<text class="detail">更多功能上线中</text>-->
				<!--
        </div>

      -->
			</div>
		</div>
		<!--
		<div class="container">
			<div ref="box" class="box" @touchstart="ontouchstart">
				<image style="width:600px;height:450px;" :src="card"></image>
			</div>
		</div>
		-->
		<div class="foot">
			<div class="seperator">
				<image :src="alpha" style="width:700px;height:30px;"></image>
				<text style="color:#cccccc;font-size:24px;">#我是有底线的#</text>
			</div>
		</div>
		<wxc-popup width="500"
                 :show="isLeftShow"
                 @wxcPopupOverlayClicked="popupOverlayLeftClick"
                 pos="left">
       		<leftPop @GuideTowxcPopoverButtonClicked="transmitParent($event)" :userName="userName" :userId="userId"></leftPop>
       	</wxc-popup>
	</div>
</template>

<script>
import { WxcPopup , WxcPopover } from 'weex-ui';
import leftPop from '../components/leftPop';
//安卓自定义退出APP
module.exports = {
  components:{ 
  	WxcPopup,
  	leftPop,
  	WxcPopover
  },
  data: () =>({
    userpic : 'bmlocal://assets/defaultimage.png',
    headmenu : 'bmlocal://assets/menu.png',
    headright : 'bmlocal://assets/defaultimage.png',
    work : 'bmlocal://assets/work.png',
    one : 'bmlocal://assets/1.png',
    two : 'bmlocal://assets/2.png',
    three : 'bmlocal://assets/3.png',
    four : 'bmlocal://assets/4.png',
    alpha : 'bmlocal://assets/alpha.png',
    //card : 'bmlocal://assets/card.png',
    arror : 'bmlocal://assets/arror.png',
    isLeftShow: false,
    btns:[
    	{
     		icon: 'bmlocal://assets/upload.png',
     		text:'上传头像',
     		key:'upload'
    	},
    	{
      		icon: 'bmlocal://assets/bigger.png',
      		text:'查看大图',
      		key:'show'
    	},
    	{
      		icon: 'bmlocal://assets/logout.png',
      		text:'退出登陆',
      		key:'exit'
    	},
  	],
    txt:{
      'font-size':'26',
      'color':'#999999'
    },
    userName: '加载中',
    userId: '加载中',
  	popoverPosition:{x:-14,y:130},
  	popoverArrowPosition:{pos:'top',x:-15},
    curHomeBackTriggerTimes:1,
    maxHomeBackTriggerTimes:2,
    statusBarHeight: weex.config.eros.statusBarHeight ? weex.config.eros.statusBarHeight : 40,
    touchBarHeight: weex.config.eros.touchBarHeight ? weex.config.eros.touchBarHeight : 20
  }),
  created(){
  	//this.$router.setHomePage('/pages/App.js');
  	//安卓自定义退出App
  	this.$fetch({
    	method: 'POST',   
        name: 'getCurrentUser'
    }).then(resData => {
    	 if(resData.status >= 0){
          this.userId = resData.data[0].companyNum;
          this.userName = resData.data[0].suppName;
          this.$storage.set("suppId",resData.data[0].suppId);
          this.$storage.set("suppName",resData.data[0].suppName);
       }
    },error => {

    })
	  this.androidFinishApp()
  },
  methods:{
    all(){
      this.$notice.toast('没有数据')
    },
  	openLeftPopup () {
    	this.isLeftShow = true;
  	},
  	popupOverlayLeftClick () {
        this.isLeftShow = false;
  	},
  	rightButtonClick () {
	    this.$refs['wxc-popover'].wxcPopoverShow();
  	},
  	popoverButtonClicked (obj) {
    	//this.$notice.loading.show(`key:${obj.key}, index:${obj.index}`);
    	switch(obj.key){
    		case "exit":
    			//调用退出api
    			this.$fetch({	
            		method: 'POST',   
            		name: 'logout'
       	 	})
          this.$storage.delete('suppId');
          this.$storage.delete('suppName');
       	 	this.$router.setHomePage('/pages/App.js');
    			break;
    		case "show":
    			break;
    		case "upload":
    			/*
    			this.$fetch({
			    	method: 'POST',   
			        name: 'getCurrentUser'
			    }).then(resData => {
			    	this.$notice.loading.show(resData);
			    },error => {})
			    */
			    this.$image
                .pickAndUpload({
                    url: '',
                    maxCount: 3,
                    imageWidth: 1000,
                    allowCrop: true,
                    params: {},
                    header: {}
                }).then(
                    resData => {
                        this.$notice.toast({
                            message: '上传成功'
                        });                    },
                    error => {
                        this.$notice.toast({
                            message: '上传失败:' + error.errorMsg
                        });
                    }
                );
    			break;
    	}
  	},
  	//子组建调用执行的退出登陆事件
  	transmitParent($event){
  		this.popoverButtonClicked($event);
  	},
  	more() {
  		this.$router.open({
        	name: 'More'
        })
  	},
  	userInfo() {
      	this.$router.open({
            name: 'UserInfo'
        })
  	},
    infos(){
        this.$router.open({
            name: 'Info'
        })
    },  
  	androidFinishApp () {
        const globalEvent = weex.requireModule('globalEvent');
        globalEvent.addEventListener('homeBack', options => {
            if(this.curHomeBackTriggerTimes === this.maxHomeBackTriggerTimes){
              /*
              this.$fetch({ 
                method: 'POST',   
                name: 'logout'
              })
              */
              //this.$router.setHomePage('/pages/App.js');
            	this.$router.finish();
        	}else{
	            this.curHomeBackTriggerTimes++
	            this.$notice.toast({ message: `再按一次，退出应用` })
	        }
        })
  	}
  }
}
</script>
<style lang="scss" src='../css/index.scss'></style>