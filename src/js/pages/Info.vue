<template>
 	<div class="wrapper">
      <list
        ref="scroller"
        @scroll="onScroll"
        @touchstart="onTouchStart($event)"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        @loadmore="loadnext"
        :showRefresh="true" @refresh="onrefresh">
        <cell>
          <div class="padding"></div>
        </cell>
        <cell class="cell" v-for="(item, index) in infoList">
        	<div class="box" :ref="['box'+index]" @click="clickfn(index,$event)" @longpress="longpressfn(index)">
	            <div class="content" :ref="['inner'+index]">
					<!--
					<text style="color:#6FAECF;">{{ item.id }} | {{ item.name }} | {{item.tel}}</text>
					-->
					<div class="itemleft">
						<div class="leftwo">
							<text class="itemtxt carborder">{{ item.carNumber }}</text>
							<text class="itemtxt stus">{{ item.status }}</text>
						</div>
						<text class="itemtxt itemtxtright">{{item.carType}} - {{ item.scrapType }}</text>
					</div>
					<div class="itemright">
						<text class="itemtxt">预报日期：{{ item.carArrive }}（{{item.people}}）</text>
						<div class="delbtn" @click="deleteAction(index)" v-if="item.status=='已录入' || item.status=='已确报'">
							<image :src="delPic" style="width:30px;height:30px;"></image>
						</div>
					</div>
				</div>
				<div class="shadow">
					<image :src="bg" style="width:750px;height:30px;"></image>
				</div>
			</div>
        </cell>
      </list>

      <wxc-loading :show="overlay"
                 type="trip"
                 loading-text="加载中"></wxc-loading>
                 <!--
	  <wxc-slide-nav class="nav nav-top" ref="topNav" position="top" @slideIn="slideIn">
      	<div>
    		<wxc-searchbar ref="wxc-searchbar"
                     @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                     @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                     @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                     @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                     @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                     @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
      		<text class="value-text">{{value}}</text>
    	</div>
	  </wxc-slide-nav>
	-->

      <wxc-slide-nav class="nav nav-bottom" ref="bottomNav" position="bottom" @slideOut="slideOut">
        <div class="nav-cell insertnew" @click="addnew($event)">
        	<image :src="insert" style="width:40px;height:40px;"></image>
        	<!--
        	<text style="width:10px;"></text>
        	<text class="nav-text">新增</text>
        	-->
        </div>
        <div class="cutline"><text class="cutsymbol">|</text></div>
        <div class="nav-cell" @click="timesort">
        	<image :src="timedesc" style="width:40px;height:40px;"></image>
       	</div>
       	<!--
        <div class="cutline"><text class="cutsymbol">|</text></div>
        <div class="nav-cell" @click="idsort">
        	<image :src="iddesc" style="width:40px;height:40px;"></image>
        </div>
    	-->
      </wxc-slide-nav>
      <wxc-popup :show="topPop"
                 pos="top"
                 ref="search"
                 :animation="{timingFunction:'ease-out'}"
                 height="500"
                 @wxcPopupOverlayClicked="toplayTopClick">
            <search @toParentSearch="emitSearch($event)"></search>
      </wxc-popup>
    </div>
</template>

<script>
import search from '../components/search.vue';
import { WxcSlideNav , WxcSearchbar , WxcLoading , WxcPopup } from 'weex-ui';
import Binding from 'weex-bindingx';
export default {
	data: () => ({
		currenPage:1,
		infoList:'',
		bg: 'bmlocal://assets/line.png',
		people: 'bmlocal://assets/people.png',
		tel: 'bmlocal://assets/tel.png',
		idcard: 'bmlocal://assets/idcard.png',
		insert: 'bmlocal://assets/insert.png',
		timedesc: 'bmlocal://assets/timedesc.png',
		iddesc: 'bmlocal://assets/iddesc.png',
		delPic:'bmlocal://assets/delgray.png',
		idRange: 'asc',
		timeRange: 'asc',
		topPop:false,
		overlay:false,
		tempJson:{},
		//BindingX用到参数
		x: 0,
		y: 0,
        isInDelAnimation: false,
        opacity:1,
        gesToken:0
	}),
	eros: {
        beforeBackAppear(params) {
        	if(!params){
        		return
        	}
        	var op=params.action
            if(op == 'both'){
            	this.onrefresh()
            }
        }
    },
	created(){
		this.overlay = true;
		this.$navigator.setRightItem(
		weex.config.env.os == 'android' ? 
		{
			text:'          ',
            image:'bmlocal://assets/rightitemAndroid.png',
            textColor: '#fff',
            fontSize: '26',
            fontWeight: 'normal'
        } : {
        	image:'bmlocal://assets/rightitemios.png',
            textColor: '#fff',
            fontSize: '26',
            fontWeight: 'normal'
        }, () => {
            // 点击回调
            this.topPop = true;
        })
		this.$fetch({
		    method: 'POST',    
		    name: 'selectMiniInfo'
		}).then(resData => {
			if(resData.status == 0 && resData.count > 0){
				this.overlay = false;
			    this.infoList=resData.data;
			    this.$notice.loading.hide()
			}else{
				this.overlay = false;
				this.$notice.toast('没有数据')
			}
		}, error => {
			this.overlay = false;
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
	},
	components: { 
		WxcSlideNav,
		WxcSearchbar,
		WxcLoading,
		WxcPopup,
		search
	},
	methods:{
		deleteAction(i){
			this.$fetch({
				method: 'POST',    
				name: 'delInfo',
				data:{
					q_id:this.infoList[i].id
				}
			}).then(resData => {
				if(resData.status == 1 && resData.count == 1){
					let self=this;
					let temp = this.infoList.filter((item,index)=>{
						return i != index;
					})
					setTimeout(function(){
						self.infoList = temp;
					},500)

					this.$notice.toast({
						message: '删除成功'
					})
				}else{
					this.$notice.toast({
						message: '删除失败'
					})
				}
			}, error => {
			    // 错误回调
			    this.$notice.alert({
				    title: '',
				    message: '操作失败',
				    okTitle: '确认',
				    callback() {
				    }
				})
			})
		},
		emitSearch(json){
			this.tempJson=json;
			this.$refs.search.hide();
			this.infoList=[];
			this.overlay = true;
			this.$fetch({
			    method: 'POST',   
			    name: 'selectMiniInfo',
			    limit: '100',
			    data:json
			}).then(resData => {
			    this.overlay=false;
			    this.infoList=resData.data;
			    this.$refs["scroller"].refreshEnd()
			}, error => {
			    this.overlay=false;
			    this.$notice.toast('加载失败');
			})
		},
		toplayTopClick(){
			this.topPop = false;
		},
		onTouchStart(){
		},//: WxcSlideNav.handleTouchStart,
        onTouchEnd(){
        },//: WxcSlideNav.handleTouchEnd,
        onTouchMove(e) {
          WxcSlideNav.handleTouchMove.call(this, e, this.$refs.bottomNav);
        },
        onScroll(e) {
          WxcSlideNav.handleScroll.call(this, e, this.$refs.scroller, this.$refs.topNav, this.$refs.bottomNav);
        },
        wxcSearchbarInputOnInput(e){
        	let searchTxt = e.value.trim();
        	if(searchTxt == ''){
        		return
        	}
        	/*this.userList = this.userList.filter((item) => {
        		return item.name.indexOf(searchTxt) != -1;
        	})*/
        },
        wxcSearchbarCancelClicked(){
        },
        onrefresh() {
        	/*
        	Promise.all([disease.GET_COMMONDISEASES_LIST(this), banner.GET_BANNER_LIST(this)]).then(() => {
            	// 请求数据结束后调用 refreshEnd 方法
                this.$refs["list"].refreshEnd()
            })
            */
            this.overlay=true;
            this.infoList=[];
            this.tempJson={};
            this.currenPage=1;
            this.$fetch({
			    method: 'POST',   
			    name: 'selectMiniInfo'
			}).then(resData => {
			    this.overlay=false;
			    this.infoList=resData.data;
			    this.$refs["scroller"].refreshEnd()
			}, error => {
			    this.overlay=false;
			    this.$notice.toast('加载失败');
			})
		},
		clickfn(i,e){
			let currentInfo=this.infoList[i];
			this.$router.open({
            	name: 'InfoMaintain',
            	navShow:false,
            	params:currentInfo
        	})
		},
		longpressfn(i){
			let status = this.infoList[i].status;
			if(status == '已提交' || status == '已接收'){
				this.$notice.toast('车牌号'+this.infoList[i].carNumber+'还未确报，车俩还未释放，操作失败')
				return
			}
			/*
			if(status != '已录入' && status !='已确报' && status != '已作废'){
				this.$notice.toast('已录入或提交处理万才能执行此操作')
				return
			}*/
			let self = this;
			if(status=='已录入'){
				this.$notice.confirm({
					title: '[ '+this.infoList[i].carNumber+' ]',
				    message: '预报日期：'+this.infoList[i].carArrive+'\n请确认是否继续执行提交操作',
				    okTitle: '确认',
				    cancelTitle: '取消',
				    okCallback() {
				        // 点击确认按钮的回调
				        self.$fetch({
						    method: 'POST',   
						    name: 'submit',
						    data: {
						    	q_id:self.infoList[i].id,
						    	q_carNumber:self.infoList[i].carNumber
						    }
						}).then(resData => {
						    if(resData.status == 0){
						    	self.$notice.toast('提交成功')
						    	//self.infoList[i].status == '已提交'
						    	setTimeout(()=>{
						    		self.infoList[i].status='已提交'
						    	},100)
						    	//self.$set(infoList[i],'status','已提交');
						    }else{
						    	self.$notice.toast('该车辆已经提交过，请勿重复提交')
						    }
						}, error => {
						})
				    },
				    cancelCallback() {
				        // 点击取消按钮的回调
				    }

				})
			}else{
				this.$notice.confirm({
					title: '[ '+this.infoList[i].carNumber+' ]',
					message: '该车辆当前确报流程已结束'+'\n正在执行再次提交操作，按确认进入编辑页面',
					okTitle: '确认',
				    cancelTitle: '取消',
				    okCallback() {
				    	let currentInfo = self.infoList[i]
				    	currentInfo.again = true;
				    	currentInfo.change_status = '再次提交'
				    	self.$router.open({
			        		name: 'InfoMaintain',
			        		params:currentInfo
			        	})
				    }
				})
			}
		},
		addnew($event){
			this.$router.open({
        		name: 'InfoMaintain'
        	})
		},
		timesort(){
			if(this.infoList.length==0){
				return
			}
			if(this.timeRange == 'asc'){
				this.infoList.sort((a,b)=>{
					return Date.parse(a.carArrive.replace(/-/g, '/')) - Date.parse(b.carArrive.replace(/-/g, '/'))
				})
				this.$notice.toast('已按预报时间升序排列');
				this.timeRange = 'desc';
			}else{
				this.infoList.sort((a,b)=>{
					return Date.parse(b.carArrive.replace(/-/g, '/')) - Date.parse(a.carArrive.replace(/-/g, '/'))
				})
				this.$notice.toast('已按预报时间降序排列');
				this.timeRange = 'asc';
			}
		},
		idsort(){
			if(this.idRange == 'asc'){
				this.infoList.sort((a,b)=>{
					return parseInt(a.id) - parseInt(b.id)
				})
				this.$notice.toast('已按序号升序排列');
				this.idRange = 'desc';
			}else{
				this.infoList.sort((a,b)=>{
					return parseInt(b.id) - parseInt(a.id)
				})
				this.$notice.toast('已按序号降序排列');
				this.idRange = 'asc';
			}
		},
		loadnext(){
			this.currenPage = this.currenPage + 1;
			this.tempJson.pageNum = this.currenPage;
			this.$fetch({
			    method: 'POST',    
			    name: 'selectMiniInfo',
			    data: this.tempJson
			}).then(resData => {
				if(resData.data.length == 0){
					this.$notice.toast('已经到最后了')
					return
				}
				this.infoList.push(...resData.data);
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
		}
	}
}
</script>

<style scoped>
.delbtn {
	width: 100px;
	height: 70px;
	justify-content: center;
	align-items: flex-end;
}
.stus {
	font-size: 24px;
	margin-left: 20px;
}
.leftwo {
	flex-direction: row;
	align-items: center;
}
.rightwo {
	flex-direction: row;
	text-align: center;
}
.carborder {
	border-width: 1px;
	padding: 5px;
}
.itemtxtright {
	font-size: 24px;
}
.cutsymbol {
	color: #ffffff;
}
.cutline {
	background-color:#1DA1F2;
	width:10px;
	height:80px;
	justify-content: center;
}
.insertnew {
	flex-direction: row;
}
.itemright {
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex:0.5;
}
.itemtxt {
	font-size: 28px;
	color:#666666;
}
.itemleft {
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
	flex:0.5;
}
.content {
	flex-direction: column;
	justify-content: space-between;
	padding-left: 30px;
	padding-right: 30px;
	padding-top: 10px;
}
.nav-top {
	height: 0;
}
.shadow {
	width: 750px;
	height: 30px;
}
.padding {
    width: 750px;
    height: 30px;
  }
.div {
	margin-bottom: 10px;
    height: 120px;
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
}
.nav {
    position: fixed;
    width: 750px;
    left: 0;
    flex-direction: row;
    align-items: center;
}
.nav-top {
    top: 0;
}
.nav-bottom {
    bottom: 0;
}
.nav-cell {
    flex: 1;
    height: 80px;
    align-items: center;
    justify-content: center;
    background-color: #1DA1F2;
}
.nav-text {
    font-size: 26px;
    color:#ffffff;
}
.list {
}
.box {
	flex-direction: column;
	height: 180px;
}
.content {
	width: 720px;
	margin-left: 15px;
	height: 150px;
	color:#6FAECF;
	background-color: #ffffff;
}
</style>