<template>
  <div class="addressList">
    <van-swipe-cell>
      <div class="infoContent">
        <div class="leftContent">
          <div class="badgeIndex">{{ pointIndex }}</div>
          <div class="cell-item">
            <div class="addressInfo">
              <p>
                采集点名称：<span>{{ addressObj.name }}</span>
              </p>
              <p>
                所在地区：<span
                  >{{ addressObj.provinceName }},{{ addressObj.cityName }},{{
                    addressObj.areaName
                  }}</span
                >
              </p>
            </div>
            <!-- <div>
              <van-icon :name="codeImage" size="45px" />
            </div> -->
          </div>
        </div>
      </div>
      <template #right>
        <!-- <div class="delete-button" @click="deleteAddress(addressObj.id)">
          删除
        </div> -->
        <van-button
          @click="deleteAddress(addressObj.id)"
          square
          text="删除"
          type="danger"
          class="delete-button"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>
<script>
import CodeImage from "@/assets/icons/code-icon.jpg";
import { mapState, mapMutations } from "vuex";
import { areaList } from "@vant/area-data";
import { deleteCoAddress } from "@/api/collect";
import { Toast } from "vant";

export default {
  data() {
    return {
      codeImage: CodeImage,
    };
  },
  computed: {
    addressObj() {
      return this.addressInfo;
    },
    pointIndex() {
      return this.index;
    },
  },
  props: {
    addressInfo: {
      type: Object,
      default: {},
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    // ...mapMutations(["SET_ENTRYINFOLIST"]),
    deleteAddress(id) {
      this.$confirm({
        title: "提示",
        text: "确定要删除该采样点吗？",
        titleColor: "#333", //重置title颜色(默认)
        textColor: "#999", //重置text颜色(默认)
        sureText: "确定", //(默认)
        cancelText: "取消", //(默认)
        sureColor: "#1989fa", //重置sureText颜色(默认)
        cancelColor: "#000", //重置cancelText颜色(默认)
        callback: () => {
          deleteCoAddress({ id: id }).then((res) => {
            console.log(res, "333shanchu");
            // Toast("删除成功！");
            this.$emit("queryAddress");
          });
        },
        cancel: () => {
          // Toast("取消")
          // this.$router.push({ path: "/index" });
          // console.log("你点击了confirm的取消");
        },
      });
    },
  },
  created() {
    console.log(areaList, "省市区");
  },
};
</script>
<style scoped>
.addressList {
  margin-bottom: 10px;
}
.infoContent {
  background: #f5f5f8;
  padding: 0 10px;
}
.leftContent {
  background: #fff;
  position: relative;
  border-radius: 6px;
}

.badgeIndex {
  width: 24px;
  height: 18px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #2098e9;
  border-radius: 6px 0 8px 0;
  font-size: 0.3rem;
}
.cell-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10px;
}
p {
  margin-bottom: 0px;
  margin-right: 20px;
}
.delete-button {
  height: 100% !important;
}
</style>