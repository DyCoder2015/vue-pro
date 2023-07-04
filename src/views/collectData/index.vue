/*
 * @Author: Dy
 * @Date: 2022-02-26 14:14:54
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-10 17:38:38
 */
<template>
  <div class="home">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="contentInfo">
      <van-form
        direction="vertical"
        class="formContent"
        :colon="colon"
        label-width="65"
      >
        <van-field
          label="条码号"
          name="digit"
          v-model="infoObj.digit"
          class="codeInput"
        />
        <van-field
          label="采样点名称"
          name="address"
          v-model="infoObj.areaValue"
          class="codeInput"
        />
        <div class="code-field">
          <van-field
            name="operateType"
            label="采样类型"
            v-model="infoObj.operateType"
            class="codeInput"
          />
          <van-field
            name="templateType"
            label="样本类型"
            v-model="infoObj.templateType"
            class="codeInput"
          />
        </div>
      </van-form>
      <div class="certificateWrap">
        <div class="certiTitle"><strong>身份证信息上传</strong></div>
        <!-- <div class="certificateItem">
          <van-icon :name="codeIcon" size="50px" />
          <h5>扫描用户出示的条码</h5>
        </div> -->
        <van-grid direction="horizontal" :column-num="2" icon-size="24px">
          <van-grid-item @click="onEnterInput">
            <van-icon :name="codeIcon" size="20px" />
            <span class="operatePoint">点击手动输入</span>
          </van-grid-item>
          <van-grid-item @click="scanUserCode">
            <van-icon :name="codeIcon" size="20px" />
            <span class="operatePoint">扫描用户出示的条码</span>
          </van-grid-item>
        </van-grid>
      </div>
      <div>
        <div class="certiTitle templateData"><strong>样本数据</strong></div>
        <div class="dataStyle">
          <div v-if="peopleInfoList.length > 0" class="templateList">
            <div
              v-for="(item, index) in peopleInfoList"
              :key="index"
              class="listInfo"
            >
              <PeopleInfo :userInfo="item" :index="peopleInfoList.length - index" :listIndex="index" />
            </div>
          </div>
          <van-empty
            v-else
            description="暂无数据，请从上方身份证信息上传处将用户信息上传"
          />
        </div>
      </div>
    </div>
    <div class="submitWrap">
      <div>当前已采集{{ dataNum }}条数据</div>
      <van-button
        round
        block
        type="info"
        class="submitBtn"
        @click="onSubmitInfo"
        >提交信息</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import codeIcon from "@/assets/icons/code-icon.svg";
import EditIcon from "@/assets/icons/edit-icon.svg";
import PeopleInfo from "./components/peopleInfo.vue";
import { saveExamPeople,scanUserCode,getWxInfo } from "@/api/collect";

export default {
  name: "collectPeople",
  components: {
    PeopleInfo,
  },
  data() {
    return {
      colon: true,
      codeIcon: codeIcon,
      editIcon: EditIcon,
      infoObj: {
        operateType: "",
        areaValue: "",
        digit: "",
        templateType: "",
      },
    };
  },
  computed: {
    dataNum() {
      return this.$store.state.user.peopleList.length;
    },
    peopleInfoList() {
      return this.$store.state.user.peopleList;
    },
    commonInfo() {
      return this.$store.state.user.collectInfo;
    },
  },
	created() {
	  // const {code} = this.$route.query;
	  // if (code) {
    //   alert(code+'1')
    //   const pathCode = code.split(",")[1]
	  //   this.queryUserInfo(pathCode);
	  // }
	},
  mounted() {
    this.infoObj = { ...this.commonInfo };
    switch (this.commonInfo.operateType) {
      case "1":
        this.infoObj.operateType = "单采";
        break;
      case "2":
        this.infoObj.operateType = "十混";
        break;
      case "3":
        this.infoObj.operateType = "五混";
        break;
    }
    switch (this.commonInfo.templateType) {
      case "1":
        this.infoObj.templateType = "咽拭子";
        break;
      case "2":
        this.infoObj.templateType = "鼻咽拭子";
        break;
    }
  },
  methods: {
     getWxData() {
          let  url = location.href.split('#')[0];
          let that = this
          getWxInfo({tokenUrl: url}).then(res => {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "hideMenuItems",
              "showMenuItems",
              "hideAllNonBaseMenuItem",
              "showAllNonBaseMenuItem",
              "translateVoice",
              "startRecord",
              "stopRecord",
              "onRecordEnd",
              "playVoice",
              "pauseVoice",
              "stopVoice",
              "uploadVoice",
              "downloadVoice",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "downloadImage",
              "getNetworkType",
              "openLocation",
              "getLocation",
              "hideOptionMenu",
              "showOptionMenu",
              "closeWindow",
              "scanQRCode",
              "chooseWXPay",
              "openProductSpecificView",
              "addCard",
              "chooseCard",
            ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
           wx.ready(function () {
        // config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
        // config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
              // wx.checkJsApi({ // 判断当前客户端版本是否支持指定JS接口
              //   jsApiList: [
              //     'scanQRCode'
              //   ],
              //   success: function (res) { // 以键值对的形式返回，可用true，不可用false。如：{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
              //     if (res.checkResult.scanQRCode === true) {
              //       wx.scanQRCode({ // 微信扫一扫接口
              //         desc: 'scanQRCode desc',
              //         needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              //         scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
              //         success: function (res) {
              //           alert(res.resultStr)
              //           //const getCode = res.resultStr // 当needResult 为 1 时，扫码返回的结果
              //       }
              //     })
              //   } else {
              //     alert('抱歉，当前客户端版本不支持扫一扫')
              //     }
              //   },
              //   fail: function (res) { // 检测getNetworkType该功能失败时处理
              //     alert('fail' + res)
              //   }
              // })
              wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
               success: function (res) {
                let result = res.resultStr;
                // result = result.match(/ownerCode=(\S*)/)[1];
                // 当needResult 为 1 时，扫码返回的结果
                // alert(result);
                const pathCode = result.split(",")[1]
	              that.queryUserInfo(pathCode);
                // if (type === "code") {
                //   //扫描条形码数字
                //   setTimeout(() => {
                //     window.location.href = `/collectPeople?codeResult=${result}`
                //   }, 300);
                //   //  window.location.href = `/collectPeople?codeResult=${result}`
                //   // this.$router.push({path: `/collectPeople?codeResult=${result}`});
                // } else {
                //   //扫描用户信息
                  
                //   // window.location.href = `/collectData?code=${result}`
                //   // this.$router.push({path: `/collectData?code=${result}`});
                // }
               //调转页面到扫描成功的页面
                // window.location.href="http://nuoche2.com/#/success"
              },
              error: function (res) {
                console.log(res);
              },
            });
            })
             /* 处理失败验证 */
            wx.error(function (res) {
            // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
              alert('配置验证失败: ' + res.errMsg)
            })

          })
      },
		queryUserInfo(code) {
			scanUserCode({ userCode: code }).then((res) => {
			  const { data,type,content } = res;
			  if(type === "success") {
				  const newUserInfo = [data].map((item) => {
							return {
							  ...item,
							  sex: item.sex === 1 ? "男" : "女",
							  certificateCode: item.idCard,
							  // address: item.organization,
							};
				  });
          const commonData = this.peopleInfoList.filter(item => item.certificateCode === newUserInfo[0].certificateCode)
          if(commonData.length !== 0) {
            Toast("身份证号存在重复录入，请重新录入~");
            return;
          }
          this.$store.commit("user/SET_PEOPLELIST", newUserInfo[0]);
          
			  }else{
				  Toast(content)
			  }
			});
		},
    onClickLeft() {
      // this.$router.go(-1); //返回上一层
	  this.$router.push({path: `/collectPeople`});
    },
    getNowTime() {
      let dateTime;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      dateTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      return dateTime;
    },
    onSubmitInfo() {
      //表单验证 批量提交
      if (this.peopleInfoList.length === 0) {
        Toast("请填写信息");
        return;
      }
      const formData = this.peopleInfoList.map((item) => {
        return {
          age: item.age,
          codeNum: this.commonInfo.digit, //条形码
          companyId: this.commonInfo.areaName.id, //采样点地区id
          demoType: this.commonInfo.templateType, //样本
          idCard: item.certificateCode,
          name: item.name,
          phone: item.phone,
          remark: item.remark,
          sex: item.sex === "男" ? 1 : 2,
          testTime: this.getNowTime(),
          testType: this.commonInfo.operateType, //采样类型
        };
      });
      saveExamPeople(formData).then((res) => {
        const { type, content } = res;
        Toast(content)
        if (type === "success") {
          setTimeout(() => {
            this.$router.push({ path: "/home" });
          }, 300);
        }
      });
    },
    onEnterInput() {
      //录入信息
      const operateTypeType = this.$store.state.user.collectInfo.operateType;
      const haveNum = this.$store.state.user.peopleList.length;
      if (operateTypeType === "1" && haveNum === 1) {
        Toast("对不起，单混检测最多只能录入一个用户！");
        return;
      }
      if (operateTypeType === "2" && haveNum === 10) {
        Toast("对不起，十混检测最多只能录入10个用户！");
        return;
      }
      if (operateTypeType === "3" && haveNum === 5) {
        Toast("对不起，五混混检测最多只能录入5个用户！");
        return;
      }
      this.$router.push({ path: `/entryInfo?type=add` });
    },
    scanUserCode() {
      const operateTypeType = this.$store.state.user.collectInfo.operateType;
      const haveNum = this.$store.state.user.peopleList.length;
      if (operateTypeType === "1" && haveNum === 1) {
        Toast("对不起，单混检测最多只能录入一个用户！");
        return;
      }
      if (operateTypeType === "2" && haveNum === 10) {
        Toast("对不起，十混检测最多只能录入10个用户！");
        return;
      }
      if (operateTypeType === "3" && haveNum === 5) {
        Toast("对不起，五混混检测最多只能录入5个用户！");
        return;
      }
      this.getWxData()
      //  this.$router.push({
      //   path: "/scanCodePage?type=userCode",
      // });
    },
  },
};
</script>

<style  scoped>
.home {
  width: 100vw;
  min-height: 100vh;
  height: auto;
  background-color: #f5f5f8;
}
.contentInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* height: calc(100vh - 56px); */
  overflow: hidden;
  overflow-y: auto;
}
.formContent {
  width: 100vw;
  background: #fff;
}

.code-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 18px;
}

.operatePoint {
  margin-left: 10px;
}

.submitWrap {
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 5px 10px;
  margin: 0;
  width: 94%;
}
.certificateWrap {
  width: 95.6%;
  margin: 8px auto 0px auto;
  background: #fff;
}
.certiTitle {
  padding: 10px 16px;
  /* margin-bottom: 15px; */
  /* border-bottom: 1px solid #ebedf0; */
  font-size: 0.4rem;
}

.templateData {
  padding-left: 10px;
}
.dataStyle {
  /* width: 100vw; */
  height: 46vh;
  padding: 0 10px;
  overflow: hidden;
  overflow-y: auto;
}
.certificateItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.37rem;
}

.labelName {
  padding: 10px 16px;
  color: #999;
  font-size: 0.37rem;
}

.codeInput {
  background-color: transparent !important;
}
.addressSelect {
  padding: 0 !important;
}
.addressSelect:first-child span {
  color: #999 !important;
  font-size: 0.37rem !important;
}
.templateList {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.listInfo {
  width: calc(100vw - 20px);
}
.submitBtn {
  width: 60% !important;
  border-radius: 5px !important;
}
</style>
<style >
.van-empty {
  height: 50%;
}
</style>
