/*
 * @Author: Dy 
 * @Date: 2022-03-05 11:27:16 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-10 09:58:18
 */

<template>
  <div class="personalHome">
    <div class="topTitle"></div>
    <div class="staticsData">
      <h5>人员</h5>
      <van-tabs v-model="active" @click="changeTab">
        <van-tab
          :title="item.name"
          v-for="(item, index) in staticsData"
          :key="index"
        >
          <div class="dataContent">
            <div>
              <p>{{ item.num1 }}</p>
              <p>单采数据</p>
            </div>
             <div>
              <p>{{ item.num5 }}</p>
              <p>五混数据</p>
            </div>
            <div>
              <p>{{ item.num10 }}</p>
              <p>十混数据</p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div>
      <!-- <van-cell icon="shop-o" title="信息" is-link @click="enterInfo" /> -->
      <van-cell icon="circle" title="退出" is-link @click="logOut">
        <!-- <template  #left-icon>
          <van-icon name="../../assets/icons.logout.svg" class="search-icon" />
        </template> -->
      </van-cell>
    </div>
  </div>
</template>

<script>
import { getStaticData } from "@/api/collect";
import { loginOut } from "@/api/user";
import { Toast } from "vant";

export default {
  name: "personal",
  data() {
    return {
      active: 0,
      staticsData: [],
      tabData: [
        {
          name: "累计采集",
          id: 1,
        },
        {
          name: "今日采集",
          id: 2,
        },
        {
          name: "本周采集",
          id: 3,
        },
        {
          name: "本月采集",
          id: 4,
        },
      ],
      addressValue: "",
      error: false,
      loading: false,
      finished: false,
      addressInfoList: [],
    };
  },
  created() {
    this.queryCollectData();
  },
  methods: {
    changeTab(name, title) {
      console.log(name, "val");
    },
    enterInfo() {
      this.$router.push("/patientInfo");
    },
    logOut() {
      loginOut().then((res) => {
        this.$store.dispatch("user/loginOut");
        Toast("退出成功！");
        this.$router.push("/login");
      });
    },
    queryCollectData() {
      getStaticData().then((res) => {
        const { type, data } = res;
        console.log(data, "统计")
        const { total, day, week, month } = data;
        if (type === "success") {
          this.staticsData = [
            { ...total, name: "累计采集" },
            { ...day, name: "今日采集" },
            { ...week, name: "本周采集" },
            { ...month, name: "本月采集" },
          ];
        }
      });
    },
  },
};
</script>

<style  scoped>
.personalHome {
  width: 100vw;
  height: 90vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
.topTitle {
  width: 100%;
  height: 100px;
  background-image: url("../../assets/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
.staticsData {
  width: 90%;
  position: absolute;
  top: 80px;
  left: 45%;
  margin-left: -40%;
  background: #fff;
  border-radius: 5px;
  padding-top: 10px;
}
.dataContent {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}
.dataContent p {
  text-align: center;
}
.middleContent {
  height: calc(100vh - 162px);
  overflow: hidden;
  overflow-y: auto;
}
.formContent {
  width: 100vw;
  background: #fff;
}
h5 {
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 0.3rem;
  font-weight: bold;
}
</style>
<style >
.van-tabs__line {
  background-color: #1989fa !important;
}
</style>