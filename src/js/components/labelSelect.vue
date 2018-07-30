<template>
	<div class="root">
		<text class="title">选择标识</text>
		<div class="data">
			<wxc-grid-select
    			:single="true"
    			:cols="5"
    			:customStyles="customStyles"
    			:list="testData"
    			@select="params => onSelect(params)">
  			</wxc-grid-select>
		</div>
	</div>
</template>

<script>
import { WxcGridSelect } from 'weex-ui';
export default {
	name:'labelSelect',
	components : {
		WxcGridSelect
	},
	props:['labelValue'],
	data:() => ({
		customStyles: {
			lineSpacing: '15px',
			width: '160px',
			height: '70px',
			icon: '',
			color: '#999999',
			checkedColor: '#ffffff',
			marginTop: '20px',
			borderColor: '#ebebeb',
			checkedBorderColor: '#1DA1F2',
			backgroundColor: '#ebebeb',
			checkedBackgroundColor: '#ffffff',
			checkedColor: '#1DA1F2'
		},
		testData:[]
	}),
	created(){
		/*
		this.$fetch({
		    method: 'POST', 
		    name: 'getLabelList'
		}).then(resData => {
		    // 成功回调
		    let gridList=resData.data;
		    for(let item of gridList){
		    	let obj={};
		    	if(this.labelValue == item.name){
		    		obj.checked=true;
		    	}  
		    	obj.title=item.name;
		    	this.testData.push(obj);
		    }
		    this.$notice.loading.show(obj)
		    return
		}, error => {
		    // 错误回调
		    this.$notice.alert({
			    title: '',
			    message: '加载失败',
			    okTitle: '确认',
			    callback() {
			        // 点击确认按钮的回调
			    }
			})
			
		})
		*/
		let gridList=[{name:'客户'},{name:'驾驶员'}];
		for(let item of gridList){
	    	let obj={};
	    	if(this.labelValue == item.name){
	    		obj.checked=true;
	    	}  
	    	obj.title=item.name;
	    	this.testData.push(obj);
	    }
	},
	methods:{
		onSelect({ selectIndex, checked, checkedList }){
			this.$emit('labelChange',checkedList[0].title);
		}
	}
}
</script>

<style scoped>
.data {
    padding-top: 24px;
}
.title {
	color: #cccccc;
	font-size: 26px;
}
.root {
	padding: 30px;
}
</style>