/*
 * @Author: Dy 
 * @Date: 2022-03-05 13:43:01 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-06 11:52:16
 */

<template>
  <div class="home">
    <van-form @submit="onSubmitInfo" direction="horizontal" class="formContent">
      <div>
        <van-field
          label="姓名"
          name="name"
          :show-error="errorTip"
          required
          error-message-align="right"
          v-model="entryForm.name"
          input-align="right"
          type="text"
          maxlength="20"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <!-- <van-field
          name="sex"
          @click="showSexPicker = true"
          input-align="right"
          v-model="entryForm.sex"
          clearable
          label="性别"
          readonly
          right-icon="arrow"
          placeholder="请选择"
        /> -->
        <van-field
          label="手机号"
          :show-error="errorTip"
          error-message-align="right"
          input-align="right"
          name="phone"
          required
          v-model="entryForm.phone"
          type="tel"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入正确手机号' }]"
        />
        <van-field
          label="身份证号"
          :show-error="errorTip"
          error-message-align="right"
          input-align="right"
          name="idCard"
          v-model="entryForm.idCard"
          type="text"
          placeholder="请输入身份证号"
          @change="changeCertificode"
        />
        <van-field
          name="remark"
          rows="1"
          maxlength="100"
          autosize
          v-model="entryForm.remark"
          type="textarea"
          placeholder="请输入备注"
        />
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >保存</van-button
        >
      </div>
    </van-form>
    <!-- <van-popup v-model="showSexPicker" position="bottom">
      <van-picker
        show-toolbar
        title="选择性别"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showSexPicker = false"
      />
    </van-popup> -->
  </div>
</template>

<script>
import {
  addPatientInfo,
  getPatientInfo,
  updatePatientCode,
} from "@/api/collect";
import { Toast } from "vant";
export default {
  name: "collectPatient",
  data() {
    return {
      errorTip: false,
      entryForm: {
        age: "",
        name: "",
        sex: "",
        phone: "",
        idCard: "",
      },
    };
  },
  computed: {},
  created() {
    const { id } = this.$route.query;
    if (id) {
      this.getUserInfo(id);
    }
  },
  methods: {
    getUserInfo(id) {
      getPatientInfo({ id: Number(id) }).then((res) => {
        const { data } = res;
        this.entryForm = {
          ...data,
          sex: data.sex === 1 ? "男" : "女",
        };
      });
    },
    changeCertificode(e) {
      const value = e.target.value;
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      var age = myDate.getFullYear() - value.substring(6, 10) - 1;
      if (
        value.substring(10, 12) < month ||
        (value.substring(10, 12) == month && value.substring(12, 14) <= day)
      ) {
        age++;
      }
      if(parseInt(value.substr(16,1)) % 2 === 1) {
        this.entryForm.sex = "男"
      } else {
        this.entryForm.sex = "女"
      }
      this.entryForm.age = age;
    },
    // validatorCertificate(val) {
    //   let _IDRe18 =
    //     /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    //   let _IDre15 =
    //     /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;

    //   return _IDRe18.test(val) || _IDre15.test(val);
    // },
    onSubmitInfo(values) {
      const idCard = values.idCard
      if(idCard === "" && values.remark === "") {
        Toast("请填写身份证号码或备注")
        return
      }
      if(idCard !== "") {
        let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
        if(!_IDRe18.test(idCard) && !_IDre15.test(idCard)) {
          Toast("您输入的身份证号码有误，请重新输入") 
          return
        } else {
           if(parseInt(idCard.substr(16,1)) % 2 === 1) {
              this.entryForm.sex = "男"
            } else {
              this.entryForm.sex = "女"
            }
        }

      }
      //保存或修改提交
      //表单验证
      const { id } = this.$route.query;
      if (id) {
        updatePatientCode({
          ...values,
          age: idCard !== "" ? this.entryForm.age : "",
          sex: this.entryForm.sex === "男" ? 1 : 2,
          id: id,
        }).then((res) => {
          this.$router.push({ path: `/patientInfoList?id=${id}` });
          Toast("修改成功！");
        });
      } else {
        addPatientInfo({
          ...values,
          age: this.entryForm.age,
          sex: this.entryForm.sex === "男" ? 1 : 2,
        }).then((res) => {
          const { data } = res;
          this.$router.push({ path: `/patientInfoList?id=${data.id}` });
          Toast("新增成功！");
        });
      }
    },
    onConfirm(value) {
      this.entryForm.sex = value.text;
      this.showSexPicker = false;
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
</style>
