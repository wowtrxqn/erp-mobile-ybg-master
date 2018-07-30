<template>
	<div class="root">
		<!--
		<wxc-loading :show="isShow" type="trip">{{caseType}}</wxc-loading>
		-->
		<text class="title">{{title}}</text>
		
			<!--
			<wxc-grid-select
    			:single="true"
    			:cols="5"
    			:customStyles="customStyles"
    			:list="testData"
    			@select="params => onSelect(params)">
  			</wxc-grid-select>
  			-->
  		<list ref="scroller">
  			<cell v-for="item in labels" class="outer">
  				<div class="block" @click="childEmit($event)">
  					<text class="txt">{{item.label}}</text>
  				</div>
  			</cell>
  		</list>
	</div>
</template>

<script>
export default {
	name:'label',
	components : {
	},
	props:['caseType'],
	data:() => ({
		labels:[],
		title:''
	}),
	created(){
		switch(this.caseType){
			case 'carType':
				this.title = '选择车辆类型';
				break;
			case 'scrapType':
				this.title = '选择废钢种类';
				break;
			case 'wagonType':
				this.title = '选择车皮异常';
				break;
			case 'originType':
				this.title = '选择产地';
				break;
		}
		this.$fetch({
			method: 'POST',
			name: this.caseType
		}).then(resData => {
			if(resData.status == 0 && resData.count > 0){
				this.labels=resData.data;
			}else{
				this.$notice.toast('没有数据')
			}
		}, error => {
			this.$notice.toast('数据异常，请联系客服')
		})
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
	},
	methods:{
		childEmit(e){
			//this.$notice.loading.show(e.target.children[0].attr.value)
			this.$emit('selectDone',{value:e.target.children[0].attr.value,type:this.caseType});
		}
	}
}
</script>

<style scoped>
.txt {
	color: #515151;
}
.outer {
}
.block {
	height: 80px;
	border-bottom-width: 1px;
	border-bottom-color: #e6e6e6;
	justify-content: center;
	align-items: center;
}
.title {
	margin-bottom: 30px;
}
.root {
	padding: 30px;
	height: 500px;
}
</style>