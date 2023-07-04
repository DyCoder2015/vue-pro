<template>
  <div id="app">
<!--需要缓存组件-->
  <keep-alive>
	  <!--router-view组件是一个 functional 组件，渲染路径匹配到的视图组件-->
	<router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <!--不需要缓存组件-->
  <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active" route v-if="$route.meta.showTab">
      <van-tabbar-item replace to="/home" icon="chat-o"
        >数据采集</van-tabbar-item
      >
      <van-tabbar-item replace to="/personalCenter" icon="friends-o"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0, //由于这里使用了vant 标签栏路由模式，该设置无效（但是此处不可删除）。可以自己尝试看看
    };
  },
  //初始化页面选中状态
  created() {
    //由于 vant 标签栏路由模式，无法自动加载页面，所以这里需要初始化
    // console.log(this.$route); //打印当前路由属性
    if (this.$route.path === "/home") {
      this.$router.push("/home");
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.topContent {
  height: calc(100vh -50px);
}
</style>
