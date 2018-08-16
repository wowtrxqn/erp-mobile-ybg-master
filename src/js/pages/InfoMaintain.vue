<template>
  <div>
    <list>
      <cell>
    <div class="top">
      <text style="width:20px;"></text>
      <image :src="location" style="width:40px;height:40px;"></image>
      <text style="width:20px;"></text>
      <div class="title"><text style="font-size:22px;color:#999999;">{{topTitle}}</text></div>
    </div>
    <div class="data">
      <div class="block" @click="labelSelect('carType',$event)">
        <div class="labeltxt">
          <text class="labelstyle">车俩类型:</text>
        </div>
        <div class="inputtxt">
          <!--<input class="txt" type="button" placeholder="请选择" :value="type"/>-->
          <text class="txtx">{{carType}}</text>
        </div>
        <div class="seperate">
          <image :src="more" style="width:30px;height:30px;"></image>
        </div>
      </div>
      <!--
      <div class="block">
        <div class="labeltxt">
          <text class="labelstyle">车号</text>
        </div>
        <div class="inputtxt">
          <input class="txt" type="text" placeholder="请输入车牌" :value="type"/>
        </div>
        <div class="seperate">
        </div>
      </div>
      -->

      <div class="block double">
        <div class="half">
          <div class="halflabeltxt">
            <text class="labelstyle">车号:</text>
          </div>
          <div class="halfinputtxt">
            <input class="txt" type="text" placeholder="请输入车号" :value="carNumber" @input="General('carNumber',$event)"  @blur="checkCarNumber()"/>
          </div>
        </div>
        <div class="half">
          <div class="halflabeltxt">
            <text class="labelstyle">预估吨位:</text>
          </div>
          <div class="halfinputtxt">
            <input class="txt" type="text" placeholder="请输入吨位" :value="carWeight" @input="General('carWeight',$event)"/>
          </div>
        </div>
      </div>


      <div class="block double">
        <div class="half" @click="labelSelect('originType',$event)">
          <div class="halflabeltxt">
            <text class="labelstyle">产地:</text>
          </div>
          <div class="halfinputtxtmiddle">
            <text class="txtx">{{originType}}</text>
          </div>
          <div class="halfseperate">
            <image :src="more" style="width:30px;height:30px;"></image>
          </div>
        </div>
        <div class="half" @click="dataPickPop()">
          <div class="halflabeltxtr">
            <text class="labelstyle">预估到达:</text>
          </div>
          <div class="halfinputtxtmiddler">
            <text class="txtx">{{carArrive}}</text>
          </div>
          <div class="halfseperater">
            <image :src="date" style="width:30px;height:30px;"></image>
          </div>
        </div>
      </div>
      <!--
      <div class="block">
        <div class="labeltxt">
          <text class="labelstyle">产地</text>
        </div>
        <div class="inputtxt">
          <text class="txtx"></text>
        </div>
        <div class="seperate">
          <image :src="more" style="width:30px;height:30px;"></image>
        </div>
      </div>
      <div class="block">
        <div class="labeltxt">
          <text class="labelstyle">预估吨位</text>
        </div>
        <div class="inputtxt">
          <input class="txt" type="text" placeholder="请输入预估吨位" :value="type"/>
        </div>
        <div class="seperate">
        </div>
      </div>
      -->
      <div class="block last" @click="labelSelect('scrapType',$event)">
        <div class="labeltxt">
          <text class="labelstyle">废钢种类:</text>
        </div>
        <div class="inputtxt">
          <text class="txtx">{{scrapType}}</text>
        </div>
        <div class="seperate">
          <image :src="more" style="width:30px;height:30px;"></image>
        </div>
      </div>
      <!--
      <div class="block last">
        <div class="labeltxt">
          <text class="labelstyle">预估到达</text>
        </div>
        <div class="inputtxt">
          <text class="txtx"></text>
        </div>
        <div class="seperate">
          <image :src="more" style="width:30px;height:30px;"></image>
        </div>
      </div>
      -->
      <div class="seperateBlock"></div>
      <div class="block">
        <div class="labeltxt">
          <text class="labelstyle">业务代表:</text>
        </div>
        <div class="inputtxt">
          <input class="txt" type="text" placeholder="请输入业务代表名称" @input="General('people',$event)" :value="people"/>
        </div>
        <div class="seperate" @click="selectMaintain('K')">
          <image :src="moreselect" style="width:30px;height:30px;"></image>
        </div>
      </div>
      <!--
      <div class="block double last">
        <div class="half">
          <div class="halflabeltxt">
            <text class="labelstyle">手机号</text>
          </div>
          <div class="halfinputtxt">
            <input class="txt" type="text" placeholder="请输入手机号" :value="phone"/>
          </div>
        </div>
        <div class="half">
          <div class="halflabeltxt">
            <text class="labelstyle">身份证</text>
          </div>
          <div class="halfinputtxt">
            <input class="txt" type="text" placeholder="请输入身份证" :value="idcard"/>
          </div>
        </div>
      </div>
      -->
      <div class="block">
        <div class="labeltxt">
          <text class="labelstyle">手机号:</text>
        </div>
        <div class="inputtxt">
          <!--<input class="txt" type="button" placeholder="请选择" :value="type"/>-->
          <input class="txt" type="text" placeholder="请输入手机号" :value="phone" @input="General('phone',$event)"/>
        </div>
        <div class="seperate">
        </div>
      </div>
      <div class="block area">
        <div class="labeltxt">
          <text class="labelstyle">身份证:</text>
        </div>
        <div class="inputtxt">
          <!--<input class="txt" type="button" placeholder="请选择" :value="type"/>-->
          <input class="txt" type="text" placeholder="请输入身份证" :value="idcard" @input="General('idcard',$event)"/>
        </div>
        <div class="seperate">
        </div>
      </div>

      <div class="block">
        <div class="labeltxt">
          <text class="labelstyle">司机代表:</text>
        </div>
        <div class="inputtxt">
          <input class="txt" type="text" placeholder="请输入业务代表名称" @input="General('dpeople',$event)" :value="dpeople"/>
        </div>
        <div class="seperate" @click="selectMaintain('J')">
          <image :src="moreselect" style="width:30px;height:30px;"></image>
        </div>
      </div>
      <div class="block">
        <div class="labeltxt">
          <text class="labelstyle">手机号:</text>
        </div>
        <div class="inputtxt">
          <!--<input class="txt" type="button" placeholder="请选择" :value="type"/>-->
          <input class="txt" type="text" placeholder="请输入手机号" :value="dphone" @input="General('dphone',$event)"/>
        </div>
        <div class="seperate">
        </div>
      </div>
      <div class="block last">
        <div class="labeltxt">
          <text class="labelstyle">身份证:</text>
        </div>
        <div class="inputtxt">
          <!--<input class="txt" type="button" placeholder="请选择" :value="type"/>-->
          <input class="txt" type="text" placeholder="请输入身份证" :value="didcard" @input="General('didcard',$event)"/>
        </div>
        <div class="seperate">
        </div>
      </div>

      <div class="seperateBlock"></div>
      <div class="block double">
        <div class="half" @click="labelSelect('wagonType',$event)">
          <div class="halflabeltxt">
            <text class="labelstyle">车皮异常:</text>
          </div>
          <div class="halfinputtxtmiddle">
            <text class="txtx">{{wagonType}}</text>
          </div>
          <div class="halfseperate">
            <image :src="more" style="width:30px;height:30px;"></image>
          </div>
        </div>
        <div class="half">
          <div class="halflabeltxt">
            <text class="labelstyle">公斤:</text>
          </div>
          <div class="halfinputtxt">
            <input class="txt" type="text" placeholder="请输入公斤" :value="kg" @input="General('kg',$event)"/>
          </div>
        </div>
      </div>
      <div class="block last" @click="reme()">
        <div style="flex:0.025"></div>
        <div style="flex:0.875">
          <text>是否包含密封容器</text>
        </div>
        <div style="flex:0.1;">
          <image :src="checkBoxImage" style="width:30px;height:30px;" v-if="isShow"></image>
                <image :src="checkBoxImaged" style="width:30px;height:30px;" v-if="!isShow"></image>
        </div>
      </div>
    </div>
    <div class="foot">
       <wxc-button :text="optionButton" type="blue" :btn-style="btnStyle"
              @wxcButtonClicked="insertNewInfo"></wxc-button>
    </div>
    <wxc-loading :show="overlay"
                 type="trip"
                 loading-text="执行中"
                 need-mask="true"></wxc-loading>
    <wxc-popup popup-color="rgb(255, 255, 255)"
                 :show="isBottomShow"
                 ref="BottomPop"
                 :animation="{timingFunction:'ease-out'}"
                 @wxcPopupOverlayClicked="popupOverlayBottomClick"
                 pos="bottom"
                 height="500">
          <label :caseType="caseType" @selectDone="parentEmit($event)"></label>
      </wxc-popup>
      <wxc-popup popup-color="rgb(255, 255, 255)"
                 :show="isLeftShow"
                 ref="selectLeftPop"
                 @wxcPopupOverlayClicked="popupOverlayBottomPeopleClick"
                 pos="left"
                 width="500">
          <people :retype="peopleType" @business="parentEimtBusiness($event)"></people>
      </wxc-popup>
    </cell>
  </list>
  </div>
</template>

<script>
import label from '../components/label.vue';
import people from '../components/people.vue';
import { WxcPopup , WxcButton , WxcLoading } from 'weex-ui';
const dateTimePicker = weex.requireModule('dateTimePicker');
export default {
  components:{ WxcPopup , label , WxcButton , WxcLoading , people },
  data: ()=>({
    location:'bmlocal://assets/location.png',
    more:'bmlocal://assets/arror.png',
    moreselect:'bmlocal://assets/moreselect.png',
    checkBoxImage:'bmlocal://assets/nocheckbg.png',
    checkBoxImaged:'bmlocal://assets/checked.png',
    date:'bmlocal://assets/date.png',
    topTitle:'',
    optionButton:'',
    isShow:true,
    overlay:false,
    isBottomShow:false,
    isLeftShow:false,
    btnBgColor:'#1DA1F2',
    opacity:'0.88',
    //提交的数据字段
    id:'',
    carType:'',
    carNumber:'',
    carWeight:'',
    originType:'',
    carArrive:'',
    scrapType:'',
    people:'',
    phone:'',
    idcard:'',
    dpeople:'',
    dphone:'',
    didcard:'',
    wagonType:'',
    kg:'',
    checkBoxType:false,
    //组建互传引用数据
    caseType:'',
    //数据检测
    phoneRight:false,
    carNumberRight:false,
    idcardRight:true,
    didcardRight:true,
    methodOp:'',
    peopleType:'',
    isActiveButton:true
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
    this.$router.getParams().then(resData => {
      if(resData.id){
        this.methodOp='updateInfo';
        this.id = resData.id;
        this.topTitle = '< 详情 > 预报港信息明细';
        this.optionButton = '确定';
        this.carType = resData.carType;
        this.carNumber = resData.carNumber;
        this.carWeight = resData.carWeight;
        this.originType = resData.originType;
        this.carArrive = resData.carArrive;
        this.scrapType = resData.scrapType;
        this.people = resData.people;
        this.phone = resData.phone;
        this.idcard = resData.idcard == null ? '' : resData.idcard;
        this.dpeople = resData.dpeople;
        this.dphone = resData.dphone;
        this.didcard = resData.didcard == null ? '' : resData.didcard;
        this.wagonType = resData.wagonType;
        this.kg = resData.kg == null ? '' : resData.kg;
        this.isShow = resData.has == 'Y' ? false : true;
        this.isActiveButton=resData.status;
      }else{
        this.methodOp='addInfo';
        this.topTitle = '< 新增 > 预报港信息新增';
        this.optionButton = '新增'
      }
    })
    this.$router.setBackParams({
      action:'both'
    })
  },
  methods:{
    insertNewInfo(){
      if(this.methodOp=='updateInfo' && this.isActiveButton!='已录入' && this.isActiveButton!='已确报'){
        this.$notice.alert({
          message: '已提交未确保状态，不能更改'
        })
        return
      }
      this.checkCarNumber();
      this.checkPhone();
      this.checkIdcard();
      this.checkdIdcard();
      if(this.wagonType!='无异常' && this.wagonType!='' && this.kg == ''){
        this.$notice.alert({
          message: '请输入车皮异常公斤数'
        })
        return
      }
      if(this.carType == '' || this.carNumberRight == false || this.carWeight == '' || this.originType == '' || this.carArrive == '' || this.scrapType == '' || this.people == '' || this.phoneRight == false || this.wagonType =='' || this.idcardRight == false || this.didcardRight == false){
        this.$notice.toast('检查输入项，有误')

      }else{
        this.overlay = true;
        this.$fetch({
          method: 'POST',
          name: this.methodOp,
          data:{
            q_id:this.id,
            q_carType:this.carType,
            q_carNumber:this.carNumber,
            q_carWeight:this.carWeight,
            q_originType:this.originType,
            q_carArrive:this.carArrive,
            q_scrapType:this.scrapType,
            q_people:this.people,
            q_phone:this.phone,
            q_idcard:this.idcard,
            q_dpeople:this.dpeople,
            q_dphone:this.dphone,
            q_didcard:this.didcard,
            q_wagonType:this.wagonType,
            q_kg:this.kg,
            q_has: this.checkBoxType ? 'Y' : 'N'
          }
        }).then(resData => {
          this.overlay = false;

          if(resData.status == 1 && resData.count == 1){
            this.methodOp == 'addInfo' ? this.$notice.toast('新增成功') : this.$notice.toast('更新成功');
          }else{

            this.$notice.toast(resData.message);
          }
        }, error => {
          this.overlay = false;
          this.$notice.loading.show(error)
        })
      }
    },
    selectMaintain(v){
      this.isLeftShow = true;
      this.peopleType=v;
    },
    reme(){
      if(this.isShow){
        this.isShow = false;
        this.checkBoxType = true;
      }else{
        this.isShow = true;
        this.checkBoxType = false;
      }
    },
    popupOverlayBottomClick () {
      // self=this;
      //this.$refs.BottomPop.hide();
      /*setTimeout(()=>{
        self.isBottomShow = false;
      },500)*/
      this.isBottomShow = false;
    },
    popupOverlayBottomPeopleClick(){
      this.isLeftShow = false;
    },  
    //加载label数据事件
    labelSelect(type,$event){
      this.isBottomShow = true;
      this.caseType=type;
    },
    parentEmit(json){
      this[json.type] = json.value;
      this.$refs.BottomPop.hide();
      //this.isBottomShow = false;
    },
    parentEimtBusiness(json){
      if(json.which=='K'){
        this.people = json.name;
        this.phone = json.tel;
        this.idcard = json.idcard ?  json.idcard : '';
      }else{
        this.dpeople = json.name;
        this.dphone = json.tel;
        this.didcard = json.idcard ? json.idcard : '';
      }
      this.$refs.selectLeftPop.hide();
    },
    General(name,e){
        this[name]=e.value;
    },
    checkCarNumber(){
      if(!/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(this.carNumber)){
        this.$notice.alert({
          message: '车号非法,请重新输入'
        })
        this.carNumberRight = false;
      }else{
        this.carNumberRight = true;
      }
    },
    checkPhone(){
      this.phone == null ? '' : this.phone;
      this.dphone == null ? '' : this.dphone;
      if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone) || !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.dphone)){
        this.$notice.alert({
          message: '手机号非法'
        })
        this.phoneRight = false;
      }else{
        this.phoneRight = true;
      }
    },
    checkIdcard(){
      this.idcard == null ? '' : this.idcard;
      if(this.idcard!=''){
        if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idcard)){
          this.idcardRight = false;
          this.$notice.alert({
            message: '身份证号非法'
          })
        }else{
          this.idcardRight = true;
        }
      }else{
        this.idcardRight = true;
      }
    },
    checkdIdcard(){
      this.didcard == null ? '' : this.didcard;
      if(this.didcard!=''){
        if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.didcard)){
          this.didcardRight = false;
          this.$notice.alert({
            message: '身份证号非法'
          })
        }else{
          this.didcardRight = true;
        }
      }else{
        this.didcardRight = true;
      }
    },
    dataPickPop(){
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
    }
  }
}
</script>

<style scoped>
.area {
  border-bottom-width: 1px;
}
.foot {
  height: 200px;
  align-items: center;
  justify-content: center;
}
.halfseperater {
  flex:0.2;
}
.halfinputtxtmiddler {
  flex:0.4;
}
.halflabeltxtr {
  flex:0.4;
  align-items: center;
}
.halfseperate {
  flex:0.1;
}
.halfinputtxtmiddle {
  flex:0.5;
}
.halfinputtxt {
  flex:0.6;
}
.halflabeltxt {
  flex:0.4;
  align-items: center;
}
.double {
  flex-direction: row;
}
.half {
  flex:0.5;
  flex-direction: row;
  align-items: center;
}
.seperateBlock {
  height: 20px;
}
.seperate {
  flex: 0.1;
}
.txtx {
  font-size: 28px;
}
.txt {
  height: 80px;
  align-items: center;
  font-size: 28px;
}
.inputtxt {
  flex: 0.7;
}
.labelstyle {
  font-size: 26px;
}
.labeltxt {
  flex: 0.2;
  align-items: center;
}
.last {
  border-bottom-width: 0;
}
.block {
  flex-direction: row;
  height: 85px;
  border-bottom-width: 1px;
  border-bottom-color: #CCCCCC;
  align-items: center;
  background-color: #ffffff;
}
.top {
  height: 120px;
  width: 750px;
  flex-direction: row;
  align-items: center;
}
</style>