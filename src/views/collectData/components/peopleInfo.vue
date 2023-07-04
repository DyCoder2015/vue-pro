<template>
  <div class="infoContent">
    <div class="badgeIndex">{{ pointIndex }}</div>
    <div class="first-info cell-item">
      <div style="display: flex">
        <p>
          姓名：<span>{{ peopleInfo.name }}</span>
        </p>
        <p>
          性别：<span>{{ peopleInfo.sex}}</span>
        </p>
        <p>
          年龄：<span>{{ peopleInfo.age }}</span>
        </p>
      </div>
      <van-icon
        :name="editIcon"
        size="20px"
        @click="editInfo(indexNumber)"
      />
    </div>
    <div class="cell-item">
      <p>
        手机号：<span>{{ peopleInfo.phone }}</span>
      </p>
    </div>
    <div class="first-info cell-item">
      <p>
        身份证号：<span>{{ peopleInfo.certificateCode }}</span>
      </p>
      <div class="deleteBtn" @click="deleteInfo(indexNumber)">删除</div>
    </div>
  </div>
</template>
<script>
import EditIcon from "@/assets/icons/edit-icon-1.svg";
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      editIcon: EditIcon,
    };
  },
  computed: {
    peopleInfo() {
      return this.userInfo;
    },
    pointIndex() {
      return this.index;
    },
    indexNumber() {
      return this.listIndex
    }
  },
  props: {
    userInfo: {
      type: Object,
      default: {},
    },
    index: {//排序索引
      type: Number,
      default: 1,
    },
    listIndex: {//索引
      type: Number,
      default: 0
    }
  },
  methods: {
    // ...mapMutations(["SET_ENTRYINFOLIST"]),
    editInfo(index) {
      // this.$store.commit("SET_ENTRYINFOLIST", this.peopleInfo);
      // this.$router.push({ path: `/entryInfo?id=${this.peopleInfo.id}` });
      this.$router.push({ path: `/entryInfo?type=edit&index=${index}` });
      // this.$store.commit("user/EDIT_PEOPLEITEM", { index: index, data: item });
      // this.SET_ENTRYINFOLIST(this.peopleInfo);
    },
    deleteInfo(index) {
      // 本地删除
      this.$store.commit("user/REMOVE_PEOPLEITEM", index);
    },
  },
  created() {
    console.log(this.userInfo, "info");
  },
};
</script>
<style scoped>
.infoContent {
  padding: 10px 10px;
  background: #fff;
  border-radius: 6px;
  position: relative;
  margin-bottom: 20px;
}
.first-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
}
p {
  margin-bottom: 3px;
  margin-right: 20px;
}
.deleteBtn {
  width: 30px;
  height: 14px;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.2rem;
  border: 1px solid #f5f5f8;
  border-radius: 5px;
  cursor: pointer;
}
</style>