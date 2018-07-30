<template>
	<div class="root">
		<!--
		<wxc-loading :show="isShow" type="trip">{{caseType}}</wxc-loading>
		
		<text class="title">{{title}}</text>
		-->
		
			<!--
			<wxc-grid-select
    			:single="true"
    			:cols="5"
    			:customStyles="customStyles"
    			:list="testData"
    			@select="params => onSelect(params)">
  			</wxc-grid-select>
  			-->
  		<div class="block">
  			<text class="txtx">预报日期:</text>
  			<input type="text" class="txt" :value="carArrive" placeholder="输入或选择日期(YYYYMMDD)" @input="AssignVal('carArrive',$event)"></input>
  			<div class="pic" @click="dataPicker()">
  				<image src="bmlocal://assets/date.png" style="width:35px;height:35px;"></image>
  			</div>
  		</div>
  		<div class="block">
			<text class="txtx">车牌号码:</text>
			<input type="text" class="txt" :value="carNumber" @input="AssignVal('carNumber',$event)"></input>
			<div class="pic"></div>
  		</div>
  		<div class="block">
			<text class="txtx">废钢种类:</text>
			<input type="text" class="txt" :value="scrapType" @input="AssignVal('scrapType',$event)"></input>
			<div class="pic" @click="selectOption('scrapType')">
				<image src="bmlocal://assets/arror.png" style="width:35px;height:35px;"></image>
			</div>
  		</div>
  		<div class="block">
			<text class="txtx">预报状态:</text>
			<input type="text" class="txt" :value="statusType" @input="AssignVal('statusType',$event)"></input>
			<div class="pic" @click="selectOption('statusType')">
				<image src="bmlocal://assets/arror.png" style="width:35px;height:35px;"></image>
			</div>
  		</div>
  		<wxc-button text="搜 索"
  			  type="white"
  			  :btn-style="btnStyle"
  			  :text-style="textStyle"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  		<wxc-popup :show="inner"
  				 ref="innerPop"
                 pos="top"
                 :animation="{timingFunction:'ease-out'}"
                 height="500"
                 have-overlay="false"
                 @wxcPopupOverlayClicked="innerlayTopClick">
            <inner :caseType="caseType" @emitSelect="emitCaseSelect($event)"></inner>
       </wxc-popup>
	</div>
</template>

<script>
const dateTimePicker = weex.requireModule('dateTimePicker');
import inner from '../components/inner.vue';
import { WxcPopup , WxcButton  } from 'weex-ui';
export default {
	name:'search',
	components : {
		WxcPopup,
		WxcButton,
		inner
	},
	data:() => ({
		carArrive:'',
		inner:false,
		carNumber:'',
		scrapType:'',
		statusType:'',
		caseType:''
	}),
 	computed: {
      btnStyle(){
        const btn = {};
        btn.width = '190px';
        btn.height = '70px';
        btn.marginTop = '35px';
        btn.borderColor = '#666666';
        btn.borderRadius='35px'
        btn.border='0px';
        btn.marginLeft='400px';
        btn.borderBottom='1px';
        return btn;
      },
      textStyle(){
      	const text = {};
      	text.fontSize= '25px';
      	return text
      }
  	},
	methods:{
		wxcButtonClicked(){
			let json={};
			json['q_carArrive'] = this.carArrive;
			json['q_carNumber'] = this.carNumber;
			json['q_scrapType'] = this.scrapType;
			json['q_statusType'] = this.statusType.split('-')[0];
			this.$emit('toParentSearch',json);
		},
		AssignVal(type,e){
			this[type]=e.value;
		},
		selectOption(type){
			this.caseType=type;
			this.inner = true;
		},
		emitCaseSelect(json){
			this[json.type]=json.value;
			this.$refs.innerPop.hide();
		},
		dataPicker(){
			dateTimePicker.open({
		        value: '',//必选,选中的值，格式为yyyy-MM-dd HH:mm，当value为空，默认选中当前时间，当value不为空，选中value的值
		        max: '',//可选，日期最大值，默认2099-12-31 23:59
		        min: '2001-01-01 00:00',//可选，日期最小值，默认1900-12-31 00:00
		        title: '',//可选，标题的文案，默认为空
		        titleColor: '',//可选，默认为空，title不为空时有效，颜色值（#313131）
		        confirmTitle: '', //确认按钮的文案，默认值（完成）
		        confirmTitleColor: '', //确认按钮的文字颜色，默认值(#00b4ff)
		        cancelTitle: '', //取消按钮的文案，默认值（取消）
		        cancelTitleColor: '', //取消按钮的文字颜色，默认值(#313131)
		      },(res) =>{//回调
		        //result{string}：success，cancel
		        //data {string}：格式为yyyy-MM-dd HH:mm

		        if(res.result === "success"){
		          let result=res.data.split(' ')[0].replace(/-/g,'');
		          this.carArrive = result;
		        }else{
		          this.carArrive = '';
		        }
		      });
		},
		innerlayTopClick(){
			/*
			let self=this;
			this.$refs.innerPop.hide()
			setTimeout(()=>{
				self.inner = false
			},500)
			*/
			this.inner = false;
		}
	}
}
</script>

<style scoped>
.last {
	border-bottom-width: 0;
}
.pic {
	flex:0.1;
	justify-content: center;
	align-items: center;
}
.txt {
	font-size: 25px;
	height: 80px;
	width: 400px;
	flex:0.7;
}
.txtx {
	width: 120px;
	font-size: 25px;
	color: #666666;
	flex:0.2;
	margin-top: 5px;
}
.block {
	border-bottom-width: 1px;
	height: 80px;
	width: 590px;
	flex-direction: row;
	align-items: center;
}
.root {
	padding-top: 30px;
	padding-bottom: 50px;
	padding-left: 80px;
	padding-right: 80px;
	height: 500px;
}
</style>