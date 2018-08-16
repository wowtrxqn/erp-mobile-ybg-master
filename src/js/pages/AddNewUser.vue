<template>
	<div>
		<div class="top">
			<text style="width:20px;"></text>
			<image :src="location" style="width:40px;height:40px;"></image>
			<text style="width:20px;"></text>
			<div class="title"><text style="font-size:22px;color:#999999;">< 新增 > 添加新的预报港人员</text></div>
		</div>
		<div class="data">
			<div class="block">
				<div style="flex:0.2;" class="labelicon">
					<image :src="people" class="icon"></image>
				</div>
				<div style="flex:0.7">
					<input class="txt" type="text" placeholder="输入用户名" @input="AssignName($event)"/>
				</div>
				<div style="flex:0.1"></div>
			</div>
			<div class="block">
				<div style="flex:0.2" class="labelicon">
					<image :src="type" class="icon"></image>
				</div>
				<div style="flex:0.7" @click="select('label')">
					<text class="txtx">{{label}}</text>
				</div>
				<div style="flex:0.1">
					<image :src="more" style="width:30px;height:30px;"></image>
				</div>
			</div>
			<div class="block">
				<div style="flex:0.2" class="labelicon">
					<image :src="phone" class="icon"></image>
				</div>
				<div style="flex:0.7">
					<input class="txt" type="text" placeholder="输入电话号码" @input="AssignTel($event)"/>
				</div>
				<div style="flex:0.1"></div>
			</div>
			<div class="block last">
				<div style="flex:0.2" class="labelicon">
					<image :src="card" class="icon"></image>
				</div>
				<div style="flex:0.7">
					<input class="txt" type="text" placeholder="输入身份证号码" @input="AssignIdcard($event)"/>
				</div>
				<div style="flex:0.1"></div>
			</div>
		</div>
		<div class="foot">
			 <wxc-button text="添加" type="blue" :btn-style="btnStyle"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
		</div>
		<wxc-loading :show="overlay"
                 type="trip"
                 loading-text="执行中"
                 need-mask="true"></wxc-loading>
		<wxc-popup popup-color="rgb(255, 255, 255)"
				   ref="bottomPop"
	               :show="isBottomShow"
	               @wxcPopupOverlayClicked="popupOverlayBottomClick"
	               pos="bottom"
	               height="400">
	      <div v-if="isActive">
	        <labelSelect :labelValue="label" @labelChange="changeLabelProp($event)"></labelSelect>
	      </div>
	      <div v-if="!isActive">
	      	<!--
	        <supplierSelect></supplierSelect>
	    	-->
	      </div>
	    </wxc-popup>
	</div>
</template>

<script>
import labelSelect from '../components/labelSelect.vue';
import { WxcCell , WxcButton , WxcPopup , WxcLoading } from 'weex-ui';
export default {
	components:{
		WxcCell,
		WxcButton,
		WxcPopup,
		WxcLoading,
		labelSelect
	},
	data: ()=>({
		location:'bmlocal://assets/location.png',
		people:'bmlocal://assets/people.png',
		type:'bmlocal://assets/type.png',
		phone: 'bmlocal://assets/tel.png',
		card: 'bmlocal://assets/idcard.png',
		supp: 'bmlocal://assets/supplier.png',
		more: 'bmlocal://assets/arror.png',
		id:'',
		name:'',
		tel:'',
		idcard:'',
		label:'请选择',
		btnBgColor:'#1DA1F2',
		opacity:'0.9',
		isBottomShow: false,
		isActive: true,
		overlay:false,
	}),
	computed:{
		btnStyle(){
			const { btnBgColor , opacity } = this;
			const customStyle = {};
			if(btnBgColor){
				customStyle.backgroundColor = btnBgColor;
			}
			if(opacity){
				customStyle.opacity = opacity;
			}
			return customStyle;
		}
	},
	created(){
		this.$router.setBackParams({
			action:'add'
		})
	},
	methods:{
		checkIdcard(){
			let str=this.idcard.trim();
			if(str=='' || /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)){
				return true
			}
			return false
		},
		checkPhone(){
			if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel.trim())){
        		return true
        	}
        	return false
		},
		select(type){
			switch(type){
				case 'label':
					this.isActive = true;
					this.isBottomShow = true;
					return;
				case 'supp':
					this.isActive = false;
					this.isBottomShow = true;
					return;
			}
		},
		popupOverlayBottomClick () {
        	this.isBottomShow = false;
      	},
      	changeLabelProp(propValue){
      		this.label = propValue;
      		this.$refs.bottomPop.hide();
      	},
      	AssignName(e){
      		this.name=e.value;
      	},
      	AssignTel(e){
      		this.tel=e.value;
      	},
      	AssignIdcard(e){
      		this.idcard=e.value;
      	},
      	wxcButtonClicked(){
      		if(this.name.trim()==''){
      			this.$notice.alert({
          			message: '请输入名字'
        		})
        		return
      		}
      		if(this.label == '请选择'){
      			this.$notice.alert({
          			message: '请选择标识'
        		})
        		return
      		}
      		if(!this.checkPhone()){
				this.$notice.alert({
          			message: '手机号非法'
        		})
        		return
      		}
      		if(!this.checkIdcard()){
      			this.$notice.alert({
          			message: '身份证非法'
        		})
        		return
      		}
      		this.overlay = true;
      		let data={};
      		data.q_name=this.name;
      		data.q_label=this.label == '客户' ? 'K' : 'J';
      		data.q_tel=this.tel;
      		data.q_idcard=this.idcard ? this.idcard : ' ';
      		this.$fetch({
			    method: 'POST',   
			    name: 'addMaintain',
			    data:data
			}).then(resData => {
				this.overlay = false;
				if(resData.status == 1 && resData.count == 1){
      				this.$notice.toast('新增成功')
				}
			}, error => {
				this.overlay = false;
			    this.$notice.toast('error happened');
			})
      	}
	}
}

</script>

<style scoped>
.txtx {
	color: #666666;
}
.txt {
	color: #666666;
	height: 120px;
}
.labelicon {
	justify-content: center;
	align-items: center;
}
.icon {
	height: 40px;
	width: 40px;
}
.top {
	height: 120px;
	width: 750px;
	flex-direction: row;
	align-items: center;
}
.title {
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.block {
	flex-direction: row;
	height: 100px;
	border-bottom-width: 1px;
	border-bottom-color: #cccccc;
	align-items: center;
	background-color: #ffffff;
}
.last {
	border-bottom-width: 0;
}
.foot {
	/*position: absolute;
	bottom: 0;
	height: 120px;
	width: 750px;
	border-top-width: 1px;
	border-top-color: #cccccc;*/
	height: 200px;
	align-items: center;
	justify-content: center;
}
</style>