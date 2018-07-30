<template>
	<div class="root">
		<!--
		<wxc-loading :show="isShow" type="trip">{{caseType}}</wxc-loading>
		-->
		<div class="top">
			<text class="title">{{title}}</text>
			<input type="text" class="search" placeholder=" 搜索" @input="searchstart($event)"/>
		</div>
		
			<!--
			<wxc-grid-select
    			:single="true"
    			:cols="5"
    			:customStyles="customStyles"
    			:list="testData"
    			@select="params => onSelect(params)">
  			</wxc-grid-select>
  			-->
  		<div class="listul">
	  		<list ref="scroller" :showRefresh="true" @refresh="onrefresh" @loadmore="loadnext">
	  			<cell v-for="item in people" class="outer">
	  				<div class="block" @click="childEmit($event)">
	  					<div class="up">
	  						<text class="txt">姓名:{{item.name}}</text>
	  						<text class="txt">电话:{{item.tel}}</text>
	  					</div>
	  					<div class="seperator"></div>
	  					<div class="down">
	  						<text class="txt" v-if="item.idcard == ' '">此人未留身份证</text>
	  						<text class="txt" v-else>身份证:{{item.idcard}}</text>
	  					</div>
	  				</div>
	  			</cell>
	  		</list>
	  	</div>
  		<div class="foot">
  			<text class="tooltip">选择业务代表后，电话和身份证自动填入</text>
  		</div>
  		<wxc-loading :show="overlay"
                 type="trip"
                 loading-text="加载中"></wxc-loading>
	</div>
</template>

<script>
import { WxcLoading } from 'weex-ui';
export default {
	name:'people',
	components : {
		WxcLoading
	},
	props:['caseType'],
	data:() => ({
		overlay:false,
		people:[],
		title:'选择业务代表',
		currentPage:1,
		svalue:''
	}),
	created(){
		this.$fetch({
			method: 'POST',
			name: 'business'
		}).then(resData => {
			if(resData.status == 0 && resData.count > 0){
				this.people=resData.data;
			}else{
				this.$notice.toast('没有数据')
			}
		}, error => {
			this.$notice.toast('数据异常，请联系客服')
		})
	},
	methods:{
		searchstart(e){
			this.svalue=e.value;
			if(this.svalue=='') return
			//axios搜索

			this.$fetch({
        		method: 'POST',    
		    	name: 'selectMaintainAll',
		    	data:{
		    		q_name:this.svalue
		    	}
        	}).then(resData => {
				if(resData.status == 0){
				    this.people=resData.data;
				}else{
					this.$notice.toast('未搜索到')
				}
			}, error => {
			})
		},
		onrefresh(){
			this.overlay = true;
			this.svalue = '';
			this.people=[];
			this.currentPage = 1;
			this.$fetch({
				method: 'POST',
				name: 'business'
			}).then(resData => {
				this.overlay = false;
				if(resData.status == 0 && resData.count > 0){
					this.people=resData.data;
					this.$refs["scroller"].refreshEnd();
				}else{
					this.$notice.toast('没有数据')
				}
			}, error => {
				this.overlay = false;
				this.$notice.toast('数据异常，请联系客服')
			})
		},
		loadnext(){
			this.currentPage = this.currentPage + 1;
			let data = {};
			data.pageNum = this.currentPage;
			if(this.svalue!=''){
				data.q_name = this.svalue
			}
			this.$fetch({
				method: 'POST',
				name: 'business',
				data:{
					pageNum:this.currentPage
				}
			}).then(resData => {
				if(resData.status == 0 && resData.count > 0){
					if(resData.data.length == 0){
						this.$notice.toast('已经到最后了')
						return
					}
					this.people.push(...resData.data);
				}else{
					this.$notice.toast('没有数据了')
				}
			}, error => {
				this.$notice.alert({
				    title: '',
				    message: '加载失败',
				    okTitle: '确认',
				    callback() {
				        // 点击确认按钮的回调
				    }
				})
			})
		},
		childEmit(e){
			let json={};
			json.name=e.target.children[0].children[0].attr.value.split(':')[1];
			json.tel=e.target.children[0].children[1].attr.value.split(':')[1];
			json.idcard=e.target.children[2].children[0].attr.value.split(':')[1];
			this.$emit('business',json);
		}
	}
}
</script>

<style scoped>
.tooltip {
	font-size: 24px;
	color: red;
}
.foot {
	height: 80px;
	justify-content: center;
	align-items: center;
	width: 460px;
}
.up {
	flex-direction: row;
	justify-content: space-between;
	width: 450px;
}
.down {
	justify-content: flex-start;
	width: 450px;
}
.seperator {
	height: 10px;
}
.txt {
	color: #515151;
	font-size: 25px;
}
.listul {
	height: 1000px;
}
.block {
	height: 100px;
	border-bottom-width: 1px;
	border-bottom-color: #e6e6e6;
	justify-content: center;
	align-items: center;
	align-self: center;
}
.search {
	border-bottom-width: 1px;
	border-top-color: #000000;
	width: 200px;
	height: 40px;
	font-size: 26px;
}
.top {
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 90px;
}
.root {
	width: 500px;
	padding-left: 20px;
	padding-right: 20px;
}
</style>