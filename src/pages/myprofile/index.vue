<template>
  <div class="wrapper">
    <div>我的</div>
    <img
      v-if="data.code"
      :src="data.profile.avatarUrl"
      alt=""
    >
    <div v-if="data.code">{{data.profile.nickname}}</div>
    <a
      href="/pages/login/main"
      v-if="!isLogin"
    >登录</a>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { loginStatus } from '@/api/user'

export default {
  data () {
    return {
      data: {
        data: {},
        isLogin: false
      }
    }
  },
  mounted () {
    console.log('log', this.userData)
    this._loginStatus()
  },
  computed: {
    ...mapState([
      'userData'
    ])
  },
  methods: {
    _loginStatus () {
      loginStatus().then(res => {
        let { code } = res
        if (code === 200) {
          this.isLogin = true
          this.data = this.userData
        }
      })
    }
  },
  watch: {
    userData (val) {
      this.data = val
    }
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

