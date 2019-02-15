<template>
  <div class="wrapper">
    <div class="avatar">
      <img
        v-if="isLogin"
        :src="data.avatarUrl"
        alt=""
      >
    </div>
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
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

