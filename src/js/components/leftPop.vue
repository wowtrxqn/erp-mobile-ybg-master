<template>
	<div class="root">
		<div class="user">
			<div class="child">
				<div style="width:104px;height:104px;position:absolute;top:22px;left:199px;border-radius:52px;overflow:hidden;">
					<image style="width:104px;height:104px;" :src="user"></image>
				</div>
				<image style="position:relative;width:150px;height:150px;" :src="yuanhuan"></image>
			</div>
			<div class="child1">
				<!--
				<text style="font-size:24px; color:#ffffff;">{{userId}}</text>
				<text style="height:10px;"></text>
				-->
				<text style="font-size:24px;color:#ffffff;width:450px;text-align:center;height:80px;">{{userName}}</text>
			</div>
		</div>
			<div class="child-list">
				<div class="panel">
					<image :src="notice" style="width:80px;height:80px;"></image>
					<text style="height:15px;"></text>
					<text class="panel-txt">推送通知</text>
				</div>
				<div class="panel">
					<image :src="changepwd" style="width:80px;height:80px;"></image>
					<text style="height:15px;"></text>
					<text class="panel-txt">密码修改</text>
				</div>
				<div class="panel" @click="childcheckupdate">
					<image :src="checkupdate" style="width:80px;height:80px;"></image>
					<text style="height:15px;"></text>
					<text class="panel-txt">检查更新</text>
				</div>
				<div class="panel" @click="childworker">
					<image :src="worker" style="width:80px;height:80px;"></image>
					<text style="height:15px;"></text>
					<text class="panel-txt">客服热线</text>
				</div>
				<div class="panel" @click="childshare">
					<image :src="share" style="width:80px;height:80px;"></image>
					<text style="height:15px;"></text>
					<text class="panel-txt">分享应用</text>
				</div>
				<div class="panel" @click="childlogout">
					<image :src="logout" style="width:80px;height:80px;"></image>
					<text style="height:15px;"></text>
					<text class="panel-txt">退出登陆</text>
				</div>
			</div>
			<div class="noticetel">
				<text class="noticeteltxt" v-if="show">联系电话：56534</text>
			</div>
		<div class="bgfoot"><image style="width:500px;height:200px;" :src="bgf"></image></div>
	</div>
</template>

<script>
import { WxcButton } from 'weex-ui';
export default {
	name:'leftPopComponent',
	data(){
		return {
			yuanhuan : 'bmlocal://assets/yuanhuan.png',
			user : 'bmlocal://assets/cstxx.jpg',
			bgf:'bmlocal://assets/bgf.png',
			notice:'bmlocal://assets/left_over_notice.png',
			changepwd:'bmlocal://assets/left_over_changepwd.png',
			checkupdate:'bmlocal://assets/left_over_checkupdate.png',
			worker:'bmlocal://assets/left_over_worker.png',
			share:'bmlocal://assets/left_over_share.png',
			logout:'bmlocal://assets/left_over_logout.png',
			show:false
		}
	},
	components: { WxcButton },
	props:["userName","userId"],
	created(){

	},
	methods:{
		childcheckupdate(){
			this.$fetch({
	          method: 'GET',   
	          url: 'http://bjtm2.shasteel.cn/app/check?isDiff=1&jsVersion='+weex.config.env.jsVersion+'&appName=eros-app&android=1.0.0'
	        }).then(resData => {
	           if(resData.msg.indexOf('当前版本需要更新')!=-1){
	           		let self=this;
	            	this.$notice.alert({
			            message: '当前版本需要更新',
			            callback() {
					        self.childlogout()
					    }
			          })
	           }else{
	           		this.$notice.toast('已是最新版')
	           }
	        },error => {
	            this.$notice.toast(error)
	        })
		},
		wxcButtonClicked (e) {
        	console.log(e)
      	},
      	childshare(){
      		this.$notice.toast('分享至微信')
      	},
      	childlogout(){
   	 		this.$emit('GuideTowxcPopoverButtonClicked',{'key':'exit','index':2});
      	},
      	childworker(){
      		this.show=true;
      	}
	}
}
</script>

<style scoped>
.noticeteltxt {
	font-size: 24px;
	color: rgba(29,161,242,.8);
}
.noticetel {
	width: 500px;
	height: 100px;
	position: absolute;
	bottom: 200px;
	justify-content: center;
	align-items: center;
}
.panel-txt {
	font-size: 24px;
	color: #ffffff;
}
.panel {
	width: 220px;
	height: 200px;
	justify-content: center;
	align-items: center;
}
.child-list {
	width: 500px;
	height: 600px;
	justify-content: center;
	border-color: red;
	margin-top:0px;
	flex-wrap: wrap;
	flex-direction: row;
}
.root {
	flex: 1;
	justify-content: flex-start;
	background-image: linear-gradient(to bottom, #45afff, #e5fcff);
	/*background-image: linear-gradient(to bottom, lightskyblue, #e5fcff);*/
}
.user {
	/*position: absolute;
	top: 0px;*/
	width: 500px;
	height: 340px;
	padding-top: 100px;
	display: flex;
	flex-wrap: wrap;
	align-content: stretch;
	z-index: 999;
	/*background-color:#45afff;*/
} 
.child {
	flex: 2;
	align-items: center;
}
.child1 {
	flex: 1;
	align-items: center;
	justify-content: center;
	align-content: space-between;
	height: 100px;
}
.bgfoot {
	position: absolute;
	bottom:0px;
	width: 520px;
	height: 200px;
}

</style>