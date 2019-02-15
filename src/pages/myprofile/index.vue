<template>
  <div class="wrapper">
    <img
      v-if="isLogin"
      :src="data.avatarUrl"
      alt=""
    >
    <div v-if="isLogin">{{data.nickname}}</div>
    <a
      href="/pages/login/main"
      v-if="!isLogin"
    >登录</a>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { loginStatus, getDetail } from '@/api/user'

export default {
  data () {
    return {
      data: {},
      isLogin: false
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
    _getDetail (id) {
      getDetail(id).then(res => {
        let { code, profile } = res
        if (code === 200) {
          this.data = profile
        }
      })
    },
    _loginStatus () {
      loginStatus().then(res => {
        let { code, profile: { userId } } = res
        if (code === 200) {
          this.isLogin = true
          this._getDetail(userId)
          // this.data = this.userData
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

