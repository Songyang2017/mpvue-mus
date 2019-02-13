<template>
  <div class="wrapper">
    <div>我的</div>
    <!-- <img
      v-if="userData.code"
      :src="userData.profile.avatarUrl"
      alt=""
    >
    <div v-if="userData.code">{{userData.profile.nickname}}</div> -->
    <a href="/pages/login/main">登录</a>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    console.log('log', this.$store)
  },
  computed: {
    // ...mapState([
    //   'userData'
    // ])
  }
}
</script>
<style scoped lang="less">
@import "../../common/icon/iconfont.css";
@import "../../common/style/index";

.wrapper {
  color: @color-text;
}
</style>

