<template>
  <div class="inp-wrapper">
    <div class="user-number">
      <i class="iconfont icon-shouji"></i>
      <input
        v-model="param.phone"
        type="text"
        placeholder="用户名"
      >
    </div>
    <div class="password">
      <i class="iconfont icon-mima"></i>
      <input
        v-model="param.password"
        type="password"
        placeholder="密码"
      >
    </div>
    <button
      @click="toLogin"
      class="login"
    >登&nbsp;录</button>
  </div>
</template>
<script>
import { login, loginStatus, getDetail } from '@/api/user'
import { mapMutations } from 'vuex'
import { objSome } from '@/utils/index'

export default {
  data () {
    return {
      param: {
        phone: '',
        password: ''
      }
    }
  },
  mounted () {
    console.log('login')
  },
  methods: {
    ...mapMutations([
      'getUserId',
      'getUserData',
      'setToken'
    ]),
    _getDetail (id) {
      getDetail(id).then(res => {
        let { code, profile } = res
        if (code === 200) {
          this.getUserData(profile)
        }
      })
    },
    _loginStatus () {
      loginStatus().then(res => {
        let { code, profile: { userId } } = res
        if (code === 200) {
          this.getUserId(userId)
          this._getDetail(userId)
          // 页面回退
          wx.navigateBack({
            delta: 1
          })
        }
      })
    },
    _login (param) {
      login(param).then(res => {
        let { code } = res.data
        if (code === 200) {
          wx.hideLoading()
          let cookie = res.header['Set-Cookie'] || res.header['set-cookie']
          console.log(res, cookie)
          this.setToken(cookie)
          this._loginStatus()
        } else {
          wx.showToast({
            title: '您的用户名或密码有误！',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    toLogin () {
      if (!objSome(this.param)) {
        wx.showLoading({
          title: '正在为您登录'
        })
        this._login(this.param)
      } else {
        wx.showToast({
          title: '请填写完整！',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
@import "../../common/icon/iconfont.css";
@import "../../common/style/index";
input,
.inp-wrapper {
  padding: 10px;
  font-size: 0;
  color: @color-text-s;
  .user-number {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid @color-item-background;
    i {
      font-size: @font-size-large;
    }
    input {
      flex: 1;
      font-size: @font-size-medium-x;
    }
  }
  .password {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    border-bottom: 1px solid @color-item-background;
    i {
      font-size: @font-size-large;
    }
    input {
      flex: 1;
      font-size: @font-size-medium-x;
    }
  }
  .login {
    border: none;
    padding: 5rpx 0;
    background-color: @color-text-d;
    font-size: @font-size-medium-x;
    border-radius: 50px;
    color: @color-text-s;
  }
}
</style>
