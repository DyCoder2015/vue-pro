/*
 * @Author: Dy 
 * @Date: 2022-02-27 15:25:00 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-10 17:35:26
 */

<template>
  <div class="home">
    <van-form @submit="onSaveSubmit" direction="vertical" class="formContent">
      <div>
        <van-field
          name="areaName"
          @click="showPicker = true"
          input-align="right"
          v-model="areaName"
          clearable
          label="选择地区"
          right-icon="arrow"
          readonly
          placeholder="选择地区"
        />
        <van-field
          label="采样点名称"
          name="addressName"
          v-model="addressName"
          type="text"
          maxlength="50"
          input-align="right"
          placeholder="请输入"
        />
      </div>
      <div style="margin: 8px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          style="border-radius: 5px"
          >保存</van-button
        >
      </div>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-area
        title="选择地区"
        :area-list="areaList"
        value="110101"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { saveColAddress } from "@/api/collect";
import { areaList } from "@vant/area-data";
import { MP } from "@/utils/mp.js";
export default {
  name: "collectAddress",
  components: {},
  data() {
    return {
      areaName: "正在定位", //地区
      addressName: "", //  采样点名称
      areaList,
      showPicker: false,
      areasCodeList: [], //省市区code
      ak: "gsQ6X3ymyzGhKzulq5oNYzVIoKHGYOty", //秘钥
    };
  },
  mounted() {
    this.$confirm({
      title: "提示",
      text: "是否已经到达采样点？",
      titleColor: "#333", //重置title颜色(默认)
      textColor: "#999", //重置text颜色(默认)
      sureText: "确定", //(默认)
      cancelText: "取消", //(默认)
      sureColor: "#1989fa", //重置sureText颜色(默认)
      cancelColor: "#000", //重置cancelText颜色(默认)
      callback: () => {
        this.getCity();
      },
      cancel: () => {
        this.$router.push({ path: "/home" });
        // console.log("你点击了confirm的取消");
      },
    });
  },
  created() {
    this.getCity();
  },
  methods: {
    getCity() {
      this.$nextTick(() => {
        MP(this.ak).then((BMap) => {
          //在此调用api
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition((a) => {
            let provinceCode = "";
            let cityCode = "";
            let countyCode = "110101";
            for (let province in areaList["province_list"]) {
              if (
                areaList["province_list"][province].indexOf(
                  a.address.province
                ) !== -1
              ) {
                provinceCode = province;
              }
            }
            for (let city in areaList["city_list"]) {
              if (areaList["city_list"][city].indexOf(a.address.city) !== -1) {
                cityCode = city;
              }
            }
            // for (let county in areaList["county_list"]) {
            //   console.log(county, "生code");
            //   if (
            //     areaList["county_list"][county].indexOf(a.address.district) !==
            //     -1
            //   ) {
            //     countyCode = county;
            //   }
            // }
            this.areasCodeList = [provinceCode, cityCode, countyCode];
            this.areaName = `${a.address.province},${a.address.city},${a.address.district},`;
          });
        });
      });
    },
    onSaveSubmit(values) {
      //表单验证
      if (this.addressName === "") {
        Toast("请填写采样点名称！");
        return;
      }
      saveColAddress({
        province: this.areasCodeList[0],
        city: this.areasCodeList[1],
        area: this.areasCodeList[2],
        name: values.addressName,
      }).then((res) => {
        const { type, content } = res;
        if (type === "success") {
          this.$router.push({ path: "/collectAddress" });
        } else {
          Toast(content);
        }
      });
    },
    onConfirm(value) {
      const areaNameList = value?.map((item) => {
        return item.name;
      });
      this.areasCodeList = value.map((item) => {
        return item.code;
      });
      this.areaName = areaNameList.join(",");
      this.showPicker = false;
    },
  },
};
</script>

<style  scoped>
.formContent {
  width: 100vw;
  height: calc(100vh- 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.home {
  width: 100vw;
  height: calc(100vh- 50px);
  background-color: #fff;
  position: relative;
}

.addressSelect {
  padding: 0 !important;
}
.addressSelect:first-child span {
  color: #999 !important;
  font-size: 0.37rem !important;
}
</style>
