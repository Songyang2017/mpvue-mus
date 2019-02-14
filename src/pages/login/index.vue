<template>
  <div>
    <input
      v-model="param.phone"
      type="text"
      placeholder="用户名"
    >
    <input
      v-model="param.password"
      type="password"
      placeholder="密码"
    >
    <div>{{res.nickname}}</div>
    <button @click="toLogin">登录</button>
    <button @click="_getEvents(res.userId)">动态</button>
  </div>
</template>
<script>
import { login, getEvents } from '@/api/user'
import { objSome } from '@/utils/index'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      param: {
        phone: '',
        password: ''
      },
      res: {}
    }
  },
  mounted () {
    console.log('login')
  },
  methods: {
    ...mapMutations([
      'getUserData'
    ]),
    _login (param) {
      login(param).then(res => {
        let { code } = res
        if (code === 200) {
          wx.navigateBack({
            delta: 1
          })
          this.res = res.profile
          this.getUserData(res)
        }
      })
    },
    _getEvents (id) {
      getEvents(id).then(res => {

      })
    },
    toLogin () {
      if (!objSome(this.param)) {
        wx.login({
          success: res => {
            let { code } = res
            if (code) {
              this._login(this.param)
            }
          }
        })
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
div {
  font-size: @font-size-medium-x;
  color: @color-text-s;
}
</style>
