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
        <cell class="cell" v-for="(item, index) in userList">
        	<div class="box" :ref="['box'+index]" @click="clickfn(index,$event)" @longpress="longpressfn">
	            <div class="content" :ref="['inner'+index]">
					<!--
					<text style="color:#6FAECF;">{{ item.id }} | {{ item.name }} | {{item.tel}}</text>
					-->
					<div class="cnt">
						<div class="leftcnt">
							<text style="width:20px;"></text>
							<image :src="people" style="height:28px;width:28px"></image>
							<text style="width:10px;"></text>
							<text class="itemtxt" :ref="['name'+i]">{{ item.name }} - {{ item.label == 'K' ? '客户' : '驾驶员' }}</text>
						</div>
						<text class="itemtxt itemtxtright">序号：{{ item.id }}</text>
					</div>
					<div class="cnt">
						<div class="leftcnt">
							<text style="width:20px;"></text>
							<image :src="tel" style="height:28px;width:28px"></image>
							<text style="width:10px;"></text>
							<text class="itemtxt">{{ item.tel }}</text>
						</div>
						<text class="itemtxt itemtxtright" v-if="item.time != null">录入时间：{{ item.time }}</text>
					</div>
					<div class="cnt">
						<div class="leftcnt">
							<text style="width:20px;"></text>
							<image :src="idcardPic" style="height:28px;width:28px"></image>
							<text style="width:10px;"></text>
							<text class="itemtxt" v-if="item.idcard==' '">未留下身份证</text>
							<text class="itemtxt" v-else>{{ item.idcard }}</text>
						</div>
						<div class="." @click="addId(item.id,index)">
				          <image :src="checkBoxImage" style="width:30px;height:30px;margin-right:20px;"></image>
				        </div>
					</div>
				</div>
				<div class="shadow"><image :src="bg" style="width:750px;height:30px;"></image></div>
			</div>
        </cell>
      </list>

      <wxc-loading :show="overlay"
                 type="trip"
                 loading-text="加载中"></wxc-loading>
	  <wxc-slide-nav class="nav nav-top" ref="topNav" position="top" @slideIn="slideIn">
      	<div>
    		<wxc-searchbar ref="wxc-searchbar"
                     @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                     @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                     @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                     @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                     @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                     @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
      		<text class="value-text"></text>
    	</div>
	  </wxc-slide-nav>

      <wxc-slide-nav class="nav nav-bottom" ref="bottomNav" position="bottom" @slideOut="slideOut">
        <div class="nav-cell" @click="addnew($event)">
        	<image :src="insert" style="width:40px;height:40px;"></image>
        </div>
        <div class="cutline"><text class="cutsymbol">|</text></div>
        <div class="nav-cell" @click="timesort">
        	<image :src="timedesc" style="width:40px;height:40px;"></image>
       	</div>
        <div class="cutline"><text class="cutsymbol">|</text></div>
        <div class="nav-cell" @click="idsort">
        	<image :src="iddesc" style="width:40px;height:40px;"></image>
        </div>
      </wxc-slide-nav>
    </div>
</template>

<script>
import { WxcSlideNav , WxcSearchbar , WxcLoading } from 'weex-ui';
export default {
	data: () => ({
		currenPage:1,
		userList:'',
		bg: 'bmlocal://assets/line.png',
		people: 'bmlocal://assets/people.png',
		tel: 'bmlocal://assets/tel.png',
		idcardPic: 'bmlocal://assets/idcard.png',
		insert: 'bmlocal://assets/insert.png',
		timedesc: 'bmlocal://assets/timedesc.png',
		iddesc: 'bmlocal://assets/iddesc.png',
		delPic: 'bmlocal://assets/del.png',
		checkBoxImage:'bmlocal://assets/delgray.png',
		allowed: true,
		idRange: 'asc',
		timeRange: 'asc',
		overlay:false,
		svalue:''
	}),
	eros: {
        beforeBackAppear(params) {
        	if(!params){
        		return
        	}
        	var op=params.action
            if(op == 'edit' || op == 'add'){
            	this.onrefresh();
            }
        }
    },
	created(){
		this.overlay = true;
		this.$fetch({
		    method: 'POST',    
		    name: 'selectMaintainAll'
		}).then(resData => {
			this.overlay = false;
			if(resData.status == 0 && resData.count > 0){
			    this.userList=resData.data;
			}else{
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
		/*
		this.$router.getParams().then(resData=>{
			if(resData && resData.flag=='Detail.vue'){
				this.$notice.loading.show('123')
			}
		})*/
	},
	components: { 
		WxcSlideNav,
		WxcSearchbar,
		WxcLoading
	},
	methods:{
		addId(id,i){
			this.$fetch({
				method: 'POST',    
				name: 'delMaintain',
				data:{
					q_id:id
				}
			}).then(resData => {
				if(resData.status == 1 && resData.count == 1){
					let self=this;
					let temp = this.userList.filter((item,index)=>{
						return i != index;
					})
					setTimeout(function(){
						self.userList = temp;
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
        		this.onrefresh();
        		return
        	}
        	this.svalue = searchTxt;
        	this.userList='';
        	//搜索功能
        	this.$fetch({
        		method: 'POST',    
		    	name: 'selectMaintainAll',
		    	limit:100,
		    	data:{
		    		q_name:searchTxt
		    	}
        	}).then(resData => {
				if(resData.status == 0){
				    this.userList=resData.data;
				}else{
					this.$notice.toast('未搜索到')
				}
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
        	/*this.userList = this.userList.filter((item) => {
        		return item.name.indexOf(searchTxt) != -1;
        	})*/
        },
        wxcSearchbarCancelClicked(){
        	//还原数据
        	this.svalue = '';
        	this.$refs['wxc-searchbar'].setValue('');
        	this.onrefresh();
        },
        onrefresh() {
        	/*
        	Promise.all([disease.GET_COMMONDISEASES_LIST(this), banner.GET_BANNER_LIST(this)]).then(() => {
            	// 请求数据结束后调用 refreshEnd 方法
                this.$refs["list"].refreshEnd()
            })
            */
            this.userList=[];
            this.overlay=true;
            this.currenPage=1;
            this.svalue='';
            this.$fetch({
			    method: 'POST',   
			    name: 'selectMaintainAll'
			}).then(resData => {
			    // 成功回调
			    this.overlay=false;
			    this.userList=resData.data;
			    this.$refs["scroller"].refreshEnd()
			}, error => {
			    // 错误回调
			    this.overlay=false;
			    this.$notice.loading.show('加载失败');
			})
		},
		clickfn(i,e){
			if(!this.allowed) return
			let currentUser=this.userList[i];
			//this.$notice.toast('click');
			this.$router.open({
            	name: 'Detail',
            	navShow:false,
            	params:currentUser
        	})
		},
		longpressfn(){
			//this.$notice.toast('longpress');
		},
		addnew($event){
			this.$router.open({
        		name: 'AddNewUser'
        	})
		},
		timesort(){
			if(this.userList.length==0){
				return
			}
			if(this.timeRange == 'asc'){
				this.userList.sort((a,b)=>{
					if(a.time == null) return a < b;
					if(b.time == null) return b < a;
					return Date.parse(a.time.replace(/-/g, '/')) - Date.parse(b.time.replace(/-/g, '/'))
				})
				this.$notice.toast('已按添加时间升序排列');
				this.timeRange = 'desc';
			}else{
				this.userList.sort((a,b)=>{
					if(a.time == null) return a < b;
					if(b.time == null) return b < a;
					return Date.parse(b.time.replace(/-/g, '/')) - Date.parse(a.time.replace(/-/g, '/'))
				})
				this.$notice.toast('已按添加时间降序排列');
				this.timeRange = 'asc';
			}
		},
		idsort(){
			if(this.userList.length==0){
				return
			}
			if(this.idRange == 'asc'){
				this.userList.sort((a,b)=>{
					return parseInt(a.id) - parseInt(b.id)
				})
				this.$notice.toast('已按序号升序排列');
				this.idRange = 'desc';
			}else{
				this.userList.sort((a,b)=>{
					return parseInt(b.id) - parseInt(a.id)
				})
				this.$notice.toast('已按序号降序排列');
				this.idRange = 'asc';
			}
		},
		loadnext(){
			this.currenPage = this.currenPage + 1;
			let data={};
			if(this.svalue){
				data.q_name=this.svalue;
			}
			data.pageNum =this.currenPage;
			this.$fetch({
			    method: 'POST',    
			    name: 'selectMaintainAll',
			    data:data
			}).then(resData => {
				if(resData.data.length == 0){
					this.$notice.toast('已经到最后了')
					this.currenPage = this.currenPage - 1;
					return
				}
				this.userList.push(...resData.data);
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
.addCheck {
	height: 50px;
	align-items: center;
	justify-content: center;
}
.itemtxtright {
	font-size: 24px;
	margin-right: 20px;
}
.cutsymbol {
	color: #ffffff;
}
.cutline {
	background-color:#1DA1F2;
	width:8px;
	height:80px;
	justify-content: center;
}
.cnt {
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.leftcnt{
	flex-direction: row;
}
.itemleftcnt {
	/*
	flex-direction: row;
	align-items: center;
	*/
}
.itemright {
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-end;
	margin-top: 10px;
}
.itemtxt {
	font-size: 28px;
	color:#666666;
}
.content {
	flex-direction: row;
	justify-content: space-around;
	flex-direction: column;
	padding-top: 5px;
	padding-bottom: 5px;
}
.nav-top {
	height: 85px;
}
.shadow {
	width: 750px;
	height: 30px;
}
.padding {
    width: 750px;
    height: 100px;
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