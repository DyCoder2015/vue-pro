/*
 * @Author: Dy 
 * @Date: 2022-02-26 14:14:54 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-06 20:23:52
 */

<template>
		<div class="home">
		  <van-form  @submit="onNextStep" direction="vertical" class="formContent">
		    <div>
		      <div class="labelName">采样人员类型</div>
		      <van-field name="peopleType">
		        <template #input>
		          <van-radio-group
		            v-model="peopleForm.peopleType"
		            direction="horizontal"
		          >
		            <van-radio name="1">普通人员</van-radio>
		            <!-- <van-radio name="2">从业人员</van-radio> -->
		          </van-radio-group>
		        </template>
		      </van-field>
		      <van-field
		        name="areaValue"
		        @click="showPicker = true"
		        input-align="right"
		        v-model="peopleForm.areaValue"
		        clearable
		        readonly
		        label="选择采样点"
		        right-icon="arrow"
		        placeholder="选择地区"
		      />
		      <div class="labelName">选择采样类型</div>
		      <van-field name="operateType">
		        <template #input>
		          <van-radio-group
		            v-model="peopleForm.operateType"
		            direction="horizontal"
					      @change="changeValue"
		          >
		            <van-radio name="1">单采</van-radio>
                <van-radio name="3">五混</van-radio>
		            <van-radio name="2">十混</van-radio>
		          </van-radio-group>
		        </template>
		      </van-field>
		      <div class="labelName">选择样本类型</div>
		      <van-field name="templateType">
		        <template #input>
		          <van-radio-group
		            v-model="peopleForm.templateType"
		            direction="horizontal"
					      @change="changeValue"
		          >
		            <van-radio name="1">咽拭子</van-radio>
		            <van-radio name="2">鼻咽拭子</van-radio>
		          </van-radio-group>
		        </template>
		      </van-field>
		      <div class="labelName">扫描录入条码号</div>
		      <div class="code-field">
		        <van-field
		          name="digit"
		          v-model="peopleForm.digit"
		          type="text"
		          maxlength="50"
		          placeholder="请输入条码号"
		          class="codeInput"
		        />
		        <van-icon :name="codeIcon" size="24px" @click="scanCode" />
		      </div>
		    </div>
		    <div style="margin: 8px">
		      <van-button
		        round
		        block
		        type="info"
				  native-type="submit"
		        style="border-radius: 5px"
		        >下一步</van-button
		      >
		    </div>
		  </van-form>
		  <van-popup v-model="showPicker" position="bottom">
		    <van-picker
		      show-toolbar
		      title="选择地区"
		      :columns="columns"
		      @confirm="onConfirm"
		      @cancel="showPicker = false"
		    />
		  </van-popup>
		</div>
</template>

<script>
import wx from "weixin-jsapi"
import { getCollectAddress,getWxInfo } from "@/api/collect";
import { Toast } from "vant";
import codeIcon from "@/assets/icons/code-icon.svg";
export default {
  name: "collectPeople",
  components: {},
  data() {
    return {
      peopleForm: {
        peopleType: "1", //人员类型
        areaName: {}, //采样点地区对象（包括地区code)
        digit: "",
        templateType: "",
        operateType: "",
        areaValue: "", //采样点地区名
      },
      codeIcon: codeIcon, //条形码图标
      columns: [], //地区筛选项
      showPicker: false, //地区弹窗status
    };
  },
  computed: {
    commonInfo() {
      return this.$store.state.user.collectInfo;
    },
  },
  created() {
    this.queryCollectAddress();
  },
  methods: {
     getWxData() {
          let  url = location.href.split('#')[0];
          const that = this
          getWxInfo({tokenUrl: url}).then(res => {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: ["checkJsApi", "scanQRCode"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
                 const codeData = result.split(",")[1]
                 that.peopleForm.digit = codeData
                 that.$store.commit("user/SET_COLLECTINGS",{...that.commonInfo,digit:codeData})
	              // this.peopleForm = {...this.commonInfo,digit:codeData}
                // if (type === "code") {
                //   //扫描条形码数字
                //   setTimeout(() => {
                //     window.location.href = `/collectPeople?codeResult=${result}`
                //   }, 300);
                //   //  window.location.href = `/collectPeople?codeResult=${result}`
                //   // this.$router.push({path: `/collectPeople?codeResult=${result}`});
                // } else {
                //   //扫描用户信息
                //   setTimeout(() => {
                //     window.location.href = `/collectData?code=${result}`
                //   }, 300);
                //   // window.location.href = `/collectData?code=${result}`
                //   // this.$router.push({path: `/collectData?code=${result}`});
                // }
               //调转页面到扫描成功的页面
                // window.location.href="http://nuoche2.com/#/success"
              },
              error: function (res) {
                // console.log(res);
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
	 changeValue(val) {
		 this.$store.commit("user/SET_COLLECTINGS", this.peopleForm);
	 },
    scanCode() {
      this.getWxData()
      // this.$router.push({
      //   path: "/scanCodePage?type=code",
      // });
    },
    queryCollectAddress() {
      getCollectAddress().then((res) => {
        const { type, data } = res;
        if (type === "success") {
          this.columns = data.map((item) => {
            return {
              ...item,
              text: item.name,
            };
          });
        }
      });
    },
    onNextStep(values) {
		const formData = values
      //表单验证
      if (formData.peopleType === "") {
        Toast("请选择采样人员类型");
        return;
      }
      if (formData.areaValue === "") {
        Toast("请选择采样点");
        return;
      }
      if (formData.operateType === "") {
        Toast("请选择采样类型");
        return;
      }
      if (formData.templateType === "") {
        Toast("请选择样本类型");
        return;
      }
      if (formData.digit === "") {
        Toast("请填写条形码");
        return;
      }
      this.$store.commit("user/RESET_PEOPLELIST", []);
      this.$store.commit("user/SET_COLLECTINGS", this.peopleForm);
      this.$router.push({
        path: `/collectData`,
      });
    },
    onConfirm(value) {
      this.peopleForm.areaName = value; //地区对象
      this.peopleForm.areaValue = value.text; //具体地区名字
      this.showPicker = false;
	  this.$store.commit("user/SET_COLLECTINGS", this.peopleForm);
    },
  },
};
</script>

<style  scoped>
.formContent {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.home {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: relative;
}

.labelName {
  padding: 10px 16px;
  color: #999;
  font-size: 0.37rem;
}
.code-field {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  background-color: #f5f5f8 !important;
  padding-right: 18px !important;
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
.qrCode-content {
	position: absolute;
		width: 100vw;
		height: 100vh;
	}
</style>
