/*
 * @Author: Dy 
 * @Date: 2022-02-26 11:09:26 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-06 20:27:46
 */

<template>
  <div id="index" class="login">
    <!-- logo -->
    <div class="logo">
      <h5>个人登录界面</h5>
    </div>
    <van-form @submit="onSubmit" class="formContent">
      <van-field
        :left-icon="userIcon"
        label-width="50"
        v-model="form.userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        :left-icon="passwordIcon"
        label-width="50"
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <div style="margin: 46px 16px 16px 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          style="border-radius: 5px"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import userIcon from "@/assets/icons/user.svg";
import passwordIcon from "@/assets/icons/Password.svg";

export default {
  name: "index",
  components: {},
  data() {
    return {
      userIcon: userIcon,
      passwordIcon: passwordIcon,
      form: {
        password: "",
        userName: "",
      },
      redirect: "",
    };
  },
  created() {
    let name = 'global';
    const obj = {
        name:'obj',
        test:function(){
            let name = 'scope';
            console.log(this.name);
        }
    }
    const test = obj.test;
    test();
    obj.test();

  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        console.log(query, "query");
        if (query) {
          this.redirect = query.redirect;
        }
      },
      immediate: true,
    },
  },
  methods: {
    onSubmit() {
      this.login();
    },
    async login() {
      if (this.form.account === "" || this.form.password === "") {
        Toast("请填写账号密码！");
        return;
      }
      const data = await this.$store.dispatch("user/login", this.form);
      if (data) {
        console.log(this.$route.query.redirect, "000");
        this.$router.push({ path: this.$route.query.redirect || "/" });
      }
    },
  },
};
</script>

<style scoped>
.formContent {
  /* width: 88% !important; */
  padding: 0 30px !important;
  position: relative;
  top: -16%;
}
.logo h5 {
  color: #fff;
  text-align: center;
  font-size: 0.6rem;
}
.login {
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-image: url("../../assets/login-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
}
</style>
<style >
.van-field__left-icon {
  margin-right: 12px !important;
  margin-top: 3px !important;
}
</style>
