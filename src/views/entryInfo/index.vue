/*
 * @Author: Dy 
 * @Date: 2022-02-27 10:44:47 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-10 17:13:19
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
        <van-field
          name="sex"
          @click="showSexPicker = true"
          input-align="right"
          v-model="entryForm.sex"
          clearable
          readonly
          label="性别"
          right-icon="arrow"
          placeholder="请选择"
        />
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
          name="certificateCode"
          v-model="entryForm.certificateCode"
          type="text"
          placeholder="请输入身份证号"
          @change="changeCertificode"
        />
        <!-- <van-field
          label="工作地址"
          input-align="right"
          name="address"
          v-model="entryForm.address"
          type="text"
          placeholder="请输入工作地址"
        /> -->
        <div class="labelName">备注</div>
        <div class="code-field">
          <van-field
            name="remark"
            rows="1"
            maxlength="100"
            autosize
            v-model="entryForm.remark"
            type="textarea"
            class="codeInput"
            placeholder="请输入备注"
          />
        </div>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >保存</van-button
        >
      </div>
    </van-form>
    <van-popup v-model="showSexPicker" position="bottom">
      <van-picker
        show-toolbar
        title="选择性别"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showSexPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "collectPeople",
  components: {},
  data() {
    return {
      errorTip: false,
      entryForm: {
        age: "",
        name: "",
        sex: "",
        phone: "",
        certificateCode: "",
        // address: "",
        remark: "",
      },
      columns: [
        {
          text: "男",
          id: 1,
        },
        {
          text: "女",
          id: 2,
        },
      ],
      showSexPicker: false,
    };
  },
  computed: {},
  created() {
    const queryInfo = this.$route.query;
    const { type, index } = queryInfo;
    if (type === "edit" && index) {
      this.entryForm = this.$store.state.user.peopleList[index];
    } else {
    }
  },
  methods: {
    changeCertificode(e) {
      const value = e.target.value;
      let _IDRe18 =
        /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      let _IDre15 =
        /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
        if(_IDRe18.test(value) || _IDre15.test(value)) {
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

        }
    },
    // validatorCertificate(val) {
    //   let _IDRe18 =
    //     /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    //   let _IDre15 =
    //     /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;

    //   return _IDRe18.test(val) || _IDre15.test(val);
    // },
    onSubmitInfo(values) {
      const queryInfo = this.$route.query;
      const { type, index } = queryInfo;
      const idCard = values.certificateCode
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
      
      if (type === "edit" && index) {
        //编辑
        const commonCode = this.$store.state.user.peopleList
          .filter((item, v) => v !== Number(index))
          .filter((item) => item.certificateCode === values.certificateCode);
        if (commonCode.length !== 0) {
          Toast("身份证号存在重复录入，请重新录入~");
          return;
        }
        this.$store.commit("user/EDIT_PEOPLEITEM", {
          index: index,
          data: {...this.entryForm,age: this.entryForm.certificateCode !== "" ? this.entryForm.age : ""},
        });
      } else {
        //新增
        const commonCode = this.$store.state.user.peopleList.filter(
          (item) => item.certificateCode === values.certificateCode
        );
        if (commonCode.length !== 0) {
          Toast("身份证号存在重复录入，请重新录入~");
          return;
        }
        this.$store.commit("user/SET_PEOPLELIST", {
          ...values,
          sex: this.entryForm.sex,
          age: this.entryForm.age,
        });
      }
      //通过跳转收集信息
      this.$router.push({ path: "/collectData" });
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
