<template>
	<div class="root">
		<!--
		<wxc-loading :show="isShow" type="trip">{{caseType}}</wxc-loading>
		-->
		<!--
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
	name:'inner',
	components : {
	},
	props:['caseType'],
	data:() => ({
		labels:[],
		title:''
	}),
	created(){
		switch(this.caseType){
			case 'scrapType':
				this.title = '选择废钢种类';
				break;
			case 'statusType':
				this.title = '选择预报状态';
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
	},
	methods:{
		childEmit(e){
			this.$emit('emitSelect',{value:e.target.children[0].attr.value,type:this.caseType});
		}
	}
}
</script>

<style scoped>
.txt {
	color: #515151;
	font-size: 25px;
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
	margin-bottom: 20px;
	color: #666666;
}
.root {
	padding-bottom: 30px;
	padding-top: 30px;
	padding-left: 80px;
	padding-right: 80px;
	height: 500px;
}
</style>