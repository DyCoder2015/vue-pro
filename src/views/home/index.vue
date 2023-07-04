/*
 * @Author: Dy 
 * @Date: 2022-02-26 12:32:54 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-10 13:38:23
 */
<template>
  <div class="home">
    <van-row type="flex" justify="space-around" class="tabBar">
      <van-col
        span="11"
        v-for="(item, index) in list"
        :key="index"
        class="entry-list"
        @click="tabCollect(item.id)"
      >
        <div
          :class="item.id === 1 ? 'blueColor' : 'purpleColor'"
          class="tabBarItem"
        >
          <van-icon
            :name="item.id === 1 ? 'friends' : 'friends'"
            size="20px"
            color="#fff"
          />
        </div>
        <div class="infoList">
          <p>{{ item.title }}</p>
          <p>{{ item.info }}</p>
        </div>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="icpText">
      <van-col span="24">京ICP备2021032675号-1</van-col>
    </van-row>
  </div>
</template>

<script>
import { upload_file } from "@/api/user";
export default {
  name: "index",
  components: {},
  data() {
    return {
      list: [
        {
          title: "创建采集点",
          id: 1,
          info: "生成采集点二维码",
          icon: "",
          color: ["", ""],
        },
        {
          title: "人员采集",
          id: 2,
          info: "录入采集人员样本",
          icon: "",
          color: ["", ""],
        },
      ],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {},
    tabCollect(id) {
      switch (id) {
        case 1:
          this.$router.push({ path: "/collectAddress" });
          break;
        case 2:
			this.$store.commit("user/RESET_COLLECTINFO");
          this.$router.push({ path: "/collectPeople" });
          break;
      }
    },
  },
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: 94.5vh;
  /* background-color: #ccc; */
  position: relative;
  background-image: url("../../assets/home-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
}

.tabBar {
  position: absolute;
  width: 100%;
  bottom: 50px;
}

.icpText {
      position: absolute;
    width: 100%;
    bottom: 16px;
    text-align: center;
    color: #000;
    font-size: 1.1em;
}
.entry-list {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  padding: 10px 0px;
}
.tabBarItem {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.blueColor {
  background-image: linear-gradient(
    358deg,
    rgb(160, 222, 219),
    rgb(3, 165, 209)
  );
}
.purpleColor {
  background-image: linear-gradient(
    355deg,
    rgb(247, 114, 251),
    rgb(92, 22, 132)
  );
}
.infoList {
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-left: 10px;
  margin-top: 8px;
}
.infoList > p {
  margin: 0;
  margin-bottom: 8px;
}
</style>
