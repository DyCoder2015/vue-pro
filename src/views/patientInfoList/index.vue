<template>
  <div>
    <div class="contentInfo">
      <div class="imgCode">
        <img class="codeImg" :src="codeUrl" />
      </div>
      <div class="userCodeText">将个人条码信息出示给医护人员</div>
      <div class="formInfo">
        <van-cell-group>
          <van-cell center title="姓名:" :value="userInfo.name" />
          <van-cell
            center
            title="性别:"
            :value="userInfo.sex === 1 ? '男' : '女'"
          />
          <van-cell center title="年龄:" :value="userInfo.age" />
          <van-cell center title="手机号:" :value="userInfo.phone" />
          <van-cell center title="身份证号:" :value="userInfo.idCard" />
        </van-cell-group>
      </div>
      <!-- <div class="tipInfo">
        请关注<span>"北京洛奇医学检验"</span>微信公众号查询下载电子版报告
      </div> -->
    </div>
    <div class="submitWrap">
      <van-button round type="info" class="submitBtn" @click="remindInfo"
        >修改信息</van-button
      >
    </div>
  </div>
</template>
<script>
import { getPatientInfo, getPatientCode } from "@/api/collect";

export default {
  data() {
    return {
      codeUrl: "",
      userInfo: {
        name: "",
        sex: "",
        age: "",
        phone: "",
        idCard: "",
      },
    };
  },
  methods: {
    remindInfo() {
      const { id } = this.$route.query;
      this.$router.push({ path: `/patientInfo?id=${id}` });
    },
    getInfoDetail(id) {
      getPatientInfo({ id: Number(id) }).then((res) => {
        const { data } = res;
        this.userInfo = data;
      });
    },
    getUserCode(id) {
      getPatientCode({ id: id }).then((res) => {
        // console.log(res, "res");
        // let blob = new Blob([res]); // 返回的文件流数据
        // let imgUrl = window.URL.createObjectURL(blob); // 将他转化为路径
        // // let imgUrl = new FileReader().readAsDataURL(res);
        // console.log(imgUrl, "url");
        this.codeUrl = "data:image/png;base64," + res;
      });
    },
  },
  created() {
    const { id } = this.$route.query;
    this.getUserCode(id);
    this.getInfoDetail(id);
  },
};
</script>
<style scoped>
.contentInfo {
  width: 90%;
  padding: 15px 14px;
  margin: 0 auto;
  background-color: #fff;
}
.tipInfo {
  padding: 10px;
  color: #333;
  line-height: 12px;
  font-size: 0.25rem;
  background-color: #c3d9ff;
}
.tipInfo span {
  color: red;
}
.userCodeText {
  display: flex;
  justify-content: center;
  font-size: 0.25rem;
  margin: 15px 0;
}
.formInfo {
  margin-bottom: 12px;
}
.submitWrap {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;
}
.submitBtn {
  width: 100px !important;
  border-radius: 3px !important;
  padding: 0;
  height: 35px !important;
}
.codeImg {
	width:100%;
	max-height: 150px;
	height: auto;
	 object-fit: fill; 
	 object-fit: contain;
	 object-fit: scale-down;
}
</style>