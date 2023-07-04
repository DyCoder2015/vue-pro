/*
 * @Author: Dy 
 * @Date: 2022-02-26 14:14:54 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-05 17:52:11
 */

<template>
  <div class="addressHome">
    <van-search
      v-model="addressValue"
      show-action
      placeholder="搜索采样点"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch" style="color: #1989fa; font-size: 14px">
          搜索
        </div>
      </template>
    </van-search>
    <div class="middleContent">
      <div>
        <van-list
          v-if="addressInfoList.length > 0"
          style="margin-top: 12px"
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="--没有更多了--"
          @load="onLoad"
        >
          <div>
            <van-notice-bar
              left-icon="volume-o"
              :scrollable="false"
              text="温馨提示，向左滑动可以删除采样点"
            />
            <div
              v-for="(item, index) in addressInfoList"
              :key="index"
              class="addressContent"
            >
              <AddressInfo
                :addressInfo="item"
                :index="index + 1"
                @queryAddress="queryCollectAddress"
              />
            </div>
          </div>
        </van-list>
        <van-empty v-if="addressInfoList.length === 0" description="暂无数据" />
      </div>
    </div>
    <div class="submitWrap">
      <van-button
        round
        block
        type="info"
        @click="createAddress"
        class="submitBtn"
        >创建采集点</van-button
      >
    </div>
  </div>
</template>

<script>
// import { upload_file } from "@/api/user";
import { getCollectAddress, searchColAddress } from "@/api/collect";
import AddressInfo from "./components/addressInfo.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "collectPeople",
  components: {
    AddressInfo,
  },
  data() {
    return {
      addressValue: "",
      error: false,
      loading: false,
      finished: false,
      addressInfoList: [],
    };
  },
  created() {
    this.queryCollectAddress();
  },
  methods: {
    queryCollectAddress() {
      getCollectAddress().then((res) => {
        const { type, data } = res;
        if (type === "success") {
          this.addressInfoList = data;
        }
        // console.log(res, "dizhi");
      });
    },
    // ...mapMutations(["SET_ENTRYINFOLIST"]),
    createAddress() {
      //创建采集点
      this.$router.push({ path: "/locateAddress" });
    },
    onSearch() {
      searchColAddress({ name: this.addressValue }).then((res) => {
        const { type, data } = res;
        if (type === "success") {
          this.addressInfoList = data;
        }
      });
    },
    onLoad() {
      this.loading = false;
      this.finished = true;
      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   this.queryCollectAddress();
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.addressInfoList.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    onEnterInput() {
      // this.SET_ENTRYINFOLIST({});
      this.$store.commit("SET_ENTRYINFOLIST", {});
      this.$router.push({ path: "/entryInfo" });
    },
  },
};
</script>

<style  scoped>
.addressHome {
  width: 100vw;
  height: calc(100vh);
  background-color: #f5f5f8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.middleContent {
  height: calc(100vh);
  overflow: hidden;
  overflow-y: auto;
}
.formContent {
  width: 100vw;
  background: #fff;
}

.submitWrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: flex;
  justify-content: center;
  background: #fff;
  padding: 12px 0;
}
.submitBtn {
  width: 98% !important;
  border-radius: 5px !important;
}
</style>
