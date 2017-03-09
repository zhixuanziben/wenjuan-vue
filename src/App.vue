<template>
  <div id="app" class="app">
    <header>
      <span class="logo"><i class="el-icon-star-on"></i>智轩问卷管理系统</span>
      <router-link to="/second" class="my-page"><el-button>我的问卷</el-button></router-link>
    </header>
    <router-view class = "show"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      firstShow: false,
      secondShow: false
    }
  }
}
window.onload = function () {
  let app = document.getElementById('app');
  app.style.height = document.body.clientHeight;
  console.log(document.body.scrollHeight);
}
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    margin:0;
    padding:0;
  }
  header {
    width: 100%;
    height: 50px;
    background-color: #58B7FF;
    color: #F9FAFC;
  }
  .app {
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  .logo {
    line-height: 50px;
    margin-left: 50px;
  }
  .my-page {
    line-height: 50px;
    text-decoration: none;
    color: white;
    float: right;
    margin-right: 50px;
  }
  .show {
    width: 100%;
    height: 100%;
    background-color: #E5E9F2;
  }
</style>
