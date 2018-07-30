<template>
  <div class="login">
    <div class="main">
      <div class="logo">
        <image class="logoIMG" width="300px" height="300px" :src="logo"></image>
      </div>

      <div class="loginArea">
        <div class="seperator"></div>
        <div class="inner">
          <div class="name">
            <div style="flex:0.2;justify-content:center;align-items:center">
              <div style="width:50px;height:50px;">
                <image :src="name" width="50px" height="50px" style="flex:1"></image>
              </div>
            </div>
            <div style="flex:0.05;">
              <div class="line"></div>
            </div>
            <div style="flex:0.75" class="txt"><input class="txtsize" type="text" placeholder="username" :value="binduser" @input="onuser"></input></div>
          </div>
          
          <div class="pwd">
            <div style="flex:0.2;">
              <div style="flex:0.2;justify-content:center;align-items:center">
                <div style="width:50px;height:50px;">
                  <image :src="pwd" width="50px" height="50px" style="flex:1"></image>
                </div>
              </div>
            </div>
            <div style="flex:0.05;">
              <div class="line"></div>
            </div>
            <div style="flex:0.75" class="txt"><input class="txtsize" type="password" placeholder="password" :value="bindpass" @input="onpass"></input></div>
          </div>
        </div>
      </div>

      <div class="loginBtn">
        <div class="inner loginInner" @click="login">Login</div>
      </div>
      <div class="loginBtnExtra">
        <div class="addCheck" @click="remeberLogin()">
          <image :src="checkBoxImage" style="width:30px;height:30px;" v-if="isShow"></image>
          <image :src="checkBoxImaged" style="width:30px;height:30px;" v-if="!isShow"></image>
          <text style="width:5px;"></text>
          <text class="kitStyle btnStyle">记住密码</text>
        </div>
        <text class="kitStyle btnStyle">注册111</text>
      </div>

      
    </div>
    <div class="partLoading">
      <wxc-part-loading :show="partShow"
                          :width="partWidth"
                          :height="partHeight"></wxc-part-loading>
                          <text :value="partText" class="partTxtStyle"></text>
    </div>
    <div class="loginKit">
        <text class="kitStyle">Copyright (c) 2018 Shasteel Cloud</text>
        <text style="height:10px;"></text>
        <text class="kitStyle">App Version1.0.1 - beta</text>
    </div>
    <div v-if="progressVisible" class="bottomProgress">
      <wxc-progress :value="progessValue" 
                    :bar-width="750"
                    :bar-height="10"
                    :bar-color="barColor"></wxc-progress>
    </div>
    <wxc-loading :show="overlay"
                 type="trip"
                 loading-text="验证中"
                 need-mask="true"></wxc-loading>
  </div>
</template>
<script>
  var bmBundleUpdate = weex.requireModule('bmBundleUpdate');
  var axios = weex.requireModule('bmAxios');
  import { WxcCheckbox , WxcLoading , WxcProgress , WxcPartLoading } from 'weex-ui'
  module.exports = {
    data: () =>({
      logo:'bmlocal://assets/logo4.png',
      name:'bmlocal://assets/name.png',
      pwd:'bmlocal://assets/pwd.png',
      binduser:'',
      bindpass:'',
      checkBoxImage:'bmlocal://assets/nocheck.png',
      checkBoxImaged:'bmlocal://assets/checked.png',
      isShow:true,
      overlay:false,
      checkBoxType:false,
      curHomeBackTriggerTimes:1,
      maxHomeBackTriggerTimes:2,
      progessValue: 0,
      barColor:'#FFC900',
      timer:'',
      progressVisible:false,
      partShow:false,
      partWidth:'30',
      partHeight:'30',
      partText:''
    }),
    components: {
      WxcCheckbox,
      WxcLoading,
      WxcProgress,
      WxcPartLoading
    },
    eros:{
      appeared(){
        /*
        this.$fetch({
          method: 'GET',   
          url: 'http://bjtm2.shasteel.cn/app/check?isDiff=1&jsVersion='+weex.config.env.jsVersion+'&appName=eros-app&android=1.0.0'
        }).then(resData => {
           console.log('resData'+ resData)
           if(resData.msg.indexOf('当前版本需要更新')!=-1){
              this.partText='检测到有新版本';
              this.partShow=true;
              setTimeout(()=>{
                this.partText = '自动下载安装中';
              },1000)
              setTimeout(()=>{
                this.processBarRun()
              },1500)
              setTimeout(()=>{
                this.partShow = false;
                this.partText = '更新完成，请重启APP';
              },4000)
              setTimeout(()=>{
                this.partText=''
              },5000)
           }else{

           }
        },error => {
            this.$notice.toast(error)
        })
        */
        /*
        let self=this;
        let url='http://bjtm2.shasteel.cn/app/check?isDiff=1&jsVersion='+weex.config.env.jsVersion+'&appName=eros-app&android=1.0.0';
        axios.fetch({
          method:'GET',
          url:url,
          timeout:3000
        },resData=>{
          if(resData.data.msg.indexOf('当前版本需要更新')!=-1){
            let path=resData.data.data.path;
            self.$notice.confirm({
              message:'检测到当前有更新,是否下载?',
              okTitle:'下载',
              cancelTitle:'否',
              okCallback(){
                self.partShow=true;
                self.partText='正在下载更新包';
                self.processBarRun();
                bmBundleUpdate.download({
                  path:path,
                  diff:true
                },resData=>{
                  if(resData.status==0){
                    /*self.$notice.confirm({
                      message:'下载完成，是否应用更新?',
                      okTitle:'是',
                      cancelTitle:'否',
                      okCallback(){
                        bmBundleUpdate.update();
                      },
                      cancelCallback(){
                        //取消回调
                      }
                    })*//*
                    setTimeout(()=>{
                      self.partText='开始安装'
                    },1000)
                    setTimeout(()=>{
                      bmBundleUpdate.update();
                    },1500)
                  }else{

                  }
                })
              }
            })
          }
        })*/
      }
    },
    created(){
      this.binduser='';
      this.bindpass='';
      this.$storage.get('remeberLogin').then(resData => {
        if(resData == 'true'){
          this.$storage.get('username').then(resData => {
            this.binduser = resData;
          })
          this.$storage.get('password').then(resData => {
            this.bindpass = resData;
          })
          this.checkBoxType = true;
          this.isShow = false;
        }else{
          this.checkBoxType = false;
          this.isShow =true;
        }
      })
      //weex.config.env.appName
      //weex.config.env.jsVersion
      /*let checkJson={};
      checkJson.isDiff = '1';
      checkJson.jsVersion = weex.config.env.jsVersion;
      checkJson.appName = weex.config.env.appName;
      checkJson.android = weex.config.env.appVersion;*/
      
      //this.processBarRun();
      this.androidFinishApp();
    },
    methods:{
      androidFinishApp () {
        const globalEvent = weex.requireModule('globalEvent');
        globalEvent.addEventListener('homeBack', options => {
            this.$router.finish();
        })
      }, 
      processBarRun(){
        this.progressVisible = true;
        this.timer = setInterval(() => {
            if (this.progessValue < 100) {
              this.progessValue++;
            } else {
              clearTimeout(this.timer);
              setTimeout(() => {
                this.progressVisible = false;
                this.progessValue = 0;

              }, 500)
            }
          }, 10);
      },
      login(){
        /*
        this.$router.open({
            name: 'Main',
            type: 'PRESENT'
        })
        return
        */
        /*****/
        
        let vuser=this.binduser.trim();
        let vpass=this.bindpass.trim();
        if(vuser == ''){
          this.$notice.alert({
            message: '用户名不能为空',
          })
          return
        }
        if(vpass == ''){
          this.$notice.alert({
            message: '密码不能为空',
          })
          return
        }
        this.overlay = true;
        //vuser='admin11';
        //vpass='12';
        let userObj={};
        userObj.p_username=vuser;
        userObj.p_password=vpass;
        this.$fetch({
            method: 'POST',   
            name: 'login',
            data: userObj
        }).then(resData => {
            let self=this;
            if(resData.status == 0){
              if(this.checkBoxType){  //记住密码
                this.$storage.set("username",vuser);
                this.$storage.set("password",vpass);
                this.$storage.set('remeberLogin','true');
              }else{
                this.$storage.delete('username');
                this.$storage.delete('password');
                this.$storage.delete('remeberLogin');
              }
              setTimeout(()=>{
                self.$router.setHomePage('/pages/Index.js');
              },1000)
              
              /*
              this.$router.open({
                name:'Main'
              })
              */
            }else{
              setTimeout(()=>{
                self.overlay = false;
                self.$notice.alert({
                  message: '登陆失败，请检查用户名或密码'
                })
              },1000)
            }
        }, error => {
          // 错误回调
          this.overlay = false;
          this.$notice.alert({
              message: '登陆失败，请检客服'
          })
          //this.$notice.loading.show(error);
      })
        /*
        var url = this.$getConfig().bundleUrl;
        url = url.split('/').slice(0,-1).join('/') + '/components/Main.js';
        stream.fetch({
          method:'POST',
          url:'http://10.68.0.55:8080/EiService?type=mobile&service=EP50&method=mobileLoad&$$Login$$=true',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          body:'p_username='+vuser+'&p_password='+vpass,
          type:'json'
          },res => {
            //var resObj=res.parseJSON();
            if(res.data.status == 0 ){
              navigator.push({
                url:url,
                animated:'true'
              });
            }else{
              modal.alert({
                  message: '登陆失败，请检查用户名或密码',
                  duration: 0.3
              })
            }
          });
          */

      },
      onuser(event){
        this.binduser = event.value
      },
      onpass(event){
        this.bindpass = event.value
      },
      remeberLogin(){
        this.checkBoxType = ! this.checkBoxType;
        if(this.checkBoxType){
          this.isShow = false;
        }else{
          this.isShow = true;
        }
      }
    }
  }
</script>
<style>
.partTxtStyle {
  color:#999999;
  font-size: 24px;
}
.partLoading {
  position: absolute;
  width: 350px;
  height: 50px;
  bottom: 140px;
  margin-left: 200px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.bottomProgress{
  position: absolute;
  bottom: 0;
  left: 0;
}
.addCheck {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.login {
  flex: 1;
}
.logoIMG {
  flex: 1;
}
.main {
  flex: 1;
  align-items: center;
  padding-top: 150px;
  background-image: linear-gradient(to bottom,#1DA1F2,#ffffff);
}
.logo {
  width: 300px;
  height: 300px;
  margin-bottom: 90px;
}
.loginArea {
  width: 520px;
  height: 190px;
  border-radius: 30px;
  margin-bottom: 30px;
  border-color: #ffffff;
  border-width: 2px;
  position: relative;
}
.inner {
  flex: 1;
  flex-direction: column;
  background-color: #ffffff;
  opacity: 0.3;
  position: relative;
}
.name {
  flex: 0.5;
  flex-direction: row;
}
.seperator {
  width: 520px;
  height: 2px;
  position: absolute;
  top:94px;
  left:0px;
  flex: 1;
  background-color: #ffffff;
}
.pwd {
  flex: 0.5;
  opacity: 1;
  flex-direction: row;
}
.loginBtn {
  width: 520px;
  height: 80px;
  border-radius: 15px;
  border-color: #ffffff;
  margin-bottom: 20px;
  border-width: 2px;
  border-color: #ffffff;
}
.loginInner {
  justify-content: center;
  align-items: center;
  font-size: 26px;
}
.loginBtnExtra {
  width: 520px;
  height: 40px;
  border-radius: 15px;
  border-color: #ffffff;
  margin-bottom: 50px;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
}
.loginKit {
  width: 600px;
  height: 120px;
  border-color: #ffffff;
  padding: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  margin-left: 75px;
}
.kitStyle {
  color: #999999;
  font-size: 24px;
}
.btnStyle {
  color: #ffffff;
  font-size: 30px;
}
.txt {
  justify-content: center;
}
.txtsize {
  font-size: 24px;
  flex: 1;
  color: #000000;
}
.line {
  width: 2px;
  height: 55px;
  background-color: #000000;
  margin-top: 20px;
  font-size: 28px;
}
</style>